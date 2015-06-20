var gulp        = require('gulp');
var browserSync = require('browser-sync');
var paths       = require('../config.js');

gulp.task('watch', ['browser-sync'], function() {
    gulp.watch(paths.scripts + 'main/**/*.js', ['browserify', browserSync.reload]);
    gulp.watch(paths.css + '**/*.scss', ['sass', browserSync.reload]);
    gulp.watch(paths.templates + '**/*.jade',['templates', browserSync.reload]);
});
