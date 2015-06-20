var gulp  = require('gulp');
var utils = require('gulp-util');

gulp.task('default', function() {
    var m     = utils.colors.magenta;
    var g     = utils.colors.grey;
    var title = utils.colors.bgYellow;

    console.log(title('Configuration'));
    console.log('Before starting to code, please configure your paths in config.js');
    console.log(title('Tasks'));
    console.log(m('default'), g('...........'),  'Documentation');
    console.log(m('browser-sync'), g('......'), 'Start the local server');
    console.log(m('clean'), g('.............'), 'Clean the dist folder');
    console.log(m('templates'), g('.........'), 'Build the jade templates');
    console.log(m('imagemin'), g('..........'), 'Image optimization');
    console.log(m('uglify'), g('............'), 'Javascript optimization');
    console.log(m('watch'), g('.............'), 'Recompile files after a file changing');
    console.log(m('deploy'), g('............'), 'Clean + Uglify + Imagemin');
});
