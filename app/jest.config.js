module.exports = {
  coverageDirectory: './coverage',
  collectCoverageFrom: ['src/**/*.ts', 'src/**/*.tsx'],
  testEnvironment: 'node',
  modulePaths: ['<rootDir>/src', 'node_modules'],
  roots: ['src', 'test'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx)$',
  coverageReporters: ['json', 'lcov', 'text'],
  coveragePathIgnorePatterns: ['.*/src/.*\\.d\\.ts', '.*/src/.*\\.module\\.ts', '.*/src/migration/.*\\.ts', '.*/src/main.ts', '.*/src/utils/entity-manager-wrapper.service.ts', '.*/src/subscribers/.*\\.ts', '.*/src/providers/SNSProvider.ts'],
  testResultsProcessor: 'jest-sonar-reporter'

  // // Use the below to set coverate goals
  // coverageThreshold: {
  //   global: {
  //     statements: 80,
  //     branches: 80,
  //     functions: 80,
  //     lines: 80
  //   }
  // }
};