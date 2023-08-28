const path = require('path');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist/js'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/fonts/',
          },
        },
        include: path.resolve(__dirname, 'src/assets/fonts'),
        exclude: /node_modules/,
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
    new Dotenv({
      path: path.resolve(__dirname, '.env'),
      systemvars: true, 
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/template.html', 
      title: 'Quarian.news',
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/style.css',
    })
  ],
};