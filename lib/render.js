const path = require('path');
const async = require('async');
const render = require('consolidate').handlebars.render;

module.exports = function () {
    return (files, metalsmith, done) => {
        const keys = Object.keys(files);
        const metadata = metalsmith.metadata();

        async.each(keys, (file, next) => {
            const str = files[file].contents.toString();

            // Don't attempt to render files that do not have mustaches
            if (!/{{([^{}]+)}}/g.test(str) && !/{{([^{}]+)}}/g.test(file)) {
                return next();
            }
 
            render(str, metadata, (err, res) => {
                if (err) {
                    err.message = `[${file}] ${err.message}`
                    return next(err)
                }
                files[file].contents = new Buffer(res);

                const pathParse = path.parse(file);

                if (/{{([^{}]+)}}/g.test(file)) {
                    // Rename filename
                    render(pathParse.base, metadata, (err, base) => {
                        const _file = path.join(pathParse.dir, base);
    
                        files[_file] = Object.assign({}, files[file]);
                        delete files[file];
                        next();
                    });
                } else {
                    next();
                }
            });
        }, done);
    };
};