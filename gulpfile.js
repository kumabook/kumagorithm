var gulp          = require('gulp');
var babel         = require('gulp-babel');
var using         = require('gulp-using');
var webserver     = require('gulp-webserver');
var plumber       = require('gulp-plumber');
var webpack       = require('gulp-webpack');

gulp.task('default', ['webpack', 'watch', 'webserver']);

gulp.task('webserver', function() {
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
        .pipe(babel({optional: ['runtime']}))
        .pipe(gulp.dest('javascripts/src/'));
});

gulp.task('watch', ['webserver'], function() {
  gulp.watch(['./src/**/*.js', './src/**/*.jsx'], ['webpack']);
});

gulp.task('webpack', ['babel'], function() {
  return gulp.src(wpConfig.entry)
    .pipe(webpack(wpConfig))
    .pipe(gulp.dest('./javascripts/dist'));
});

var wpConfig = {
  entry: './javascripts/src/App.js',
  output: {
    filename: 'kumagorithm.js'
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      { test: /App.js$/, loader: 'expose?kumagorithm'},
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
