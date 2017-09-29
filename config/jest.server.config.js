module.exports = {
  rootDir: '../',
  roots: ['<rootDir>/src/server'],
  testEnvironment: 'node',
  verbose: true,
  moduleFileExtensions: ['node', 'json', 'js', 'jsx'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  coverageDirectory: '<rootDir>/coverage/server',
  coverageReporters: ['json', 'html', 'text', 'text-summary'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  }
}
