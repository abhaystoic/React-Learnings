// var webpack = require('webpack');
var path = require('path');
var ManifestPlugin = require('webpack-manifest-plugin');

var DIST_DIR = path.resolve(__dirname, 'dist');
var SRC_DIR = path.resolve(__dirname, 'src');
var PUBLIC_DIR = path.resolve(__dirname, 'public');


var config = {
  entry: SRC_DIR + '/index.js',
  output: {
    path: DIST_DIR + '/app',
    filename: 'bundle.js',
    publicPath: '/app/',
  },
  devServer: {
    contentBase: "./public",
    hot: true
  },
  plugins: [new ManifestPlugin()],
  module: {
    rules: [
      {
        test: /\.js?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/react', '@babel/preset-env'],
          plugins: ['@babel/proposal-class-properties']
        }
      },
      {
        test: /\.css$/,
        include: SRC_DIR,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.scss$/,
          /\.json$/,
          /\.ejs$/,
        ],
        test: /\.(png|svg|jpg|gif|ico)$/,
        include: SRC_DIR + '/images/',
        use: [
          'file-loader',
        ]
      }
    ],
  }
};

module.exports = config;