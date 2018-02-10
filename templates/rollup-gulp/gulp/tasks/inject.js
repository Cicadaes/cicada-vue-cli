'use strict'

const gulp = require('gulp')
const inject = require('gulp-inject')

const config = require('../config')

gulp.task('inject', function () {
  const target = gulp.src(config.inject.target)
  const sources = gulp.src(config.inject.sources)

  return target
    .pipe(gulp.dest(config.inject.dest))
    .pipe(inject(sources, {
      relative: true,
      addSuffix: '?t=' + Date.now()
    }))
    .pipe(gulp.dest(config.inject.dest))
})
