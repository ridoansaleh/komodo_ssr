// const webpack = require('webpack');
const path = require('path');
import WriteFilePlugin from 'write-file-webpack-plugin';
const { publicPath, assetsPath, commonLoaders } = require('./common.config');

module.exports = {
  mode: 'development',
  devtool: 'eval',
  name: 'client',
  context: path.join(__dirname, 'src'),  
  entry: './client.js',
  output: {
    path: assetsPath,
    publicPath,
    filename: 'bundle.js',
  },
  module: {
    rules: commonLoaders.concat([
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: assetsPath,
              publicPath
            }
          }
        ]
      }
    ]),
  },
  plugins: [
    new WriteFilePlugin()
  ]
};