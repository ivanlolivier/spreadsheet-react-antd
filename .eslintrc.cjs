module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['unused-imports', 'react-refresh'],
  rules: {
    '@typescript-eslint/no-use-before-define': 'error',
    'no-use-before-define': 'off',
    // https://www.npmjs.com/package/eslint-plugin-unused-imports
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports-ts': 'error',
    'no-undef': 'off',
    'import/named': 'off',
    '@typescript-eslint/no-namespace': ['warn', { allowDeclarations: true }],
    'unused-imports/no-unused-vars-ts': [
      'warn',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],

    'no-restricted-exports': 'off',

    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'antd',
            importNames: ['message'],
            message: 'Please use message from @core/toast instead.',
          },
          {
            name: 'sonner',
            message: 'Please use @core/toast instead.',
          },
          {
            name: 'antd',
            importNames: ['DatePicker'],
            message:
                'Please use DatePicker or DateRangePicker from @shared-components/DatePicker or @shared-components/DateRangePicker instead.',
          },
        ],
        patterns: [
          { group: ['apps/*', 'libs/*'] },
          {
            group: ['@rematter/common', '!@rematter/common/'],
            message:
                'We want to get rid of this barrel file to make tests run faster. Please use a more specific path 🙏',
          },
        ],
      },
    ],

    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    // Forbid the use of extraneous packages
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.tsx',
          '**/*.spec.tsx',
          '**/*.spec.ts',
          '**/__test__/**/*.ts',
          '**/__test__/**/*.tsx',
          '**/*.config.js',
          '**/*.config.ts',
          '**/tools/*.js',
          '**/tools/*.ts',
          '**/tools/**/*.js',
          '**/tools/**/*.ts',
          'e2e-tests/**',
        ],
        packageDir: __dirname,
      },
    ],

    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc', caseInsensitive: true },
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: ['builtin'],
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            // citation: https://github.com/benmosher/eslint-plugin-import/issues/1239#issuecomment-662938913
            pattern: '{.,..}/**/*.+(css|sass|less|scss|graphql)',
            patternOptions: { dot: true, nocomment: true },
            group: 'unknown',
            position: 'after',
          },
        ],
      },
    ],

    'import/prefer-default-export': ['off'],

    'import/no-absolute-path': 'error',

    complexity: ['warn', { max: 30 }],

    // Recommend not to leave any console.log in your code
    // Use console.error, console.warn and console.info instead
    // https://eslint.org/docs/rules/no-console
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'info'],
      },
    ],

    // Allow only special identifiers
    // https://eslint.org/docs/rules/no-underscore-dangle
    'no-underscore-dangle': [
      'error',
      {
        allow: ['__typename'],
      },
    ],

    // Prefer destructuring from arrays and objects
    // http://eslint.org/docs/rules/prefer-destructuring
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'no-nested-ternary': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'react/no-unescaped-entities': 'off',
    'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
    eqeqeq: ['error', 'always', { null: 'ignore' }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}

