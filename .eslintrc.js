// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: `babel-eslint`,
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue
    `plugin:vue/recommended`,
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    `standard`,
  ],
  plugins: [
    `vue`,
  ],
  rules: {
    'generator-star-spacing': `off`,
    'no-debugger': process.env.NODE_ENV === `production` ? `error` : `off`,
    'quotes': [`error`, `backtick`],
    'object-curly-spacing': [`error`, `always`],
    'comma-dangle': [`error`, `always-multiline`],
    'vue/script-indent': [`error`, 2, { baseIndent: 1 }],
  },
  overrides: [
    {
      files: [`*.vue`],
      rules: {
        indent: `off`,
      },
    },
  ],
}
