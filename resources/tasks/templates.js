var gulp         = require('gulp');
var jade         = require('gulp-jade');
var paths        = require('../config.js');
var notify       = require("gulp-notify");

gulp.task('templates', function() {
  return gulp.src('templates/*.jade')
    .pipe(
        jade({
            pretty: true
        }).on('error', notify.onError(function (error) {
            return "Jade: " + error.message;
        }))
    )
    .pipe(gulp.dest('../'));
});
