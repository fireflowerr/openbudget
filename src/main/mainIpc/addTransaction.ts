import {ipcMain} from 'electron';
import { createOrOpenDatabase } from '../database';
import { createLogger } from '../../common/Logger';

const log = createLogger('addTransaction - main');

ipcMain.on('addTransaction', async (event, [transaction]) => {
  try {
    const database = await createOrOpenDatabase();
    const keys = Object.keys(transaction).join(', ');
    const values = Object.values(transaction);
    const valuePlaceholders = new Array(values.length).fill('?').join(', ');
    const statement = `INSERT INTO ob_transaction (${keys}) VALUES(${valuePlaceholders});`;
    log.debug(`executing statement: ${statement}`);
    database.run(statement, values, (error) => {
      if (error) {
        log.debug('add transaction failed', error);
        event.reply('addTransactionFail', [transaction]);
        return;
      }
      event.reply('addTransactionPass', [transaction]);
    });
  } catch (error) {
    log.debug('failed to add transaction', error as Error);
  }
})
