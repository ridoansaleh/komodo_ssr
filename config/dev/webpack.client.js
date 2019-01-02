const webpack = require('webpack')
const WriteFilePlugin = require('write-file-webpack-plugin');
const merge = require('webpack-merge');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const commonConfig = require('../webpack.common');
const paths = require('../paths');

const clientConfig = {
  mode: 'development',
  name: 'client',
  devtool: 'inline-source-map',
  target: 'web',
  context: paths.context,  
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
    ]
  },
  plugins: [
    new WriteFilePlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
          "DEV": JSON.stringify("true")
      }
    }),
    new ReactLoadablePlugin({
      filename: './build/react-loadable.json'
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "initial",
        },
      },
    },
  },
  devServer: {
    host: 'localhost',
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    port: 3001,
    hot: true
  },
  output: {
    path: paths.build,
    publicPath: paths.public,
    filename: 'bundle.js',
  }
};

module.exports = merge(commonConfig, clientConfig);
