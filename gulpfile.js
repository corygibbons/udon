var gulp = require('gulp');
var stylus = require('gulp-stylus');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


gulp.task('default', ['stylus', 'js'], function() {
  console.log('Dropping the udon in the pot.');
  browserSync.init({
    proxy: "cg.udon"
  });
  gulp.watch('src/stylus/*.styl', ['stylus']);
  gulp.watch('src/js/*.js', ['js']).on('change', browserSync.reload);
  gulp.watch(['*.php', 'views/*.twig']).on('change', browserSync.reload);
});


gulp.task('stylus', function() {
  gulp.src('src/stylus/*.styl')
  .pipe(stylus({
    'include css': true,
    'compress': true
  }))
  .pipe(autoprefixer('last 15 version'))
  .on('error', function(err) { console.log(err.message); })
  .pipe(gulp.dest('.'))
  .pipe(browserSync.stream({match: '**/*.css'}));
});


gulp.task('js', function() {
  gulp.src('src/js/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('assets/js'));
});
