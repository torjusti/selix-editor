var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var uglify = require('gulp-uglify');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');

gulp.task('styles', function() {
  return gulp.src('styles/main.scss')
    .pipe(sass({style: 'compresses'}))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('scripts', function() {
  return gulp.src('scripts/main.js')
    .pipe(browserify())
    .pipe(gulp.dest('dist/scripts/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts/'));
});

gulp.task('default', function() {
    gulp.start('styles', 'scripts');
});

gulp.task('watch', function() {
  gulp.watch('styles/*.scss', ['styles']);
  gulp.watch('scripts/*.js', ['scripts']);
});