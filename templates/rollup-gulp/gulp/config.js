'use strict'

module.exports = {
  bundle: {
    entry: './src/index.js',
    files: [
      './src/**/*.js',
      './src/**/*.vue'
    ],
    destFileName: 'bundle.js',
    dest: './dist'
  },
  inject: {
    target: './dev/index.html',
    sources: [
      './dist/bundle.js',
      './dist/main.css'
    ],
    dest: './dist'
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
