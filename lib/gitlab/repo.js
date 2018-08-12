const { authenticate } = require('./auth');

/**
 * Create a new repository
 * @param {string} name Name of the repository to create
 * @returns {Promise<string>} Git URL to the new repository
 */
const create = (name) => authenticate().then(({ token, baseUrl }) => cli.request({
    baseUrl,
    uri: '/api/v4/projects',
    method: 'POST',
    headers: {
        'Private-Token': token
    },
    json: true,
    body: { name }
}))
    .then((project) => project.ssh_url_to_repo);

/**
 * Remove a repository by ID
 * @param {string} id ID of the repository to delete
 * @returns {Promise<>}
 */
const remove = (id) => authenticate().then(({ token, baseUrl }) => cli.request({
    baseUrl,
    uri: '/api/v4/projects/' + encodeURIComponent(id),
    method: 'DELETE',
    headers: {
        'Private-Token': token
    },
    json: true
}));

/**
 * List repositories
 * @param {number} page Page to get listed
 * @param {number} pageSize Size of one page
 * @returns {Promise<Array<object>>}
 */
const list = (page = 1, pageSize = 20) => authenticate().then(({ token, baseUrl }) => cli.request({
    baseUrl,
    uri: `/api/v4/projects?page=${page}&per_page=${pageSize}`,
    method: 'GET',
    headers: {
        'Private-Token': token
    },
    json: true
}))
    .then((repos) => repos.map(repo => ({
        id: repo.id,
        path: repo.path_with_namespace,
        description: repo.description
    })));

/**
 * Get information about a repository
 * @param {string} id ID of the repository to get
 */
const get = (id) => authenticate().then(({ token, baseUrl }) => cli.request({
    baseUrl,
    uri: '/api/v4/projects/' + encodeURIComponent(id),
    method: 'GET',
    headers: {
        'Private-Token': token
    },
    json: true
}));

module.exports = {
    create,
    remove,
    list,
    get
};