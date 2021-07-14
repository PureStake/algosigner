var path = require('path');

function srcPath(subdir) {
  return path.join(__dirname, './', subdir);
}

module.exports = {
  mode: 'production',
  entry: {
    extensionStorage: './src/extensionStorage.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    globalObject: 'this',
  },
  resolve: {
    alias: {
      '@storage': srcPath('~/'),
      '@algosigner/common': srcPath('../common/src'),
    },
    extensions: ['.ts', '.tsx', '.js'],
  },
  //devtool: 'source-map',
  optimization: {
    minimize: false,
    moduleIds: 'named',
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
