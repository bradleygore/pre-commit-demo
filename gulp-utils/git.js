var Q = require('q'),
    git = require('gulp-git'),
    indexedFiles;

exports.STATUSES = {
    MODIFIED: ' M ',
    ADDED: '?? ',
    DELETED: ' D ',
    ADDED_MODIFIED: 'AM ',
    ADDED_DELETED: 'AD '
};
//freeze so no accidental overwrites of status constants
Object.freeze(exports.STATUSES);

exports.getIndexedFiles = function() {
    if (indexedFiles) {
        return Q.when(indexedFiles);
    }

    var defer = Q.defer();

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
            defer.reject(err);
        } else {
            if (status.length === 0) {
                indexedFiles = [];
            } else {
                indexedFiles = status.split('\n').map(function (s) {
                    if (s.length < 1) {
                        return null;
                    }

                    //first, split out the status from the file path
                    var fileStatus = s.substr(0, 3),
                        filePath = s.substr(3);

                    return {
                        status: fileStatus,
                        path: filePath
                    };
                }).filter(function(f) {
                    return f !== null;
                });
            }
            defer.resolve(indexedFiles)
        }
    });

    return defer.promise;
};
