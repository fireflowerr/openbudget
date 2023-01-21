import {mkdir} from 'fs/promises';
import { Database } from 'sqlite3';
import {resolve as pathResolve} from 'path';
import { createLogger } from '../common/Logger';

const {dataDir} = global.environment;
const log = createLogger('database');

/**
 * Creates the data dir if it does not yet exist.
 */
const createDataDirIfDne = (): Promise<string|void|undefined> => {
  log.debug('creating data dir if it does not exist');
  return mkdir(dataDir, {recursive: true}).catch(() => {});
};

// cached value of createOrOpenDatabase
let databaseCache: Promise<Database> | undefined;

/**
 * Creates or opens the database. Assumes the database's directory already exists. Returns a cached value
 * after the first;
 */
export const createOrOpenDatabase = (): Promise<Database> => {
  if (databaseCache) {
    return databaseCache
  }

  return createDataDirIfDne()
      .then(() => {
        const databasePath = pathResolve(dataDir, 'app.db');
        log.debug(`creating or opening database at ${databasePath}`);
        return (databaseCache = new Promise<Database>((resolve, reject) => {
          const database = new Database(databasePath, (error) => {
            if (error) {
              log.error('failed to create or open database', error);
              reject(error);
            } else {
              log.debug('database opened successfully');
              resolve(database);
            }
          });
        }));
      })
};
