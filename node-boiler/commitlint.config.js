export default {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'chore', 'test']],
      'subject-case': [2, 'never', ['sentence-case']],
    },
  };
  