var gulp = require('gulp'),
    jshint = require('gulp-jshint');

module.exports = function lintJs() {
    return gulp.src('js/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
};
