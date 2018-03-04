const path = require('path');
const async = require('async');
const nunjucks = require('nunjucks');
const consolidate = require('consolidate');

const tags = {
    // blockStart: '<%',
    // blockEnd: '%>',
    variableStart: '{=',
    variableEnd: '=}',
    // commentStart: '<#',
    // commentEnd: '#>'
};
consolidate.requires.nunjucks = nunjucks.configure({
    tags
});
const render = consolidate.nunjucks.render;

const variableReg = new RegExp(tags.variableStart + '(.+?)' + tags.variableEnd, 'g');
const logger = require('./logger');

module.exports = function () {
    return (files, metalsmith, done) => {
        const keys = Object.keys(files);
        const metadata = metalsmith.metadata();

        async.each(keys, (file, next) => {
            const str = files[file].contents.toString();

            // Don't attempt to render files that do not have mustaches
            if (!variableReg.test(str) && !variableReg.test(file)) {
                return next();
            }

            render(str, metadata, (err, res) => {
                if (err) {
                    err.message = `[${file}] ${err.message}`
                    return next(err)
                }
                files[file].contents = new Buffer(res);

                const pathParse = path.parse(file);

                if (variableReg.test(file)) {
                    // Rename filename
                    render(pathParse.base, metadata, (err, base) => {
                        if (err) logger.error(err);
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