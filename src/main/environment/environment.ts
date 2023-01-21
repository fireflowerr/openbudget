import { resolve, normalize } from 'path';
import { platform } from 'os';
import { env } from 'process';
import { createLogger, LogLevel } from '../../common/Logger';

const log = createLogger('Environment');

export type Environment = {
  debug: boolean;
  logLevel: LogLevel;
  dataDir: string;
};

export const devEnvironment: Environment = {
  debug: true,
  logLevel: 'debug',
  dataDir: normalize(resolve(__dirname, '../../../dataDir')),
};

const userDataPath = env.APPDATA || (platform() === 'darwin'
  ? `${env.HOME  }/Library/Preferences`
  : `${env.HOME  }/.local/share`);

const dataDir = resolve(userDataPath, 'openbudget');

export const prodEnvironment: Environment = {
  debug: false,
  logLevel: 'info',
  dataDir,
};
