var path = require('path');

function srcPath(subdir) {
    return path.join(__dirname, "./", subdir);
}

module.exports = {
    // Change to your "entry-point".
    mode: 'production',
    optimization: {
		// We no not want to minimize our code.
		minimize: false
	},
    entry: {
        background: './background/background.ts',
        content: './content/content.ts'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
    },
    resolve: {
        alias: {
            "@algosigner/common": srcPath('../extension-common')
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
