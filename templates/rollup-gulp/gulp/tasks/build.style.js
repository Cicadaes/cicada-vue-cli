'use strict'

const gulp = require('gulp')
const stylus = require('gulp-stylus')
const sourcemaps = require('gulp-sourcemaps')
const connect = require('gulp-connect')

const config = require('../config')

gulp.task('build:style', function () {
  return gulp.src(config.style.entry)
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.style.dest))
    .pipe(connect.reload())
})
