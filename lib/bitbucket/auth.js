const authenticate = async () => {
    const auth = await cli.keystore.getCredentials('bitbucket');

    if (auth) {
        return auth;
    } else {
        const baseUrl = 'https://api.bitbucket.org';
        const { user, pass } = await cli.ui.prompt
            .prompt([
                {
                    name: 'user',
                    message: 'Please enter your Bitbucket username:'
                },
                {
                    name: 'pass',
                    message: 'Please enter your Bitbucket app password:'
                }
            ]);
        const auth = { baseUrl, credentials: { user, pass } };
        await cli.keystore.setCredentials('bitbucket', auth);
        return auth;
    }
};

module.exports = {
    authenticate
};