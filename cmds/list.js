const request = require('request');
const chalk = require('chalk');

const logger = require('../lib/logger').logger;

exports.command = 'list';
exports.aliases = ['l'];
exports.describe = 'List all offical templates';
exports.builder = function (yargs) {

};
exports.handler = function (argv) {
    /**
     * List all offical template repos
     */
    request({
        url: 'https://api.github.com/users/cicadaes/repos',
        headers: {
            'User-Agent': ''
        }
    }, (err, res, body) => {
        if (err) logger.error(err);
        const repos = JSON.parse(body);
        let repoName;
        let plugins = [];
        let apps = [];

        if (Array.isArray(repos)) {
            console.log()
            console.log('Available offical templates, include plugin and application');
            console.log()
            repos.forEach(repo => {
                repoName = repo.name;
                if (/^[template-vue]/.test(repoName)) {
                    repoName = repoName.replace(/^(template-vue-)/, '');
                    if (/^[plugin]/.test(repoName)) {
                        repo.name = repoName.replace(/^(plugin-)/, '');
                        plugins.push(repo);
                    } else {
                        repo.name = repoName;
                        apps.push(repo);
                    }
                }
            });
            console.log('  ' + chalk.yellow('plugins'));
            plugins.forEach(repo => {
                console.log(
                    '    ' + chalk.yellow('#') +
                    '  ' + chalk.blue(repo.name) +
                    ' - ' + repo.description
                );
            });
            console.log('  ' + chalk.yellow('apps'));
            apps.forEach(repo => {
                console.log(
                    '    ' + chalk.yellow('#') +
                    '  ' + chalk.blue(repo.name) +
                    ' - ' + repo.description
                );
            });
        }
    });
}