var path = require('path');

function srcPath(subdir) {
    return path.join(__dirname, "./", subdir);
}

module.exports = {
    mode: 'production',
    entry: {
        extensionStorage: './src/extensionStorage.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: "umd",
        library: 'extensionStorage',
        umdNamedDefine: true,
        globalObject: 'this'
    },
    resolve: {
        alias: { "@storage": srcPath('~/') },
        extensions: ['.ts', '.tsx', '.js']
    },
    //devtool: 'source-map',
    optimization: {
        minimize: false,
        namedModules: true
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {}
                    }
                ]
            }
        ]
    }
};
