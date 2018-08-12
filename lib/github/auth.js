const authenticate = async () => {
    const auth = await cli.keystore.getCredentials('github');

    if (auth) {
        return auth;
    } else {
        const baseUrl = 'https://api.github.com';
        const { user, pass } = await cli.ui.prompt
            .prompt([
                {
                    name: 'user',
                    message: 'Please enter your Github username:'
                },
                {
                    name: 'pass',
                    message: 'Please enter your Github personal access token:'
                }
            ]);
        const auth = { baseUrl, credentials: { user, pass } };
        await cli.keystore.setCredentials('github', auth);
        return auth;
    }
};

module.exports = {
    authenticate
};