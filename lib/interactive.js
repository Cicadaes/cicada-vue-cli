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
 * @param {*} metadata 
 * @param {*} key 
 * @param {*} prompt 
 * @param {*} done 
 */
function prompt(metadata, key, prompt, done) {
    // Skip prompts whose when condition is not met
    // if (prompt.when && !util.evaluate(prompt.when, metadata)) {
    //     return done();
    // }

    let promptDefault = prompt.default;
    if (typeof prompt.default === 'function') {
        promptDefault = function () {
            return prompt.default.bind(this)(metadata)
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
        // metadata = metalsmith.metadata()
        if (Array.isArray(answers[key])) {
            metadata[key] = {};
            answers[key].forEach(multiChoiceAnswer => {
                metadata[key][multiChoiceAnswer] = true;
            });
        } else if (typeof answers[key] === 'string') {
            metadata[key] = answers[key].replace(/"/g, '\\"');
        } else {
            metadata[key] = answers[key];
        }
        done();
    }).catch(done);
}

module.exports = function (prompts) {

    return (files, metalsmith, done) => {
        const metadata = metalsmith.metadata();

        async.eachSeries(Object.keys(prompts), (key, next) => {
            prompt(metadata, key, prompts[key], next);
        }, done);
    };
}