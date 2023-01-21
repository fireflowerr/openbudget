import {ipcRenderer} from 'electron';
import { Transaction } from '../../common/data/transaction';
import { createLogger } from '../../common/Logger';

const log = createLogger('addTransaction - preload');

ipcRenderer.on('addTransactionPass', (event, [transaction]) => {
  log.debug(`transaction added successfully: ${JSON.stringify(transaction)}`);
})

ipcRenderer.on('addTransactionFail', (event, [transaction]) => {
  log.error(`failed to add transaction: ${JSON.stringify(transaction)}`);
})

export const addTransaction: (transaction: Transaction) => void = async (transaction) => {
  ipcRenderer.send('addTransaction', [transaction]);
};

