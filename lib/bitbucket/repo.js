const { authenticate } = require('./auth');

/**
 * Create a new repository
 * @param {string} name Name of the repository to create
 * @returns {Promise<string>} Git URL to the new repository
 */
const create = (name) => authenticate().then(({ credentials: { user, pass }, baseUrl }) => cli.request({
    baseUrl,
    uri: `/2.0/repositories/${user}/${name}`,
    method: 'POST',
    headers: {
        'User-Agent': 'CLI'
    },
    auth: { user, pass },
    json: true,
    body: { scm: 'git' }
}))
    .then((project) => `git@bitbucket.org:${project.full_name}.git`);

/**
 * Remove a repository by name
 * @param {string} name Name of the repository to delete
 * @returns {Promise<>}
 */
const remove = (name) => authenticate().then(({ credentials: { user, pass }, baseUrl }) => cli.request({
    baseUrl,
    uri: `/2.0/repositories/${user}/${name}`,
    method: 'DELETE',
    headers: {
        'User-Agent': 'CLI'
    },
    auth: { user, pass },
    json: true
}));

/**
 * List all repositories
 * @returns {Promise<Array<object>>}
 */
const list = (page = 1, pageSize = 20) => authenticate().then(({ credentials: { user, pass }, baseUrl }) => cli.request({
    baseUrl,
    uri: `/2.0/repositories/${user}?page=${page}&pagelen=${pageSize}`,
    method: 'GET',
    headers: {
        'User-Agent': 'CLI'
    },
    auth: { user, pass },
    json: true
}))
    .then(({ values: repos }) => repos.map(repo => ({
        id: repo.uuid.replace(/{|}/g, ''),
        path: repo.full_name,
        description: repo.description
    })));

/**
 * Get information about a repository
 * @param {string} name Name of the repository to get
 */
const get = (name) => authenticate().then(({ credentials: { user, pass }, baseUrl }) => cli.request({
    baseUrl,
    uri: `/2.0/repositories/${user}/${name}`,
    method: 'GET',
    headers: {
        'User-Agent': 'CLI'
    },
    auth: { user, pass },
    json: true
}));

module.exports = {
    create,
    remove,
    list,
    get
};