import {ipcMain} from 'electron';
import { createOrOpenDatabase } from '../database';
import { createLogger } from '../../common/Logger';

const log = createLogger('getAllTransactions - main');

ipcMain.on('getAllTransactions', async (event) => {
  const database = createOrOpenDatabase();
  const statement = 'SELECT * FROM ob_transaction';
  log.debug(`executing statement: ${statement}`);
  database.then((databaseValue) => {
    databaseValue.all(statement, (error, rows) => {
      if (error) {
        event.reply('getAllTransactionsFail', error);
        return;
      }
      event.reply('getAllTransactionsPass', rows);
    });
  }).catch((error) => {
    log.error('failed to get all transactions', error);
    return [];
  });
});
