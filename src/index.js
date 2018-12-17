import express from 'express';
import webpack from 'webpack';
import webpackConfig from '../config/webpack.client';

const PORT = 3000;
const render = require('../dist/server');

const app = express();

const compiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
}));

app.get('/', render.default);

app.listen(PORT, () => {
  console.log(`Your app is running on http://localhost:${PORT}`);
});