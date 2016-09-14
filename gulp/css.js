var gulp = require('gulp');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');

gulp.task('css', function () {
    gulp.src('webAppStyl/**/*.styl')
        .pipe(stylus())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('webApp/assets/css'))
});

gulp.task('watch:css', ['css'], function () {
    gulp.watch('webAppStyl/**/*.styl', ['css']);
})
