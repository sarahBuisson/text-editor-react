var gulp = require('gulp'),
    gprint = require('gulp-print'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    runSequence = require('run-sequence'),
    ts = require('gulp-typescript'),
    webpack = require('webpack-stream'),
    connect = require('gulp-connect'),
    plumber = require('gulp-plumber'),
    args = require('yargs').argv;

var plumberConfig = {
  handleError: function (err) {
    console.log(err);
    this.emit('end');
  }
};

gulp.task('default', ['build'], function(done) {
  // if (args.prod) {
  //   done();
  //   return;
  // }

  gulp.start('watch');
});

gulp.task('server', function() {
  connect.server({
    root: './public',
    port: 8080,
    livereload: false
  });
});

gulp.task('watch', ['server'], function() {
  gulp.watch('./src/**/*.tsx', ['build']);
});

gulp.task('build', ['clean', 'vendor', 'webpack'], function(done) {
    done();
});

gulp.task('clean', function(done) {
    done();
});

gulp.task('vendor', function() {
  return gulp.src([
      './public/vendor/jquery.min.js', 
      './public/vendor/react-with-addons.min.js', 
      './public/vendor/react-dom.min.js', 
      './public/vendor/redux.min.js', 
      './public/vendor/react-redux.min.js', 
      './public/vendor/redux-thunk.min.js'])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('webpack', function() {
  var config = args.prod ? './webpack.config.Prod.js' : './webpack.config.Dev.js';
  console.log('Running webpack using: ' + config);

  return gulp.src('./src/index.tsx')
    .pipe(plumber(plumberConfig))
    .pipe(webpack(require(config)))
    .pipe(gulp.dest('./public/js/'));
});