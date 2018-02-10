import vue from 'rollup-plugin-vue2';
import stylus from 'rollup-plugin-stylus-css-modules';
import buble from 'rollup-plugin-buble';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';

const isDev = process.env.NODE_ENV !== 'production';

const config = {
    useStrict: true,
    sourceMap: false,
    plugins: [
        vue(),
        stylus({
            output: isDev ? 'dev/app.css' : 'dist/<#=name#>.css',
            sourceMap: isDev ? true : false
        }),
        buble({exclude: 'node_modules/**'}),
        nodeResolve(),
        commonjs()
    ]
};

if (isDev) {
    config.input = './dev/app.js';
    config.output = {file: 'dev/app.bundle.js', format: 'umd'};
    config.sourceMap = true;
    config.plugins.push(livereload());
    config.plugins.push(serve({
        contentBase: './dev',
        port: 8081,
        open: true
    }));
} else {
    config.input = './src/index.js';
    config.output = [
        {file: 'dist/<#=name#>.js', format: 'umd'},
        {file: 'dist/<#=name#>.common.js', format: 'cjs'},
        {file: 'dist/<#=name#>.es.js', format: 'es'}
    ];
    config.plugins.push(uglify());
}

export default config;