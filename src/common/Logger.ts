export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
type MessageSink = (message: string) => void;

export type SinkMap = Partial<Record<LogLevel, MessageSink>> & Record<'default', MessageSink>;

const DefaultSinkMap: SinkMap = {
  error: console.error,
  default: console.log,
};

type Log = (level: LogLevel, message: string, error?: Error) => void;
type LogShorthand = (message: string, error?: Error) => void;

export type Logger = Log & {
  [P in LogLevel]: LogShorthand;
} & {
  level: LogLevel;
}

const LogLevelPrecedence: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

let globalLogLevel: LogLevel = 'debug';

export const setGlobalLogLevel = (newLevel: LogLevel) => {
  globalLogLevel = newLevel;
}

export const createLogger = (name: string, sinkMap=DefaultSinkMap): Logger => {
  let localLogLevel: undefined | LogLevel;
  let precedence: number = LogLevelPrecedence[localLogLevel || globalLogLevel];

  const log: Log = (logLevel, message, error?) => {
    const statementPrecedence = LogLevelPrecedence[logLevel];
    if (statementPrecedence < precedence) {
      return;
    }
    const sink = sinkMap[logLevel] || sinkMap.default;
    sink(`[${logLevel.toUpperCase()}][${name}] ${message}${error ? '\n' + JSON.stringify(error, null, 2) : ''}`);
  };

  const bindLogLevel = (logLevel: LogLevel): LogShorthand => (message: string, error?: Error) => {
    log(logLevel, message, error);
  };

  const debug: LogShorthand = bindLogLevel('debug');
  const info: LogShorthand = bindLogLevel('info');
  const warn: LogShorthand = bindLogLevel('warn');
  const error: LogShorthand = bindLogLevel('error');

  return Object.defineProperties(log, {
    debug: {value: debug},
    info: {value: info},
    warn: {value: warn},
    error: {value: error},
    level: {
      get: () => localLogLevel || globalLogLevel,
      set: (newLevel) => {
        localLogLevel = newLevel;
        precedence = LogLevelPrecedence[localLogLevel || globalLogLevel];
      }
    },
  }) as Logger;
};
