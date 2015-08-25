var gulp = require('gulp'),
    git = require('gulp-git'),
    jshint = require('gulp-jshint');

module.exports = function preCommit(done) {
    /*  --porcelain arg outputs all files separated by new line such that
     Modified files are preceded by         " M "
     New files are preceded by              "?? "
     Deleted files are preceded by          " D "
     Added then Deleted files preceded by   "AD "
     */

    git.status({
        args: '--porcelain',
        quiet: true
    }, function processStatus(err, status) {

        if (err) {
            throw err;
        }

        if (status.length === 0) {
            return done();
        }

        var modJsFiles = status.split('\n').filter(function isJsFile(line) {
            //filter out deleted files regardless of extension
            return line.charAt(1) !== 'D' && /js\//.test(line) && /\.js/.test(line);
        }).map(function cleanLine(line) {
            //each line is in format [3 char prefix]some/path/to/file.ext - so cut off the prefix
            return line.substring(3);
        });

        if (modJsFiles.length === 0) {
            return done();
        }

        function noop() {}

        gulp.src(modJsFiles)
            .pipe(jshint('.jshintrc'))
            .on('error', noop)
            .on('end', done)
            .pipe(jshint.reporter('default'))
            .pipe(jshint.reporter('fail'));

    });
};
