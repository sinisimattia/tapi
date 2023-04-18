// Plugins
const ts = require('@rollup/plugin-typescript')
const dts = require('rollup-plugin-dts').default
const cjs = require('@rollup/plugin-commonjs')
const json = require('@rollup/plugin-json')
const resolve = require('@rollup/plugin-node-resolve')
const alias = require('@rollup/plugin-alias')
const del = require('rollup-plugin-delete')

// Constants
const pkg = require('./package.json')
const tsConfigBase = require('./tsconfig.json')
const SRC_DIR = tsConfigBase.compilerOptions.baseUrl
const LIB_DIR = pkg.directories.lib

function createBuildConfig(outSubDir, outFormat) {
	const OUT_DIR = LIB_DIR + '/' + outSubDir

	return {
		input: [
			SRC_DIR + '/index.ts',
			SRC_DIR + '/functions.ts',
			SRC_DIR + '/extensions.ts',
			SRC_DIR + '/decorators.ts',
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
			dts({
				tsconfig: './tsconfig.build.json',
				compilerOptions: {
					baseUrl: 'src',
					sourceMap: true,
					declarationMap: true,
				},
			}),
			del({
				targets: [
					LIB_DIR + '/es/types',
					LIB_DIR + '/cjs/types',
				],
				hook: 'buildEnd',
				runOnce: true,
			}),
		],
	},
]
