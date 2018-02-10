const gulp = require('gulp')
const gulpEslint = require('gulp-eslint')

const config = require('../config')

gulp.task('lint', function () {
  return gulp.src(config.lint.files)
    .pipe(gulpEslint())
    .pipe(gulpEslint.format())
})
