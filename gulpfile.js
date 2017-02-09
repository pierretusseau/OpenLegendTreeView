const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

const sassPath = './src/**/*.scss';

gulp.task('sass:watch', function () {
  return gulp.watch(sassPath, ['sass']);
});

gulp.task('sass', function () {
  return gulp.src(sassPath)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('index-sass.css'))
    .pipe(gulp.dest('./src/'));
});

gulp.task('default', ['sass', 'sass:watch']);
