// Plugins
const ts = require('@rollup/plugin-typescript')
const dts = require('rollup-plugin-dts')
const cjs = require('@rollup/plugin-commonjs')
const json = require('@rollup/plugin-json')
const resolve = require('@rollup/plugin-node-resolve')
const alias = require('@rollup/plugin-alias')
const clear = require('rollup-plugin-clear')

// Constants
const pkg = require('./package.json')
const LIB_DIR = pkg.directories.lib

function createBuildConfig(outSubDir, outFormat) {
	const OUT_DIR = LIB_DIR + '/' + outSubDir

	return {
		input: [
			'src/index.ts',
			'src/functions.ts',
			'src/extensions.ts',
			'src/decorators.ts',
		],
		output:[
			{
				dir: OUT_DIR,
				format: outFormat
			},
		],
		plugins: [
			alias({
				customResolver: resolve({
					extensions: [
						// JavaScript
						'.js', '.cjs', '.mjs',
						// TypeScript
						'.ts', '.d.ts',
						// Other
						'.json', '.node',
					],
				}),
			}),
			cjs(),
			json(),
			ts({
				tsconfig: './tsconfig.build.json',
				outDir: OUT_DIR,
				declarationDir: OUT_DIR + '/types',
			}),
		],
	}
}

module.exports = [
	createBuildConfig('cjs', 'cjs'),
	createBuildConfig('es', 'es'),
	{
		input: LIB_DIR + '/es/types/index.d.ts',
		output: [{ file: LIB_DIR + '/types.d.ts', format: 'es' }],
		plugins: [
			dts.default({
				tsconfig: './tsconfig.build.json',
				compilerOptions: {
					baseUrl: 'src',
					sourceMap: true,
					declarationMap: true,
				},
			}),
			clear({
				targets: [
					LIB_DIR + '/es/types',
					LIB_DIR + '/cjs/types',
				],
			}),
		],
	},
]
