const resolve = require('path').resolve;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackDevServer = require('./webpack-dev')
const webpack = require('webpack');

module.exports = {
  entry: [
    './js/index.js',
  ],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/speakincolor/',
  },
  context: resolve(__dirname, 'src'),
  devtool: 'eval',
  bail: false,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
               presets: ['es2015', 'react']
           }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              localIdentName: '[name].[ext]',
            },
          },
        }),
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
        }],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader?hash=sha512&digest=hex&name=[name].[ext]',
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader?hash=sha512&digest=hex&name=[name].[ext]',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.ejs',
      baseUrl: '/speakincolor/',
      inject: false,
    }),
    new CopyWebpackPlugin([{
      from: './*.*',
      to: resolve(__dirname, 'dist'),
      ignore: ['*.ejs'],
    }]),
    new ExtractTextPlugin('styles.css'),
    new webpack.NamedModulesPlugin(),
  ],
  devServer: {
    historyApiFallback: {
      index: '/speakincolor/index.html',
    },
    compress: true,
    port: 8000,
    https: true,
    public: 'localhost:8000',
    contentBase: './dist',
    publicPath: '/speakincolor/',
  },
};
