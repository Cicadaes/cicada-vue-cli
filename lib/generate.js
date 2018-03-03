const path = require('path');
const metalsmith = require('metalsmith');

const util = require('../lib/util');
const interactive = require('../lib/interactive');
const render = require('../lib/render');

module.exports = function generate (type, name, from, to, done) {
    const opts = util.getOptions(name, from);
    const metalsmithInst = metalsmith(path.join(from, 'template'));

    metalsmithInst
        .use(interactive(opts.prompts))
        .use(render());

    metalsmithInst.clean(false)
        .source('.') // start from template root instead of `./src` which is Metalsmith's default for `source`
        .destination(to)
        .build((err, files) => {
            done(err);
        });
}