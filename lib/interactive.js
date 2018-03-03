const async = require('async');
const inquirer = require('inquirer')

const util = require('./util');

// Support types from prompt-for which was used before
const promptMapping = {
    string: 'input',
    boolean: 'confirm'
}

/**
 * Inquirer prompt wrapper.
 * @param {*} metedata 
 * @param {*} key 
 * @param {*} prompt 
 * @param {*} done 
 */
function prompt(metedata, key, prompt, done) {
    // Skip prompts whose when condition is not met
    if (prompt.when && !util.evaluate(prompt.when, metedata)) {
        return done();
    }

    let promptDefault = prompt.default;
    if (typeof prompt.default === 'function') {
        promptDefault = function () {
            return prompt.default.bind(this)(metedata)
        }
    }

    inquirer.prompt([
        {
            type: promptMapping[prompt.type] || prompt.type,
            name: key,
            message: prompt.message || prompt.label || key,
            default: promptDefault,
            choices: prompt.choices || [],
            validate: prompt.validate || (() => true)
        }
    ]).then(answers => {
        if (Array.isArray(answers[key])) {
            metedata[key] = {};
            answers[key].forEach(multiChoiceAnswer => {
                metedata[key][multiChoiceAnswer] = true;
            });
        } else if (typeof answers[key] === 'string') {
            metedata[key] = answers[key].replace(/"/g, '\\"');
        } else {
            metedata[key] = answers[key];
        }
        done();
    }).catch(done());
}

module.exports = function (prompts) {

    return (files, metalsmith, done) => {
        const metedata = metalsmith.metedata();

        async.eachSeries(Object.keys(prompts), (key, next) => {
            prompt(metedata, key, prompt[key], next);
        }, done);
    };
}