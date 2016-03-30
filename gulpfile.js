var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// Process SCSS
gulp.task('sass', function() {
  return sass('app/scss/styles.scss')
    .pipe(gulp.dest('app/styles'))
    .pipe(reload({ stream: true }));
});

// watch files for changes and reload
gulp.task('serve', ['sass'], function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  });

  gulp.watch(['app/*.html', 'app/scss/*.scss', 'app/scripts/**/*.js'], ['sass'], {cwd: 'app'}, reload);
});
