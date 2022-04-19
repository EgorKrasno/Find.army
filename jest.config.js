// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
    dir: './',
})

const customJestConfig = {
    moduleDirectories: ['node_modules', '<rootDir>/'],
    testEnvironment: 'jest-environment-jsdom',
}

const ignoredErrors = [
    /act(...) is not supported in production builds of React, and might not behave as expected./,
]
const consoleError = global.console.error
global.console.error = (...args) => {
    if (ignoredErrors.some((el) => el.test(args[0]))) {
        return consoleError(...args)
    }
}

module.exports = createJestConfig(customJestConfig)