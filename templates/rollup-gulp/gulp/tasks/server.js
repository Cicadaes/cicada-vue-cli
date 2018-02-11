'use strict'

const gulp = require('gulp')
const connect = require('gulp-connect')

gulp.task('server', function () {
  connect.server({
    name: 'Dev App',
    livereload: true,
    root: ['dev'],
    port: '8080'
  })
})
