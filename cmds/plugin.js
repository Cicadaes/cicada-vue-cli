const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const ora = require('ora');
const home = require('user-home');
const rm = require('rimraf').sync;
const download = require('download-git-repo');

const logger = require('../lib/logger').logger;
const generate = require('../lib/generate');

exports.command = 'plugin <template> [name]';
exports.aliases = ['p'];
exports.describe = 'Create a Vue plugin with a template';
exports.builder = function (yargs) {

};
exports.handler = function (argv) {
    const inPlace = !argv.name || argv.name === '.';
    const name = inPlace ? path.relative('../', process.cwd()) : argv.name;
    const to = path.resolve(argv.name || '.');
    const tmp = path.join(home, '.cicada-vue-template', argv.template);

    if (fs.existsSync(to)) {
        inquirer.prompt([
            {
                type: 'confirm',
                message: inPlace
                    ? 'Generate project in current directory?'
                    : 'Target directory exists. Continue?',
                name: 'ok'
            }
        ]).then(answers => {
            if (answers.ok) {
                run();
            }
        })
    } else {
        run();
    }

    function run () {
        // use offical templates
        const officalTemplate = 'cicadaes/template-vue-plugin-' + argv.template;
        downloadAndGenerate(officalTemplate);
    }

    function downloadAndGenerate (template) {
        const spinner = ora('downloading template');

        spinner.start();
        // Remove if local template
        if (fs.existsSync(tmp)) rm(tmp);
        download(template, tmp, err => {
            spinner.stop();
            if (err) logger.error(err.message);
            generate('plugin', name, tmp, to, err => {
                if (err) logger.error(err);
                console.log()
                logger.info('Generate "%s".', name);
            });
        });
    }
}
