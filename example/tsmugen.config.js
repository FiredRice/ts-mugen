const { createMugenConfig } = require('@tsmugen/utils');

module.exports = createMugenConfig({
	character: {
		name: 'demo',
		displayname: '',
		author: '',
		localcoord: [320, 240],
	},
	rootDir: 'src',
	output: 'lib',
	entry: 'src/index.ts',
	buildVariableTable: true,
	programs: [
		{
			name: '1.0 主程序',
			version: '1.0',
			path: '',
		},
		{
			name: '1.1 主程序',
			version: '1.1',
			path: '',
		},
	],
});
