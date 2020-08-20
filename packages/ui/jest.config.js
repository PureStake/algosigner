module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    setupFilesAfterEnv: ["<rootDir>/test/setupTests.ts"],
    verbose: true,
    testURL: "http://localhost:3000",
    moduleFileExtensions: [
        "js",
        "jsx",
        "ts",
        "tsx"
    ],
    moduleDirectories: [
        "node_modules","<rootDir>/src"
    ],
    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)(spec|test).[jt]s?(x)"
    ],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/test/__mocks__/fileMock.js",
        "\\.(css|less|scss)$": "identity-obj-proxy",
        "^./style$": "identity-obj-proxy",
        "^preact$": "<rootDir>/node_modules/preact/dist/preact.min.js",
        "^react$": "preact/compat",
        "^react-dom$": "preact/compat",
        "^create-react-class$": "preact/compat/lib/create-react-class",
        "^react-addons-css-transition-group$": "preact-css-transition-group",
        "^@algosigner/common(.*)$": "<rootDir>/../common/src$1"

    },
    "roots": [
        "<rootDir>/src"
        ],
}
