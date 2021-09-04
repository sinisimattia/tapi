module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	plugins: [
		'@typescript-eslint',
	],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
	],
	rules: {
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-inferrable-types': 'off',
		'no-prototype-builtins': 'off',
		'@typescript-eslint/no-empty-interface': 'off',
		'prefer-const': 'warn',
		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-empty-function': 'off'
	},
	ignorePatterns: [
		"tests/**/*"
	]
};
