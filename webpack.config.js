const path = require('path');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    port: 9000,
    static: {
      directory: path.resolve(__dirname, './'),
    },
    devMiddleware: {
      index: "index.html",
      writeToDisk: true,
    },
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin()
  ],
};