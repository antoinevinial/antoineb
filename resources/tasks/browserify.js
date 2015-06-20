var gulp       = require('gulp');
var browserify = require('browserify');
var source     = require('vinyl-source-stream');
var paths      = require('../config.js');
var notify     = require("gulp-notify");

gulp.task('browserify', function() {
    return browserify('./' + paths.scripts + 'main/base.js')
    .bundle()
    .on('error', notify.onError(function (error) {
        return "Js: " + error.message;
    }))
    .pipe(source('main.js'))
    .pipe(gulp.dest(paths.dist + paths.scripts));

    onError: notify.onError(function (error) {
                return "Sass: " + error.message;
            })
});
