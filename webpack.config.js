const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './app/src/index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Key Lock',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 1_024_000,
    maxAssetSize: 1_024_000,
  },
};
