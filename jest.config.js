module.exports = {
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest'
  },
  moduleNameMapper: {
    '\\.(css|jpg|png|svg)$': '<rootDir>/tests/utils/empty-module.js',
    '^~/(.*?)$': '<rootDir>/src/$1'
  },
  // collectCoverage: true,
  // collectCoverageFrom: [
  //   '**src/**/*.{js}',
  //   '!**/node_modules/**',
  //   '**/tests/*.{js}',
  //   '!**/tests/*.{spec}.{js}'
  // ],
  // coverageReporters: ['text'],
  testMatch: [
    '<rootDir>/(mocks/*.spec.(js|jsx|ts|tsx)|tests/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))'
  ]
}
