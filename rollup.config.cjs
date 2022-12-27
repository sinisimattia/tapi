const pkg = require('./package.json')
// Plugins
const ts = require('@rollup/plugin-typescript')
const cjs = require('@rollup/plugin-commonjs')
const json = require('@rollup/plugin-json')
const resolve = require('@rollup/plugin-node-resolve')
const alias = require('@rollup/plugin-alias')

const OUT_DIR = pkg.directories.lib

const customResolver = resolve({
	extensions: [
		// JavaScript
		'.js', '.cjs', '.mjs',
		// TypeScript
		'.ts', '.d.ts',
		// Other
		'.json', '.node',
	],
})

module.exports = [
	// ES Module build
	{
		input: [
			'src/index.ts',
			'src/functions.ts',
			'src/extensions.ts',
			'src/decorators.ts',
		],
		output:[
			{
				dir: OUT_DIR + '/es',
				format: 'es'
			},
		],
		plugins: [
			alias({customResolver}),
			cjs(),
			json(),
			ts({
				tsconfig: './tsconfig.build.json',
				outDir: OUT_DIR + '/es',
				tsBuildInfoFile: OUT_DIR + '/es/' + '.tsbuildinfo'
			}),
		],
	},
	// CommonJS module build
	{
		input: [
			'src/index.ts',
			'src/functions.ts',
			'src/extensions.ts',
			'src/decorators.ts',
		],
		output:[
			{
				dir: OUT_DIR + '/cjs',
				format: 'cjs'
			},
		],
		plugins: [
			alias({customResolver}),
			cjs(),
			json(),
			ts({
				tsconfig: './tsconfig.build.json',
				outDir: OUT_DIR + '/cjs',
				tsBuildInfoFile: OUT_DIR + '/cjs/' + '.tsbuildinfo'
			}),
		],
	},
]
