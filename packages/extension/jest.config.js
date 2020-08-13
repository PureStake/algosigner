module.exports = {
    verbose: true,
    moduleNameMapper: {
      "^@algosigner/common(.*)$": "<rootDir>/../common/src$1",
      "^@algosigner/crypto(.*)$": "<rootDir>/../crypto/$1",
      "^@algosdk$": "<rootDir>/node_modules/algosdk"
    },
    setupFiles: [
      "jest-webextension-mock"
    ],
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest"
    }
}