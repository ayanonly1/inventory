var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('js', function () {
    gulp.src(['webAppNg/module.js', 'webAppNg/**/*.*'])
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        // .pipe(uglify())
        .pipe(gulp.dest('webApp/assets/js'));
})

gulp.task('watch:js', ['js'], function () {
    gulp.watch('webAppNg/**/*.js', ['js']);
})
