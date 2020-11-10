const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function srcPath(subdir) {
  return path.join(__dirname, './', subdir);
}

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: require.resolve('sass-loader'),
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // Generate a base html file and injects all generated css and js files
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      'react': 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
      '@algosigner/common': path.resolve(__dirname, '../common/src'),
    },
    modules: [path.resolve('./src'), path.resolve('./node_modules')],
  },
  devServer: {
    contentBase: './dist',
    port: 3000,
  },
};
