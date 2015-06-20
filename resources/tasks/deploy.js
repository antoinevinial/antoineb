var gulp   = require('gulp');
var uglify = require('gulp-uglify');
var paths  = require('../config.js');

gulp.task('deploy', ['clean', 'uglify', 'cssmin', 'imagemin']);
