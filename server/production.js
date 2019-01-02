const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;
const render = require('./server');

const app = express();

app.use('/', express.static(path.join(__dirname)));

app.get('*', render.default);

app.listen(PORT, () => {
  console.log(`Your app is running on http://localhost:${PORT}`);
});
