exports.command = 'plugin [name]';
exports.aliases = ['p'];
exports.describe = 'Create a Vue plugin with a template';
exports.builder = function (yargs) {
    return yargs
        .example('$0 plugin cvc-demo')
        .version()
        .options('name', {
            alias: 'n',
            describe: 'Define name as plugin dir, usage: Vue.use([name])',
            type: 'string',
            demand: true
        })
};
exports.handler = function (argv) {
    console.log('Create Vue\'s plugin success');
}