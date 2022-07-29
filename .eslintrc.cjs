module.exports = {
	parser: '@babel/eslint-parser',
	parserOptions: {
		requireConfigFile: false,
		babelOptions: {
			presets: ['@babel/preset-react'],
		},
	},
	extends: ['airbnb', 'prettier'],
	rules: {
		'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/scripts/**'] }],
		'jsx-a11y/label-has-associated-control': ['error', { assert: 'either' }],
		'react/jsx-props-no-spreading': 0,
		'react/prop-types': 0,
	},
};
