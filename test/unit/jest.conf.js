const path = require(`path`)

module.exports = {
  rootDir: path.resolve(__dirname, `../../`),
  moduleFileExtensions: [
    `js`,
    `json`,
    `vue`,
  ],
  moduleNameMapper: {
    '^@/(.*)$': `<rootDir>/src/$1`,
  },
  transform: {
    '^.+\\.js$': `<rootDir>/node_modules/babel-jest`,
    '.*\\.(vue)$': `<rootDir>/node_modules/vue-jest`,
  },
  testPathIgnorePatterns: [
    `<rootDir>/test/e2e`,
  ],
  setupFiles: [`<rootDir>/test/unit/setup`],
  coverageDirectory: `<rootDir>/test/unit/coverage`,
  collectCoverageFrom: [
    `src/**/*.{js,vue}`,
    `!src/main.js`,
    `!src/router.js`,
    `!**/node_modules/**`,
  ],
}
