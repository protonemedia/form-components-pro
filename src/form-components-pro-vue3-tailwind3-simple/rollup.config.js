import vue from 'rollup-plugin-vue'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';

export default [
    {
        input: 'src/index.js',
        output: [
            {
                format: 'esm',
                file: 'dist/library.mjs'
            },
            {
                format: 'es',
                file: 'dist/library.js'
            }
        ],
        plugins: [
            commonjs({ include: /node_modules/ }),
            vue(),
            babel({ babelHelpers: 'runtime', configFile: '../../babel.config.js' }),
            peerDepsExternal()
        ]
    }
]