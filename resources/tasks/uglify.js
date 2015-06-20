var gulp   = require('gulp');
var uglify = require('gulp-uglify');
var paths  = require('../config.js');

gulp.task('uglify', ['browserify'], function() {
    return gulp.src([paths.dist + paths.scripts + '**/*.js', '!' + paths.dist + paths.scripts + 'vendor/'])
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist + paths.scripts));
});
