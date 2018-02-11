'use strict'

const gulp = require('gulp')
const runSequence = require('run-sequence')

// cb保证执行顺序
gulp.task('dev', function (cb) {
  runSequence('build', ['server', 'watch'], cb)
})
