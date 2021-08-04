module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    // 他のルールの下に追加
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2021,
  },
  optimizeDeps: {
    include: ['@ant-design/icons-vue'],
  },

  plugins: [],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/prefer-namespace-keyword': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'no-case-declarations': 'off',
    'no-inner-declarations': 'off',
    'no-fallthrough': 'off',
    'no-prototype-builtins': 'off',
    'no-unused-vars': 'off',
    'no-extra-semi': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'vue/no-async-in-computed-properties': 'off',
    // indent: [2, 2],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false,
      },
    ],
  },
}
