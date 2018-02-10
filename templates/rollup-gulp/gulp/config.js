'use strict'

module.exports = {
  bundle: {
    entry: './src/index.js',
    files: [
      './src/**/*.js',
      './src/**/*.vue'
    ],
    destFileName: '<#=name#>.js',
    dest: './dist'
  },
  inject: {
    target: './dev/index.html',
    sources: [
      './dist/<#=name#>.js',
      './dist/<#=name#>.css'
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
    dest: './dist'
  }
}
