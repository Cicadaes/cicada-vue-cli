const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const shelljs = require('shelljs');
const log4js = require('log4js');

log4js.configure({
    appenders: {
        console: {type: 'console', layout: {
            type: 'pattern',
            pattern: '%[ %p: %m %]'
        }}
    },
    categories: {
        default: {appenders: ['console'], level: 'trace'}
    }
});
logger = log4js.getLogger();

const generate = function (config) {
    const cwd = process.cwd();

    try {
        const stat = fs.statSync(path.resolve(cwd, config.name));

        if (stat.isDirectory()) {
            logger.warn(`Project already exist named ${config.name}`);
            return;
        }
        throw new Error('Generate project with name');
    } catch (error) {
        const pluginDir = path.resolve(cwd, config.name);

        shelljs.mkdir(pluginDir);
        shelljs.cp('-R', path.join(__dirname, '../', `templates/${config.template}/*`), pluginDir);
        shelljs.ls('-Rl', pluginDir)
            .filter(function (stats) {
                return stats.isFile();
            })
            .map(function (stats) {
                return stats.name;
            })
            .forEach(function (f) {
                const file = path.join(pluginDir, f);
                const dotFiles = ['gitignore', 'npmignore'];

                if (dotFiles.indexOf(f) > -1) {
                    return shelljs.mv(f, path.join(pluginDir, '.' + f));
                }

                shelljs.sed('-i', /<#=name#>/g, config.name, file);
                shelljs.sed('-i', /<#=version#>/g, config.version, file);
                shelljs.sed('-i', /<#=description#>/g, config.description, file);
                shelljs.sed('-i', /<#=keywords#>/g, config.keywords, file);

                var _file = file.replace(/\{\{#(.+)\}\}/g, function (match, g1) {
                    return config[g1] || match;
                });

                shelljs.mv(file, _file);
            })
    }
};

const install = function (config) {
    shelljs.cd(config.name);

    if (shelljs.which('yarn')) {
        shelljs.exec('yarn install');
    } else {
        shelljs.exec('npm install');
    }
    
}

exports.command = 'plugin';
exports.aliases = ['p'];
exports.describe = 'Create a Vue plugin with a template';
exports.builder = function (yargs) {
    // return yargs
    //     .example('$0 plugin cvc-demo')
    //     .version()
    //     .options('name', {
    //         alias: 'n',
    //         describe: 'Define name as plugin dir, usage: Vue.use([name])',
    //         type: 'string',
    //         demand: true
    //     });
};
exports.handler = function (argv) {
    const tpls = fs.readdirSync(path.join(__dirname, '../templates'));
    const questions = [
        {
            type: 'input',
            name: 'name',
            message: 'Define name as plugin dir. Usage:Vue.use([name]):',
            validate: function (value) {
                if (value) {
                    return true;
                }
                return 'You must enter name';
            }
        },
        {
            type: 'input',
            name: 'version',
            message: 'Please enter version:',
            default: '1.0.0'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Please enter description:'
        },
        {
            type: 'input',
            name: 'keywords',
            message: 'Please enter keywords:'
        },
        {
            type: 'list',
            name: 'template',
            message: 'Please enter template:',
            default: 'rollup',
            choices: tpls
        },
        {
            type: 'confirm',
            name: 'install',
            message: 'Is install dependencies package',
            default: true
        }
    ];

    inquirer.prompt(questions).then(function (answer) {
        let keywords = answer.keywords;

        keywords = keywords.replace(/\s+/g, ',')
            .split(',')
            .map(function (k) {
                return JSON.stringify(k)
            })
            .join(', ');

        answer.keywords = keywords;
        generate(answer);
        if (answer.install) {
            install(answer);
        }
    });
}