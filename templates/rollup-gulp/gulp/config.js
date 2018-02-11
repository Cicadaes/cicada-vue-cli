'use strict'

module.exports = {
  bundle: {
    entry: './dev/app.js',
    files: [
      './src/**/*.js',
      './src/**/*.vue'
    ],
    destFileName: '<#=name#>.js',
    dest: './dev'
  },
  inject: {
    target: './dev/index.html',
    sources: [
      './dev/<#=name#>.js',
      './dev/<#=name#>.css'
    ],
    dest: './dev'
  },
  lint: {
    files: [
      './gulpfile.js',
      './src/**/*.js',
      './src/**/*.vue',
      './gulp/**/*'
    ]
  },
  style: {
    entry: './src/stylus/<#=name#>.styl',
    files: [
      './src/stylus/**/*.styl'
    ],
    dest: './dev'
  }
}
