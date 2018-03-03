const path = require('path');
const metalsmith = require('metalsmith');

const util = require('../lib/util');
const interactive = require('../lib/interactive');

module.exports = function generate (type, name, from, to, done) {
    const opts = util.getOptions(name, from);
    const metalsmithInst = metalsmith(path.join(from, 'template'));
    
    metalsmithInst.use(interactive(opts.prompts));
}