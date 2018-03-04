const spawn = require('child_process').spawn;
const chalk = require('chalk');

/**
 * Spawns a child process and runs the specified command
 * By default, runs in the CWD and inherits stdio
 * Options are the same as node's child_process.spawn
 * @param {*} cmd 
 * @param {*} args 
 * @param {*} options 
 */
function exec (cmd, args, options) {
    return new Promise((resolve, reject) => {
        const _spawn = spawn(
            cmd,
            args,
            Object.assign({
                cwd: process.cwd(),
                stdio: 'inherit',
                shell: true
            }, options)
        );

        _spawn.on('exit', () => {
            resolve();
        });
    });
}

/**
 * Install dependencies
 * @param {*} cwd 
 * @param {*} tool 
 */
module.exports = function (cwd, executable = 'npm') {
    console.log(`\n\n# ${chalk.green('Installing project dependencies ...')}`);
    console.log('# ========================\n');
    return exec(executable, ['install'], {
        cwd
    });
};