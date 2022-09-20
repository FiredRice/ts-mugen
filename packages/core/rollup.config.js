import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
	input: 'lib/esm5/index.js',
	output: [
		{
			globals: {
				'lodash': 'lodash',
				'fs-extra': 'fs'
			},
			name: 'tsmugen-core',
			format: 'umd',
			file: 'lib/bundles/tsmugen-core.umd.js',
			sourcemap: true,
		},
		{
			globals: {
				'lodash': 'lodash',
				'fs-extra': 'fs'
			},
			name: 'tsmugen-core',
			format: 'umd',
			file: 'lib/bundles/tsmugen-core.umd.min.js',
			sourcemap: true,
			plugins: [terser()],
		},
	],
	onwarn: function (warning) {
		if (warning.code === 'THIS_IS_UNDEFINED') {
			return;
		}
		console.error(warning.message);
	},
	plugins: [commonjs(), nodeResolve()],
	external: ['lodash', 'fs-extra'],
};
