'use strict'

const gulp = require('gulp')
const livereload = require('gulp-server-livereload')

const config = require('../config')

gulp.task('livereload', ['watch'], function () {
  gulp.src(config.inject.dest)
    .pipe(livereload({
      livereload: {
        enable: true,
        filter: function (filename, cb) {
          cb(!/\.(sa|le)ss$|node_modules/.test(filename))
        }
      },
      directoryListing: true,
      open: true
    }))
})
