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
		'react/jsx-props-no-spreading': 'off',
		'react/prop-types': 'off',
	},
};
