const path = require('path');
const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const serverConfig = {
  mode: 'development',
  name: 'server',
  target: 'node',
  externals: nodeExternals(),
  context: path.join(__dirname, '..', 'src'),
  entry: './server.js',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'css-loader/locals?modules&localIdentName=[name]__[local]___[hash:base64:5]'
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: false
            }
          }
        ]
      } 
    ],
  },
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    publicPath: '/',
  }
};

module.exports = merge(commonConfig, serverConfig);