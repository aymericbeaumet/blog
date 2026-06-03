module.exports = {
	useTabs: true,
	singleQuote: true,
	trailingComma: 'all',
	printWidth: 100,
	overrides: [
		{
			files: '**/*.md',
			options: {
				singleQuote: false,
				printWidth: 80,
				proseWrap: 'always',
			},
		},
	],
};
