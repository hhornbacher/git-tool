const shell = require('shelljs');

const backends = {
    bitbucket: require('./bitbucket/repo'),
    github: require('./github/repo'),
    gitlab: require('./gitlab/repo')
};

const create = (backend, name) => {
    if (!backends[backend]) throw new Error('Backend not available');
    return backends[backend].create(name);
};

const remove = (backend, name) => {
    if (!backends[backend]) throw new Error('Backend not available');
    return backends[backend].remove(name);
};

const list = (backend, name) => {
    if (!backends[backend]) throw new Error('Backend not available');
    return backends[backend].list(name);
};

const get = (backend, name) => {
    if (!backends[backend]) throw new Error('Backend not available');
    return backends[backend].get(name);
};

const clone = (url) => shell.exec('git clone ' + url + '');

module.exports = {
    create,
    remove,
    list,
    get,
    clone
};