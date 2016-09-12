'use strict';
const webpackConfig = require('./gulp/webpack.config.dev');

const gulp = require('gulp');
const gutil = require('gulp-util');
gulp.task('prepare', () => {
  return gulp.src([
      'node_modules/react/dist/react.js',
      'node_modules/react-dom/dist/react-dom.js'
    ])
    .pipe(gulp.dest('build'));
});
const browserSync = require('browser-sync').create();
gulp.task('web', function() {
  browserSync.init({
    server: {
      baseDir: './',
      middleware: function (req, res, next) {
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
        next();
      }

    }
  });
});

const webpack = require('webpack');
gulp.task('default', ['prepare', 'web'], () => {
  webpack(webpackConfig).watch({}, (err, stats) => {
    gutil.log(stats.toString({
      colors: true,
      chunks: false,
      children: false
    }));
  });

  gulp.watch(['build/*.js', 'build/*.css'], path => {
    browserSync.reload(path);
  });
});
