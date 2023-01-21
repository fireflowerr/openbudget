import {contextBridge}  from 'electron';
import {addTransaction} from './preloadIpc/addTransaction';

contextBridge.exposeInMainWorld('electron', {addTransaction});
