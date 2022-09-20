import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
	input: 'lib/esm5/index.js',
	output: [
		{
			name: 'tsmugen-utils',
			format: 'umd',
			file: 'lib/bundles/tsmugen-utils.umd.js',
			sourcemap: true,
		},
		{
			name: 'tsmugen-utils',
			format: 'umd',
			file: 'lib/bundles/tsmugen-utils.umd.min.js',
			sourcemap: true,
			plugins: [terser()],
		},
	],
	plugins: [commonjs(), nodeResolve()],
};
