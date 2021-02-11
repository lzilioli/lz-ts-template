/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/typedef */
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const appPaths = require(path.resolve('app-paths'));

const results = fs.readdirSync(path.join(__dirname, appPaths.codeFolder, appPaths.webpackConfigsFolder));
module.exports = _.chain(results)
.filter(file => file.endsWith('.js'))
.map((file)=>{
	return {
		file,
		config: require(`./${appPaths.codeFolder}/${appPaths.webpackConfigsFolder}/${file}`)
	};
})
.filter(obj => {
	const hasEntries = !!_.keys(obj.config.entry).length;
	if (!hasEntries) {
		console.warn(`No entries found for ${obj.file}. Skipping this build target.`);
	}
	return hasEntries;
})
.map(o => o.config)
.value();
