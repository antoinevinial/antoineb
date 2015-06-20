var gulp         = require('gulp');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var notify       = require("gulp-notify");
var paths        = require('../config.js');

var errorHandler = function(err){
    return notify().write('Sass error : ' + err);
}

gulp.task('sass', function () {
    return gulp.src(paths.css + '**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: false,
            onError: notify.onError(function (error) {
                return "Sass: " + error.message;
            })
        }))
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 version'] }) ])) //configure
        .pipe(sourcemaps.write(paths.maps))
        .pipe(gulp.dest(paths.dist + paths.css));
});
