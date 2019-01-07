const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const commonConfig = require('../webpack.common');
const paths = require('../paths');

const clientConfig = {
  mode: 'production',
  name: 'client',
  context: paths.context,
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
              publicPath: paths.public
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new WriteFilePlugin(),
    new ReactLoadablePlugin({
      filename: './build/react-loadable.json'
    }),
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
    ]),
    new CleanWebpackPlugin(
      ['build'],
      {
        root: paths.root,
        verbose: true 
      }
    )
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  output: {
    path: paths.build,
    publicPath: paths.public,
    filename: '[name].js',
    chunkFilename: '[name].bundle.js'
  }
};

module.exports = merge(commonConfig, clientConfig);
