import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import vue from 'rollup-plugin-vue';

export default {
    input: './src/index.js',
    output: {
        dir: 'dist',
        format: 'es',
        globals: { vue: 'Vue', Vue: 'Vue' },
    },
    external: ['vue' /* /@babel\/runtime/ */],
    plugins: [
        resolve({ browser: true }),
        commonjs({ include: /node_modules/ }),
        vue(),
        babel({ babelHelpers: 'runtime', configFile: '../../babel.config.js' }),
        json(),
    ],
};
