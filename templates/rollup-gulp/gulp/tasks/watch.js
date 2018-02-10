'use strict'

const gulp = require('gulp')

const config = require('../config')

gulp.task('watch', function () {
  gulp.watch(config.bundle.files, ['lint', 'build:javascript'])
  gulp.watch(config.style.files, ['build:style'])
})
