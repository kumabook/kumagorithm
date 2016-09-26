var gulp          = require('gulp');
var babel         = require('gulp-babel');
var using         = require('gulp-using');
var webserver     = require('gulp-webserver');
var plumber       = require('gulp-plumber');
var webpack       = require('gulp-webpack');
var jsdoc         = require('gulp-jsdoc3');
var webpackConfig = require('./webpack.config');

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
    .pipe(jsdoc(docConfig, cb));
});

var docConfig = {
  "tags": {
    "allowUnknownTags": true
  },
  "source": {
    "includePattern": ".+\\.js(doc|x)?$",
    "excludePattern": "(^|\\/|\\\\)_"
  },
  "opts": {
    "destination": "./docs/gen"
  },
  "plugins": [
    "plugins/markdown"
  ],
  "templates": {
    "cleverLinks": false,
    "monospaceLinks": false,
    "default": {
      "outputSourceFiles": true
    },
    "path": "./node_modules/ink-docstrap/template",
    "theme": "flatly",
    "navType": "vertical",
    "linenums": true,
    "dateFormat": "MMMM Do YYYY, h:mm:ss a"
  }
};
