var gulp = require('gulp');
var concat = require('gulp-concat');
var replace = require('gulp-replace');
var rename = require('gulp-rename');

gulp.task('build-manifest', function () {
    return gulp
        .src('./manifest.json.tpl')
        .pipe(replace('$TFSURL$', process.env.TFSURL))
        .pipe(rename('manifest.json'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('build-js', function() {
    return gulp
        .src(
            [
                './node_modules/moment/min/moment.min.js',
                './node_modules/handlebars/dist/handlebars.min.js',
                './templates/templates.min.js',
                './templates/partials.js',
                './all-pull-requests.js'
            ])
        .pipe(replace('$TFSURL$', process.env.TFSURL))
        .pipe(concat('all-pull-requests.min.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('build-css', function () {
    return gulp
        .src('./all-pull-requests.css')
        .pipe(gulp.dest('./dist/'));
})

gulp.task('default', gulp.parallel('build-manifest', 'build-js', 'build-css'));