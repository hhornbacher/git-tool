const authenticate = async () => {
    const auth = await cli.keystore.getCredentials('gitlab');

    if (auth) {
        return auth;
    } else {
        const { baseUrl, token } = await cli.ui.prompt
            .prompt([
                {
                    name: 'baseUrl',
                    message: 'Please enter the base URL to your Gilab server:'
                },
                {
                    name: 'token',
                    message: 'Please enter your personal API token:'
                }
            ]);
        const auth = { baseUrl, token };
        await cli.keystore.setCredentials('gitlab', auth);
        return auth;
    }
};

module.exports = {
    authenticate
};