// Plugins
const ts = require('@rollup/plugin-typescript')
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
				outDir: OUT_DIR,
				declarationDir: OUT_DIR + '/types',
				tsBuildInfoFile: OUT_DIR + '/' + '.tsbuildinfo'
			}),
		],
	}
}

module.exports = [
	createBuildConfig('es', 'es'),
	createBuildConfig('cjs', 'cjs')
]
