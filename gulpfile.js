var gulp          = require('gulp');
var babel         = require('gulp-babel');
var using         = require('gulp-using');
var webserver     = require('gulp-webserver');
var plumber       = require('gulp-plumber');
var webpack       = require('gulp-webpack');
var jsdoc         = require('gulp-jsdoc3');
var webpackConfig = require('./webpack.config');
var jsdocConfig   = require('./jsdoc.config');

gulp.task('default', ['webpack', 'watch', 'webserver']);

gulp.task('server', function() {
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
            open: true,
            port: 9000
        }));
});

gulp.task('babel', function() {
  return gulp.src(['./src/**/*.jsx', './src/**/*.js'])
        .pipe(plumber())
        .pipe(using())
        .pipe(babel())
        .pipe(gulp.dest('lib/'));
});

gulp.task('watch', ['server'], function() {
  gulp.watch(['./src/**/*.js', './src/**/*.jsx'], ['webpack', 'doc']);
});

gulp.task('webpack', [], function() {
  return gulp.src(webpackConfig.entry)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(webpackConfig.output.path));
});

gulp.task('doc', function (cb) {
  gulp.src(['README.md', './src/**/*.js'], {read: false})
    .pipe(jsdoc(jsdocConfig, cb));
});
