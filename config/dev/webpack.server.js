const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const StartServerPlugin = require('start-server-webpack-plugin');
const commonConfig = require('../webpack.common');
const paths = require('../paths');

const serverConfig = {
  mode: 'development',
  name: 'server',
  target: 'node',
  watch: true,
  devtool: 'inline-source-map',
  externals: nodeExternals({
    whitelist: ['webpack/hot/poll?1000']
  }),
  context: paths.context,
  entry: [
    'webpack/hot/poll?1000',
    '../server'
  ],
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
    ]
  },
  plugins: [
    new StartServerPlugin('server.js'),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    path: paths.build,
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    publicPath: paths.public
  }
};

module.exports = merge(commonConfig, serverConfig);
