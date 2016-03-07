'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var paths = ['*.js', 'test/*.js', '!package.json'];

gulp.task('default', ['eslint-mocha']);

gulp.task('eslint', function() {
  return gulp.src(paths)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('mocha', function() {
  return gulp.src('./test/*.js')
  .pipe(mocha());
});

gulp.task('eslint-mocha', ['eslint', 'mocha'], function() {
  console.log('\nFinished running eslint and mocha.\n');
});
