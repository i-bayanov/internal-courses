module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
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
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': 'error',
      },
    },
  ],
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
