var gulp     = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var paths    = require('../config.js');

gulp.task('imagemin', function () {
    return gulp.src(paths.images + '/*')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest(paths.dist + paths.images));
});
