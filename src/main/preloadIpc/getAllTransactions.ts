import {ipcRenderer} from 'electron';
import { createLogger } from '../../common/Logger';

const log = createLogger('getAllTransactions - preload');

ipcRenderer.on('getAllTransactionsPass', () => {
  log.debug('transactions fetched successfully');
})

ipcRenderer.on('getAllTransactionsFail', () => {
  log.error('failed to get transactions');
})


export const getAllTransactions: () => void = async () => {
  ipcRenderer.send('getAllTransactions');
};
