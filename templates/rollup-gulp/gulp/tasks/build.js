const gulp = require('gulp')
const runSequence = require('run-sequence')

gulp.task('build', function () {
  runSequence('lint', ['build:javascript', 'build:style'])
})
