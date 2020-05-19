var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('default', function () {
    return gulp.src(
        [
            './node_modules/moment/min/moment.min.js',
            './node_modules/handlebars/dist/handlebars.min.js',
            './templates/templates.min.js',
            './templates/partials.js',
            './all-pull-requests.js'
        ])
        .pipe(concat('all-pull-requests.min.js'))
        .pipe(gulp.dest('./dist/'))
});