var path = require('path');

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
                    plugins: ['@babel/plugin-transform-runtime']
                }
            }
        }],
    }
};
