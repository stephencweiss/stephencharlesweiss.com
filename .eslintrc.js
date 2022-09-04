// Notes on configuring eslint can be found here: https://eslint.org/docs/user-guide/configuring
module.exports = {
    extends: ['eslint:recommended', 'eslint-config-prettier'],
    env: {
        browser: true,
        node: true,
    },
    plugins: ['react'],
    // globals: {
    //     graphql: false,
    // },
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 9,
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true,
        },
    },
    root: true,
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            processor: '@graphql-eslint/graphql',
            parser: '@typescript-eslint/parser',
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended',
            ],
            env: {
                es6: true,
            },
        },
        {
            files: ['*.graphql'],
            parser: '@graphql-eslint/eslint-plugin',
            plugins: ['@graphql-eslint'],
            rules: {
                '@graphql-eslint/no-anonymous-operations': 'error',
                '@graphql-eslint/naming-convention': [
                    'error',
                    {
                        OperationDefinition: {
                            style: 'PascalCase',
                            forbiddenPrefixes: [
                                'Query',
                                'Mutation',
                                'Subscription',
                                'Get',
                            ],
                            forbiddenSuffixes: [
                                'Query',
                                'Mutation',
                                'Subscription',
                            ],
                        },
                    },
                ],
            },
        },
    ],
}
