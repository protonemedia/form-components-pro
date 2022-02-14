module.exports = {
    preset: 'ts-jest',
    transformIgnorePatterns: [
        '/node_modules/(?!lib-to-transform|lodash-es|@protonemedia)'
    ],
    globals: {},
    testEnvironment: 'jsdom',
    transform: {
        "^.+\\.vue$": "@vue/vue3-jest",
        "^.+\\js$": "babel-jest"
    },
    moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js']
}