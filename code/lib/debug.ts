import Debug from 'debug';

export const debug: Debug.Debugger = Debug(require('../../package.json').name);
export const vDebug: Debug.Debugger = Debug(`${require('../../package.json').name}:verbose`);
