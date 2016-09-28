const gulp          = require('gulp');
const babel         = require('gulp-babel');
const using         = require('gulp-using');
const webserver     = require('gulp-webserver');
const plumber       = require('gulp-plumber');
const webpack       = require('gulp-webpack');
const jsdoc         = require('gulp-jsdoc3');
const eslint        = require('gulp-eslint');
const webpackConfig = require('./webpack.config');
const jsdocConfig   = require('./jsdoc.config');


gulp.task('default', ['webpack', 'watch', 'webserver']);

gulp.task('eslint', () =>
          gulp.src(['src/**/*.jsx', 'gulpfile.js'])
              .pipe(eslint())
              .pipe(eslint.format())
              .pipe(eslint.failAfterError()));

gulp.task('server', () =>
          gulp.src('./')
              .pipe(webserver({
                livereload: true,
                open: true,
                port: 9000,
              })));

gulp.task('babel', () =>
          gulp.src(['./src/**/*.jsx', './src/**/*.js'])
              .pipe(plumber())
              .pipe(using())
              .pipe(babel())
              .pipe(gulp.dest('lib/')));

gulp.task('watch', ['server'], () =>
          gulp.watch(['./src/**/*.js', './src/**/*.jsx'], ['webpack', 'doc']));

gulp.task('webpack', [], () =>
          gulp.src(webpackConfig.entry)
              .pipe(webpack(webpackConfig))
              .pipe(gulp.dest(webpackConfig.output.path)));

gulp.task('doc', cb =>
          gulp.src(['README.md', './src/**/*.js'], { read: false })
              .pipe(jsdoc(jsdocConfig, cb)));
