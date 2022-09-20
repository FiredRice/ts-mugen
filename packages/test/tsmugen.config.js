const { createMugenConfig } = require('@tsmugen/core');

module.exports = createMugenConfig({
	character: {
		name: 'demo',
		displayname: '',
		author: '',
		localcoord: [320, 240],
	},
	output: 'lib',
	entry: 'src/index.ts',
	programs: [
		{
			name: '1.0 主程序',
			version: '1.0',
			path: 'D:/Games/Mugen/Mugen_1.0',
		},
		{
			name: '1.1 主程序',
			version: '1.1',
			path: 'D:/Games/Mugen/Mugen_1.1',
		},
	],
});
