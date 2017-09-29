module.exports = {
  rootDir: '../',
  roots: ['<rootDir>/src/client'],
  verbose: true,
  moduleFileExtensions: ['js', 'jsx'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  coverageDirectory: '<rootDir>/coverage/client',
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
