const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
	// Core
	roots: [
		'<rootDir>',
	],
	preset: 'ts-jest',
	testEnvironment: 'node',
	modulePaths: [compilerOptions.baseUrl],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {prefix: '<rootDir>/src/'}),
	// Coverage
	collectCoverage: true,
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	// Mocking
	clearMocks: true,
};
