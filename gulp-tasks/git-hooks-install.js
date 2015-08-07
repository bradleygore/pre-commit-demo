var gulp = require('gulp'),
    chmod = require('gulp-chmod'),
    rename = require('gulp-rename');

module.exports = function() {
    if (/win/.test(process.platform)) {
        return gulp.src(['git-hooks/*-win', 'git-hooks/*-js'], {
                base: 'git-hooks'
            })
            .pipe(rename(function fixName(path) {
                path.basename = path.basename.replace('-win', '');
            }))
            .pipe(gulp.dest('.git/hooks'));

    } else {
        return gulp.src('git-hooks/*-js', {
                base: 'git-hooks'
            })
            .pipe(rename(function fixName(path) {
                path.basename = path.basename.replace('-js', '');
            }))
            //need to make them executable by all
            .pipe(chmod(755))
            .pipe(gulp.dest('.git/hooks'));
    }
};
