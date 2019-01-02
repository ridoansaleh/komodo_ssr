const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const commonConfig = require('../webpack.common');

const clientConfig = {
  mode: 'production',
  name: 'client',
  context: path.join(__dirname, '..', '..', 'src'),  
  entry: './appClient.js',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/'
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new WriteFilePlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '..', '..') + '/server/production.js',
        to: path.join(__dirname, '..', '..') + '/build/index.js',
        toType: 'file'
      }
    ])
  ],
  output: {
    path: path.join(__dirname, '..', '..', 'build'),
    publicPath: '/',
    filename: 'bundle.js'
  }
};

module.exports = merge(commonConfig, clientConfig);
