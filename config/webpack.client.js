const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const clientConfig = {
  mode: 'development',
  name: 'client',
  context: path.join(__dirname, '..', 'src'),  
  entry: './client.js',
  module: {
    rules: [
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
              outputPath: path.join(__dirname, '..', 'dist'),
              publicPath: '/'
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new WriteFilePlugin()
  ],
  output: {
    path: path.join(__dirname, '..', 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  }
};

module.exports = merge(commonConfig, clientConfig);
