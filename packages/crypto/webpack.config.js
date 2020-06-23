var path = require('path');

function srcPath(subdir) {
    return path.join(__dirname, "./", subdir);
}

module.exports = {
    mode: 'production',
    entry: {
        secureStorageContext: './src/secureStorageContext.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: "umd",
        library: 'secureStorageContext',
        umdNamedDefine: true,
        globalObject: 'this'
    },
    resolve: {
        alias: { "@crypto": srcPath('~/') },
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
