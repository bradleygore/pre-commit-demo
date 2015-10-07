var Server = require('karma').Server,
    gitUtil = require('../gulp-utils/git'),
    asciiUtil = require('../gulp-utils/ascii'),
    GIT_STATUSES = gitUtil.STATUSES,
    unique = require('lodash/array/uniq');

module.exports = function (done) {

    gitUtil.getIndexedFiles().then(function(files) {

        var modJsFiles = unique(files.filter(function isJsFile(fileInfo) {
            //filter out deleted files regardless of extension
            return fileInfo.status !== GIT_STATUSES.DELETED && /js\//.test(fileInfo.path) && /\.js/.test(fileInfo.path);
        }).map(function cleanLine(fileInfo) {
            //we only care about the paths, and at that we only want to get the -spec files related to each
            var filePath = fileInfo.path;

            if (filePath.indexOf('-spec.js') !== -1) {
                return filePath;
            } else {
                return filePath.replace('.js', '-spec.js');
            }
        }));

        if (modJsFiles.length === 0) {
            return done();
        }

        new Server({
            configFile: __dirname + '/../karma.conf.js',
            files: [
                'js/**/!(*-spec).js'
            ].concat(modJsFiles),
            singleRun: true
        }, function(status) {
            var error;
            if (status !== 0) {
                error = new Error('\n' + asciiUtil.facepalm + '\n');
            }
            done(error);
        }).start();
    }).catch(function(up) {
        throw up;
    });
};

