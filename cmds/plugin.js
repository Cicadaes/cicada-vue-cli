const commandCtor = require('../lib/commandCtor');

Object.assign(exports, commandCtor, {
    command: 'plugin <template> [name]',
    aliases: ['p'],
    describe: 'Create a Vue plugin with a template'
});
