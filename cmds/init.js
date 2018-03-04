const commandCtor = require('../lib/commandCtor');

Object.assign(exports, commandCtor, {
    command: 'init <template> [name]',
    describe: 'Create a Vue project with a template'
});