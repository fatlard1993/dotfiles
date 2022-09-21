module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
		'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:json/recommended',
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  reportUnusedDisableDirectives: true,
  rules: {
    /* CS exceptions. */
    'class-methods-use-this': 'off',
    'import/no-unresolved': 'off',
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
    'prettier/prettier': 'error',
    'no-unused-vars': 'off',
    'import/order': 'warn',
    'no-console': 'error',
    'spaced-comment': 'off',
    'no-unused-expressions': 'off',
    'no-return-await': 'off',
  },
};
