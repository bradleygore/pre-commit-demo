var gulp = require('gulp'),
    gitUtil = require('../gulp-utils/git'),
    asciiUtil = require('../gulp-utils/ascii'),
    GIT_STATUSES = gitUtil.STATUSES,
    jshint = require('gulp-jshint');

module.exports = function preCommit(done) {

    gitUtil.getIndexedFiles().then(function(files) {
        if (files.length === 0) {
            return done();
        }

        var modJsFiles = files.filter(function isJsFile(fileInfo) {
            //filter out deleted files regardless of extension
            return fileInfo.status !== GIT_STATUSES.DELETED && /js\//.test(fileInfo.path) && /\.js/.test(fileInfo.path);
        }).map(function cleanLine(fileInfo) {
            //we only care about the paths
            return fileInfo.path;
        });

        if (modJsFiles.length === 0) {
            return done();
        }

        //console.log('\nLINT MODIFIED FILES', JSON.stringify(modJsFiles, null, 4));

        function noop() {}

        gulp.src(modJsFiles)
            .pipe(jshint('.jshintrc'))
            .on('error', noop)
            .on('end', function(status) {
                console.log('statusCode: ', status);

                if(status === 0) {
                    console.log('\n' + asciiUtil.thumbsUp + '\n');
                }

                done(status);
            })
            .pipe(jshint.reporter('default'))
            .pipe(jshint.reporter('fail'));
    }).catch(function(e) {
        throw e;
    });
};

module.exports.dependencies = ['test-modified'];
