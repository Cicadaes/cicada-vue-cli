'use strict'

const gulp = require('gulp')
const runSequence = require('run-sequence')

gulp.task('dev', function (cb) {
  runSequence('build', ['server', 'watch'], cb)
})
