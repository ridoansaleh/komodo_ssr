const express = require('express');
const render = require('../appServer');

const app = express();
app.get('*', render.default);

export default app
