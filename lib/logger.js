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
exports.logger = log4js.getLogger();