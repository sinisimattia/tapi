// Plugins
const ts = require('@rollup/plugin-typescript')
const dts = require('rollup-plugin-dts')
const cjs = require('@rollup/plugin-commonjs')
const json = require('@rollup/plugin-json')
const resolve = require('@rollup/plugin-node-resolve')
const alias = require('@rollup/plugin-alias')

// Constants
const pkg = require('./package.json')

function createBuildConfig(outSubDir, outFormat) {
	const OUT_DIR = pkg.directories.lib + '/' + outSubDir

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
				declarationDir: OUT_DIR + '/types',
				outDir: OUT_DIR,
			}),
		],
	}
}

module.exports = [
	createBuildConfig('cjs', 'cjs'),
	createBuildConfig('es', 'es'),
	{
		input: 'dist/es/types/index.d.ts',
		output: [{ file: 'dist/types.d.ts', format: 'es' }],
		plugins: [
			dts.default({
				tsconfig: './tsconfig.build.json',
				compilerOptions: {
					baseUrl: 'src'
				},
			}),
		],
	},
]
