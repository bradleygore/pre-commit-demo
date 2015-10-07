var Server = require('karma').Server;

module.exports = function (done) {
    new Server({
        configFile: __dirname + '/../karma.conf.js',
        singleRun: true
    }, function() {
        done();
    }).start();
};
