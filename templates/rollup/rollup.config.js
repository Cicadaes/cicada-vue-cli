import vue from 'rollup-plugin-vue2';
import buble from 'rollup-plugin-buble';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import cssnano from 'cssnano';
import postcss from 'rollup-plugin-postcss'; // 修改样式，服务自动重启

const isDev = process.env.NODE_ENV !== 'production';

const config = {
    plugins: [
        vue(),
        postcss({
            plugins: [
                cssnano()
            ],
            sourceMap: true,
            extract: true,
            extensions: ['.css', '.styl']
        }),,
        buble({exclude: 'node_modules/**'}),
        nodeResolve(),
        commonjs()
    ]
};

if (isDev) {
    config.input = './dev/app.js';
    config.output = {
        file: 'dev/app.bundle.js',
        format: 'umd',
        sourcemap: true,
        strict: true
    };
    config.plugins.push(livereload());
    config.plugins.push(serve({
        contentBase: './dev',
        port: 8081,
        open: true
    }));
} else {
    config.input = './src/index.js';
    config.output = [
        {
            file: 'dist/<#=name#>.js',
            format: 'umd',
            strict: true
        },
        {
            file: 'dist/<#=name#>.common.js',
            format: 'cjs',
            strict: true
        },
        {
            file: 'dist/<#=name#>.es.js',
            format: 'es',
            strict: true
        }
    ];
    config.plugins.push(uglify());
}

export default config;