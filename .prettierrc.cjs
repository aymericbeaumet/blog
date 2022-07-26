module.exports = {
	useTabs: true,
	singleQuote: true,
	trailingComma: 'all',
	printWidth: 100,

	importOrder: ['^@core/(.*)$', '^@server/(.*)$', '^@ui/(.*)$', '^[./]'],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,

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
