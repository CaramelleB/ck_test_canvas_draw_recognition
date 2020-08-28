module.exports = {
  extends: '@poool/eslint-config-react',
  rules: {
    'react/prop-types': 0,
    camelcase: 0,
    'prefer-promise-reject-errors': 0,
  },
  globals: {
    poool: false,
    Pay: false,
  },
};
