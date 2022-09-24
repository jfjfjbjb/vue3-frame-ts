/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript'
    // '@vue/eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'quotes': ['error', 'single'],
    // 'quote-props': ['error', 'as-needed'],
    'jsx-quotes': ['error', 'prefer-single'],
    'no-unused-vars': ['error', { args: 'none' }],
    'vue/multi-word-component-names': 0,
    'prefer-const': 0,
    'max-len': ['error', { code: 80 }],
    'semi': ['error', 'always']
  },
  globals: {
    require: 'writable',
    defineOptions: 'readonly',
    _: 'readonly',
    $config: 'readonly',
    $bus: 'readonly',
    $loading: 'readonly',
    $common: 'readonly',
    $message: 'readonly',
    $notification: 'readonly',
    $ROOT: 'readonly',
    $ENTRY: 'readonly'
  }
};
