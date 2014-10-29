var gulp        = require('gulp'),
  gutil         = require('gulp-util'),
  plumber       = require('gulp-plumber'),
  sass          = require('gulp-ruby-sass'),
  prefix        = require('gulp-autoprefixer');
  
var onError = function (err) {
  gutil.beep();
  gutil.log(gutil.colors.red(err));
};
  
gulp.task('default', function () {
  gulp.watch('./src/scss/*.scss', ['sass']);
});

gulp.task('sass', function () {
  return gulp.src('./src/scss/style.scss')
  .pipe(plumber({
    errorHandler: onError
  }))
  .pipe(sass({
    style: 'compact'
  }))
  .pipe(prefix("last 2 versions", "> 5%", "ie 8", "ie 7"))
  .pipe(gulp.dest('./dist/css/'));
});