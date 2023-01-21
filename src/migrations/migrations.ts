import { basename, extname, resolve as pathResolve } from 'path';
import { readdir, readFile } from 'fs/promises';
import { Database } from 'sqlite3';
import { createOrOpenDatabase } from '../main/database';
import { createLogger } from '../common/Logger';

const log = createLogger('migrations');

/**
 * Returns promise of PRAGAMA user_version.
 */
const getDatabaseVersion: () => Promise<number> = async () => {
  const database = await createOrOpenDatabase();
  return new Promise<number>((resolve, reject) => {
    log.debug('SQL: PRAGMA user_version')
    database.get('PRAGMA user_version', (error, row) => {
      if (error) {
        log.debug('query failed', error);
        reject(error);
        return;
      }
      log.debug('query succeeded');
      resolve(Number(row.user_version));
    });
  });
};

/**
 * Returns a promise that completes or fails as PRAGMA user_version completes or fails.
 *
 * @param value the new user_version
 */
const setDatabaseVersion: (value: number) => Promise<void> = async (value) => {
  const database = await createOrOpenDatabase();
  return new Promise<void>((resolve, reject) => {
    // pragma does not allow placeholders
    log.debug(`SQL: PRAGMA user_version = ${value}`)
    database.run(`PRAGMA user_version = ${value}`, (error) => {
      if (error) {
        log.debug('query failed', error);
        reject(error);
        return;
      }
      resolve();
    });
  });
}

const getMigrations: () => Promise<string[]> = async () => {
  const paths = await readdir(__dirname);
  return paths.filter((path) => {
    const result = extname(path) === '.sql';
    if (result) {
      log.debug(`found migration ${path}`);
    }
    return result;
  })
  .map((path) => {
    return basename(path, '.sql');
  });
};

const applyMigration: (name: string) => Promise<void> = async (name) => {
  const database: Database = await createOrOpenDatabase();
  const filePath = pathResolve(__dirname, `${name}.sql`);
  const contents: string = await readFile(filePath, {encoding: "utf8"});
  log.debug(`applying migration ${name}`);
  return new Promise((resolve, reject) => {
    database.exec(contents, (error) => {
      if (error) {
        log.debug(`failed to apply migration ${name}`);
        reject(error);
        return;
      }
      log.debug(`migration success`);
      resolve();
    })
  });
};

/**
 * Applies all migrations greater than the user_version pragma, and increments
 * the database if any migrations are applied.
 */
export const doMigrations: () => Promise<void> = async () => {
  const databaseVersion: number = await getDatabaseVersion();
  const migrations: string[] = await getMigrations();
  const unnappliedMigrations = migrations.filter((migration) => {
    const migrationVersion = Number(migration.split("_")[0]);
    const result = migrationVersion > databaseVersion;
    if (result) {
      log.debug(`found unapplied migration ${migration};`)
    }
    return result;
  });

  if (unnappliedMigrations.length === 0) {
    log.debug('no unapplied migrations found');
    return
  }

  log.debug('applying migrations');
  const database = await createOrOpenDatabase();

  // if any migration fails do not inc database
  let fail = false;
  database.serialize(() => {
    unnappliedMigrations.forEach((unnappliedMigration) => {
      applyMigration(unnappliedMigration)
        .catch((error) => {
          log.debug(`failed to apply migration ${unnappliedMigration}`, error);
          fail = true;
        });
    });
  });

  // increment the database
  if (!fail) {
    await setDatabaseVersion(databaseVersion + 1);
  }
};
