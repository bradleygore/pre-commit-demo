var Server = require('karma').Server;

/**
 * Run all tests once and exit
 */
module.exports = function (done) {
    new Server({
        configFile: __dirname + '/../karma.conf.js',
        singleRun: true
    }, done).start();
};
