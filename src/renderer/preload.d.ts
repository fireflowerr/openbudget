import {addTransaction} from '../main/preloadIpc/addTransaction';

declare global {
  interface Window {
    electron: {
      addTransaction: typeof addTransaction,
    }
  }
}

export {};
