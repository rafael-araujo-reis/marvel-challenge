const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './'
});

const customJestConfig = {
  testPathIgnorePatterns: ["/node_modules", "./next"],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '@components/(.*)$': '<rootDir>/components/$1',
    '@pages/(.*)$': '<rootDir>/pages/$1'
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
  },
  testEnvironment: 'jest-environment-jsdom'
};

module.exports = createJestConfig(customJestConfig);