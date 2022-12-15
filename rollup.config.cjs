const pkg = require('./package.json')
// Plugins
const ts = require('@rollup/plugin-typescript')
const cjs = require('@rollup/plugin-commonjs')
const json = require('@rollup/plugin-json')
const resolve = require('@rollup/plugin-node-resolve')

const OUT_DIR = pkg.directories.lib

module.exports = {
	input: [
		'src/index.ts',
		'src/functions.ts',
		'src/extensions.ts',
		'src/decorators.ts',
	],
	output:[
		{
			dir: OUT_DIR,
			format: 'es'
		},
	],
	plugins: [
		resolve(),
		cjs(),
		json(),
		ts({
			tsconfig: './tsconfig.build.json'
		}),
	]
}
