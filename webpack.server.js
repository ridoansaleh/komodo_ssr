const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { publicPath, assetsPath, commonLoaders } = require('./common.config');

module.exports = {
  mode: 'development',
  name: 'SSR',
  context: path.join(__dirname, 'src'),
  entry: './server.js',  
  output: {
    path: assetsPath,
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    publicPath,
  },
  target: 'node',
  externals: nodeExternals(),  
  module: {
    rules: commonLoaders.concat([
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
    ]),
  }
};