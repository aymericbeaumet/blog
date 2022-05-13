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
		'jsx-a11y/label-has-associated-control': [2, { assert: 'either' }],
		'react/jsx-props-no-spreading': 0,
		'react/prop-types': 0,
	},
};
