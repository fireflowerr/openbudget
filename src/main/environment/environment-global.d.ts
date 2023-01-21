import { Environment } from './environment';
import { Database } from 'sqlite3';

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var environment: Environment;
  // eslint-disable-next-line vars-on-top, no-var
  var database: Database;
}
export default global;
