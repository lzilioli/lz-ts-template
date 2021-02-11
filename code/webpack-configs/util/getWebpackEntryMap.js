/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/typedef */
/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
/* eslint-enable no-undef */

/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
module.exports = function getWebpackEntryMap(forFolder) {
    /* eslint-enable no-undef */
    /* eslint-enable @typescript-eslint/explicit-function-return-type */
    const resolvedFolder = path.resolve(forFolder);
    let results;
    try {
        results = fs.readdirSync(path.join(resolvedFolder, 'entries'));
    } catch (e) {
        return {};
    }
    const entryMap = {};
    _.chain(results)
    .filter(file => file.endsWith('.ts'))
    .each((file)=>{
        entryMap[path.basename(file, path.extname(file))] = path.join(resolvedFolder, 'entries', file);
    })
    .value();
    return entryMap;
}
