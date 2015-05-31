var gulp = require('gulp'),
	sass = require('gulp-sass'),
	gulpif  = require('gulp-if'),
	minifycss = require('gulp-minify-css'),
	sourcemaps = require('gulp-sourcemaps'),
	watch = require('gulp-watch'),
	concat = require('gulp-concat');

var env = 'development';
var sassDir = './public/styles/sass/*.scss';
var sassOut = './public/styles';

var jsDir = './public/js/components/*.js';
var jsOut = './public/js';

gulp.task('styles', function () {
	var config = {};

	if (env === 'development'){
	  config.sourceComments = 'map';
	}

	return gulp.src(sassDir)
		.pipe( sass( config ) )
		.pipe( gulpif(env != 'development', minifycss())  )
		.pipe( gulp.dest(sassOut) );
});


gulp.task('js', function() {
  return gulp.src(jsDir)
      .pipe(concat('main.js'))
      //.pipe( gulpif(env != 'development', uglify())) 
    .pipe( gulp.dest(jsOut) );
});

gulp.task('all', function(){
  	gulp.watch('./public/styles/sass/components/*.scss', ['styles']),
  	gulp.watch('./public/js/components/*.js', ['js']);
});