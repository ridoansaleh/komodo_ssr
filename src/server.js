// import express from 'express';

// const render = require('../dist/assets/ssr');
// const app = express();

// app.get('/', render.default);

// const port = 3000;
// app.listen(port);
// console.log(`Listening on port ${port}`);

import express from 'express';
import webpack from 'webpack';
import webpackConfig from '../webpack.client';

const render = require('../dist/assets/ssr');
const app = express();

const compiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
}));

app.get('/', render.default);

const port = 3000;
app.listen(port);
console.log(`Listening on port ${port}`);