var path = require('path');

function srcPath(subdir) {
  return path.join(__dirname, './', subdir);
}

module.exports = {
  // Change to your "entry-point".
  mode: 'production',
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'AlgoSigner.min.js',
    libraryTarget: 'umd',
  },
  resolve: {
    alias: {
      '@algosigner/common': srcPath('../common/src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  optimization: {
    minimize: false,
    namedModules: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {},
          },
        ],
      },
    ],
  },
};
