'use strict'

const gulp = require('gulp')
const vue = require('rollup-plugin-vue2')
const rollup = require('rollup-stream')
const buble = require('rollup-plugin-buble')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const connect = require('gulp-connect')

const config = require('../config')
let rollupCache

gulp.task('build:javascript', function () {
  return rollup({
    input: config.bundle.entry,
    format: 'umd',
    name: '<#=name#>',
    cache: rollupCache,
    plugins: [
      vue({
        css: false
      }),
      buble()
    ]
  })
    .on('bundle', function (bundle) {
      rollupCache = bundle
    })
    .pipe(source(config.bundle.destFileName))
    .pipe(buffer())
    .pipe(gulp.dest(config.bundle.dest))
    .pipe(connect.reload())
})
