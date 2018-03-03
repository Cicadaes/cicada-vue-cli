const fs = require('fs');
const path = require('path');
const exec = require('child_process').execSync;
const metadata = require('read-metadata');

const logger = require('./logger').logger;

function getGitUser () {
    let name;
    let email;

    try {
        name = exec('git config --get user.name');
        email = exec('git config --get user.email');
    } catch (error) {

    }
    name = name && JSON.stringify(name.toString().trim()).slice(1, -1);
    email = email && (' <' + email.toString().trim() + '>');

    return (name || '') + (email || '');
}

/**
 * Get git user
 */
exports.getGitUser = getGitUser;

/**
 * Read prompts metadata
 * @param {*} name 
 * @param {*} dir 
 */
exports.getOptions = function getOptions (name, dir) {
    /**
     * Gets the metadata from 
     * @param {*} dir 
     */
    const getMetadata = function (dir) {
        const json = path.join(dir, 'metadata.json');
        const js = path.join(dir, 'metadata.js');
        let opts = {};

        if (fs.existsSync(json)) {
            opts = metadata.sync(json);
        } else if (fs.existsSync(js)) {
            const _export = require(path.resolve(js));

            if (_export !== Object(_export)) {
                throw new Error('metadata.js needs to expose an object');
            }
            opts = _export;
        }

        return opts;
    }

    /**
     * Set the default value for a prompt question
     * @param {*} opts 
     * @param {*} key 
     * @param {*} val 
     */
    const setDefault = function (opts, key, val) {
        if (opts.schema) {
            opts.prompts = opts.schema
            delete opts.schema;
        }
        const prompts = opts.prompts || (opts.prompts = {});
        if (!prompts[key] || typeof prompts[key] !== 'object') {
            prompts[key] = {
                'type': 'string',
                'default': val
            };
        } else {
            prompts[key]['default'] = val;
        }
    }

    const opts = getMetadata(dir);
    const author = getGitUser();

    setDefault(opts, 'name', name);
    
    if (author) {
        setDefault(opts, 'author', author)
    }

    return opts;
}

/**
 * Evaluate an expression in metadata.json in the context of prompt answers data
 * @param {*} exp 
 * @param {*} data 
 */
exports.evaluate = function (exp, data) {
    /* eslint-disable no-new-func */
    const fn = new Function('data', 'with (data) { return '+ exp +' }');

    try {
        return fn(data)
    } catch (error) {
        logger.error('Error when evaluating filter condition: ' + exp);
    }
}