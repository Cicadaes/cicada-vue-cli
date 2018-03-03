const async = require('async');
const render = require('consolidate').handlebars.render;

module.exports = function () {
    return (files, metalsmith, done) => {
        const keys = Object.keys(files);
        const metadata = metalsmith.metadata();

        async.each(keys, (file, next) => {
            const str = files[file].contents.toString();

            // Don't attempt to render files that do not have mustaches
            if (!/{{([^{}]+)}}/g.test(str)) {
                return next();
            }
            render(str, metadata, (err, res) => {
                if (err) {
                    err.message = `[${file}] ${err.message}`
                    return next(err)
                }
                files[file].contents = new Buffer(res);
                next();
            });
        }, done);
    };
};