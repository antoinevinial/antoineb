var gulp   = require('gulp');
var cssmin = require('gulp-cssmin');
var paths  = require('../config.js');

gulp.task('cssmin', ['sass'], function () {
    return gulp.src(paths.dist + paths.css + '**/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest(paths.dist + paths.css));
});
