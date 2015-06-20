var gulp  = require('gulp');
var del   = require('del');
var paths = require('../config.js');

gulp.task('clean', function() {
    del([paths.dist + paths.scripts + '**/*.js', paths.dist + paths.css + '**/*.css', '!' + paths.dist + paths.scripts + 'vendor/*.js'], {force: true});
});
