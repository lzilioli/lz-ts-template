import Debug from 'debug';

const packageName: string = require('../../package.json').name;

export const debug: Debug.Debugger = Debug(packageName);
export const vDebug: Debug.Debugger = Debug(`${packageName}:verbose`);

export function getDebug(namespace: string): Debug.Debugger {
    return Debug(`${packageName}:${namespace}`);
}
