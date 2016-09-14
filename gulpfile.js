var fs = require('fs');
var gulp = require('gulp');
fs.readdirSync(__dirname + '/gulp').forEach(function(task) {  
    require('./gulp/' + task);
})

gulp.task('dev', ['watch:js', 'watch:css', 'watch:server']);
