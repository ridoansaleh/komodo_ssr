import http from 'http';
import React from 'react';
import Loadable from 'react-loadable';
import app from './development';

const server = http.createServer(app)
let currentApp = app

Loadable.preloadAll().then(() => {
    server.listen(3000, () => {
        console.info('Your app is running on http://localhost:3000');
    });
});

if (module.hot) {
    module.hot.accept('./development', () => {
        server.removeListener('request', currentApp)
        server.on('request', app)
        currentApp = app
    })
}
