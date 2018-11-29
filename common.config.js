const path = require('path');

module.exports = {
  publicPath: '/assets/',
  assetsPath: path.join(__dirname, 'dist', 'assets'),
  commonLoaders: [
    {
      test: /\.js$/,
      use: 'babel-loader',
      include: path.join(__dirname, 'src'),
      exclude: path.join(__dirname, 'node_modules'),
    },
  ],
};