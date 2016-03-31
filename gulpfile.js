/*jshint node:true*/

'use strict';

// requires
var autoprefixer = require('gulp-autoprefixer');
var babelify = require('babelify');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-ruby-sass');
var watchify = require('watchify');
var source = require('vinyl-source-stream');

// global
var reload = browserSync.reload;

// Process SCSS
gulp.task('sass', function() {
  return sass('app/scss/styles.scss')
    .pipe(autoprefixer())
    .pipe(gulp.dest('app/styles'))
    .pipe(reload({ stream: true }));
});

gulp.task('bundler', function() {
  let bundler = watchify(browserify('app/scripts/app.js'));
  bundler.transform(babelify);

  return bundler.bundle()
    .on('error', function(error) {
      gutil.log(error.message);
      browserSync.notify('Error: ' + error.message);
      this.emit('end');
    })
    .pipe(source('app.js'))
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.stream({ once: true }));
});

// watch files for changes and reload
gulp.task('serve', ['sass', 'bundler'], function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  });

  gulp.watch(['app/*.html'], {cwd: 'app'}, reload);
  gulp.watch(['app/scss/*.scss'], ['sass']);
  gulp.watch(['app/scripts/**/*.js'], ['bundler']);
});
