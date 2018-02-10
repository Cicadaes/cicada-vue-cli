const gulp = require('gulp')
const runSequence = require('run-sequence')

gulp.task('build', function (cb) {
  runSequence('lint', ['build:javascript', 'build:style'], 'inject', cb)
})
