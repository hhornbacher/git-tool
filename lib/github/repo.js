const { authenticate } = require('./auth');

/**
 * Create a new repository
 * @param {string} name Name of the repository to create
 * @returns {Promise<string>} Git URL to the new repository
 */
const create = (name) => authenticate().then(({ credentials: { user, pass }, baseUrl }) => cli.request({
    baseUrl,
    uri: '/user/repos',
    method: 'POST',
    headers: {
        'User-Agent': 'CLI'
    },
    auth: { user, pass },
    json: true,
    body: { name }
}))
    .then((project) => project.ssh_url);

/**
 * Remove a repository by name
 * @param {string} name Name of the repository to delete
 * @returns {Promise<>}
 */
const remove = (name) => authenticate().then(({ credentials: { user, pass }, baseUrl }) => cli.request({
    baseUrl,
    uri: `/repos/${user}/${name}`,
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
const list = () => authenticate().then(({ credentials: { user, pass }, baseUrl }) => cli.request({
    baseUrl,
    uri: '/user/repos',
    method: 'GET',
    headers: {
        'User-Agent': 'CLI'
    },
    auth: { user, pass },
    json: true
}));

/**
 * Get information about a repository
 * @param {string} name Name of the repository to get
 */
const get = (name) => authenticate().then(({ credentials: { user, pass }, baseUrl }) => cli.request({
    baseUrl,
    uri: `/repos/${user}/${name}`,
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