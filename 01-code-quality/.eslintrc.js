module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {},
  overrides: [
    {
      files: ['*.js'],
      rules: {
        'linebreak-style': 'off',
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'class-methods-use-this': 'off',
        'no-console': 'off',
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      },
    },
  ],
};
