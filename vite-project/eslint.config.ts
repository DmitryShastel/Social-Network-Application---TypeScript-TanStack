import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
      ignores: ['dist', 'node_modules'],
    },
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      extends: [
        js.configs.recommended,
        ...tseslint.configs.recommended,
      ],
      languageOptions: {
        ecmaVersion: 2020,
        globals: {
          ...globals.browser,
          ...globals.es2020,
        },
        parserOptions: {
          ecmaVersion: 'latest',
          ecmaFeatures: {jsx: true},
          sourceType: 'module',
        },
      },
      plugins: {
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
      },
      rules: {
        ...reactHooks.configs.recommended.rules,
        ...reactRefresh.configs.vite.rules,
        '@emotion/pkg-renaming': 'error',
        '@emotion/syntax-preference': ['error', 'object'],
        '@emotion/no-vanilla': 'error',
        '@emotion/import-from-emotion': 'error',
        '@emotion/styled-import': 'error',

        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            varsIgnorePattern: '^[A-Z_]',
            argsIgnorePattern: '^_',
          },
        ],
      },
    },
);