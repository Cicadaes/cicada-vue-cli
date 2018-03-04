const path = require('path');
const metalsmith = require('metalsmith');
const chalk = require('chalk');

const util = require('../lib/util');
const interactive = require('../lib/interactive');
const render = require('../lib/render');
const install = require('../lib/install');

module.exports = function generate (type, name, from, to, done) {
    const opts = util.getOptions(name, from);
    const metalsmithInst = metalsmith(path.join(from, 'template'));
    const metadata = Object.assign(metalsmithInst.metadata(), {
        destDirName: name,
        inPlace: to === process.cwd()
    });

    metalsmithInst
        .use(interactive(opts.prompts))
        .use(render());

    metalsmithInst.clean(false)
        .source('.') // start from template root instead of `./src` which is Metalsmith's default for `source`
        .destination(to)
        .build((err, files) => {
            done(err);

            const cwd = path.join(process.cwd(), metadata.inPlace ? '' : metadata.destDirName);
            if (metadata.autoInstall) {
                install(cwd, metadata.autoInstall).then(() => {
                    console.log('\n\n# ========================');
                    console.log(`# ${chalk.green('Installed ...')}`);
                });
            }
        });
}