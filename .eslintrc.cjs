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
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { args: 'none' }],
    'quotes': ['error', 'single', { allowTemplateLiterals: true }],
    // 'quote-props': ['error', 'as-needed'],
    'jsx-quotes': ['error', 'prefer-single'],
    'no-unused-vars': ['warn', { args: 'none' }],
    'vue/multi-word-component-names': 'off',
    'prefer-const': 'off',
    // 'max-len': ['error', { code: 80 }],
    'semi': ['warn', 'always'],
    'prefer-rest-params': 'off'
  },
  globals: {
    // 公用方法和组件
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
    $ENTRY: 'readonly',
    // ts类型
    ObjectAny: 'readonly'
  }
};
