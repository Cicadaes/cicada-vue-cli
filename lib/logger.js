const log4js = require('log4js');

log4js.configure({
    appenders: {
        console: {type: 'console', layout: {
            type: 'pattern',
            pattern: '%[ %p: %m %]'
        }}
    },
    categories: {
        default: {appenders: ['console'], level: 'trace'}
    }
});
const logger = log4js.getLogger();

exports.error = function (msg) {
    logger.error(msg);
    process.exit(1);
};

exports.info = function (msg) {
    logger.info(msg);
};

exports.debug = function (msg) {
    logger.debug(msg);
};

exports.log = function (msg) {
    logger.log(msg);
};