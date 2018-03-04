const path = require('path');
const async = require('async');
const nunjucks = require('nunjucks');
const render = require('consolidate').nunjucks.render;

const tags = {
    // blockStart: '<%',
    // blockEnd: '%>',
    variableStart: '{=',
    variableEnd: '=}',
    // commentStart: '<#',
    // commentEnd: '#>'
};
nunjucks.configure({
    tags
});
// const variableReg = new RegExp(tags.variableStart + '(.+?)' + tags.variableEnd, 'g');
const variableReg = new RegExp(tags.variableStart + '(.+?)' + tags.variableEnd);

const logger = require('./logger');

module.exports = function () {
    return (files, metalsmith, done) => {
        const keys = Object.keys(files);
        const metadata = metalsmith.metadata();

        async.each(keys, (file, next) => {
            const str = files[file].contents.toString();

            // Don't attempt to render files that do not have mustaches
            // console.log('%s:%s-%s', file, variableReg.test(file), variableReg.test(str))
            if (!variableReg.test(file) && !variableReg.test(str)) {
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