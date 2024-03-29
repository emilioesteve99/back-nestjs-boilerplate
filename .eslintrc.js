module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/typescript',
    'plugin:import/warnings',
  ],
  overrides: [
    {
      extends: [],
      files: ['**/*.spec.ts'],
      rules: {
        '@typescript-eslint/no-magic-numbers': 'off',
        '@typescript-eslint/unbound-method': 'off',
        'jest/valid-title': 'off',
        'no-restricted-syntax': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2019,
    project: ['./tsconfig.build.json'],
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import'],
  root: true,
  rules: {
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        overrides: {
          accessors: 'explicit',
          constructors: 'explicit',
          methods: 'explicit',
          properties: 'off',
          parameterProperties: 'off',
        },
      },
    ],
    '@typescript-eslint/no-array-constructor': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-optional-chain': 'warn',
    '@typescript-eslint/prefer-readonly': 'error',
    '@typescript-eslint/promise-function-async': 'error',
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/restrict-plus-operands': [
      'error',
      {
        skipCompoundAssignments: false,
      },
    ],
    '@typescript-eslint/strict-boolean-expressions': 'error',
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    '@typescript-eslint/typedef': [
      'error',
      {
        arrayDestructuring: false,
        arrowParameter: true,
        memberVariableDeclaration: true,
        objectDestructuring: true,
        parameter: true,
        propertyDeclaration: true,
        variableDeclaration: true,
      },
    ],
    '@typescript-eslint/unified-signatures': 'error',
    'array-callback-return': 'error',
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
        imports: 'always-multiline',
        objects: 'always-multiline',
      },
    ],
    complexity: ['error', 12],
    'consistent-return': 'error',
    curly: 'error',
    'default-param-last': 'error',
    'dot-notation': 'error',
    'eol-last': 'error',
    eqeqeq: [
      'error',
      'always',
      {
        null: 'ignore',
      },
    ],
    'import/no-unresolved': [
      'error',
      {
        ignore: ['^firebase-adminUser/.+', '^csv-parse/.+'],
      },
    ],
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        groups: ['builtin', 'external'],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: '@jest/globals',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'jest-mock',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['@jest/globals', 'jest-mock'],
      },
    ],
    indent: 'off',
    'no-alert': 'error',
    'no-caller': 'error',
    'no-console': 'error',
    'no-eval': 'error',
    'no-extra-label': 'error',
    'no-floating-decimal': 'error',
    'no-implied-eval': 'error',
    'no-import-assign': 'error',
    'no-invalid-this': 'error',
    'no-iterator': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-new-func': 'error',
    'no-new-wrappers': 'error',
    'no-octal-escape': 'error',
    'no-proto': 'error',
    'no-restricted-syntax': [
      'error',
      {
        selector:
          'ClassBody > PropertyDefinition[optional=true] > TSTypeAnnotation > TSUnionType:has(TSUndefinedKeyword)',
        message: "We don't want to use undefined in optional properties",
      },
      {
        selector: "ReturnStatement[argument.type='ObjectExpression']",
        message:
          "We don't want to use ObjectLiteralExpression e.g. {a: 'a', b: 'b'} in return statements directly. Assign ObjectLiteralExpression first to variable and then return.",
      },
    ],
    'no-return-assign': 'error',
    'no-return-await': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-shadow': 'off',
    'no-throw-literal': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unused-expressions': 'error',
    'no-useless-concat': 'error',
    'no-useless-return': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: 'block-like',
        next: '*',
      },
    ],
    'prefer-arrow-callback': 'error',
    'prefer-promise-reject-errors': 'error',
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
      },
    ],
    semi: 'error',
    'sort-keys': [
      'error',
      'asc',
      {
        caseSensitive: false,
        natural: true,
      },
    ],
    'sort-vars': 'error',
  },
};
