const path = require('path');
const webpack = require('webpack')
const WriteFilePlugin = require('write-file-webpack-plugin');
const merge = require('webpack-merge');
const commonConfig = require('../webpack.common');

const clientConfig = {
  mode: 'development',
  name: 'client',
  devtool: 'inline-source-map',
  target: 'web',
  context: path.join(__dirname, '..', '..', 'src'),  
  entry: [
    './appClient.js',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:3001',
  ],
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
            loader: 'file-loader'
          }
        ]
      }
    ],
  },
  plugins: [
    new WriteFilePlugin(),
    new webpack.DefinePlugin({
      "process.env": {
          "DEV": JSON.stringify("true")
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    host: 'localhost',
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    port: 3001,
    hot: true
  },
  output: {
    path: path.join(__dirname, '..', '..', 'build'),
    publicPath: 'http://localhost:3001/',
    filename: 'bundle.js',
  }
};

module.exports = merge(commonConfig, clientConfig);
