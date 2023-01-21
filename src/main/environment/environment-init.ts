import {env} from 'process';
import { devEnvironment, prodEnvironment } from './environment';

const isDebug =
  env.NODE_ENV === 'development' || env.DEBUG_PROD === 'true';

// make environment accessible throughout the app
global.environment = isDebug ? devEnvironment : prodEnvironment;
