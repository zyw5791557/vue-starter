module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        'indent': [2,4],
        'semi': [0],
        'no-trailing-spaces': 0
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}