const { publicPath, assetsPath, commonLoaders } = require('./common.config');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  name: 'SSR',
  context: path.join(__dirname, 'src'),
  entry: './ssr.js',  
  output: {
    path: assetsPath,
    filename: 'ssr.js',
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
      }      
    ]),
  },
};