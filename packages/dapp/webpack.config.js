var path = require('path');

function srcPath(subdir) {
    return path.join(__dirname, "./", subdir);
}

module.exports = {
    // Change to your "entry-point".
    mode: 'production',
    entry: './src/index',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'AlgoSigner.min.js',
        libraryTarget: "umd"
    },
    resolve: {
        alias: {
            "@algosigner/common": srcPath('~/packages/common/src')
        },
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [{
            // Include ts, tsx, js, and jsx files.
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    presets: ['@babel/preset-typescript'],
                    plugins: ['@babel/plugin-transform-runtime']
                }
            }
        }],
    }
};