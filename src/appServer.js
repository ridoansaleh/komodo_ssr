import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider } from "react-redux";
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import stats from '../build/react-loadable.json';
import App from './general/components/App';
import routes from './routes';
import createStore from './reducers/store';
import paths from '../config/paths';

const render = (req, res) => {
  const context = {};
  const promises = [];
  const store = createStore();

  routes.some(route => {
    const match = matchPath(req.path, route);
    if (match && route.loadData) {
      const getData = store.dispatch(route.loadData());
      promises.push(getData);
    }
    return match;
  });

  Promise.all(promises).then(resp => {
    const data = store.getState();
    const dev = process.env.NODE_ENV === 'development';
    let modules = [];

    const AppComponent = renderToString(
      <Provider store={store}>
        <StaticRouter
          context={context}
          location={req.url}
        >
          <Loadable.Capture report={moduleName => modules.push(moduleName)}>
            <App />
          </Loadable.Capture>
        </StaticRouter>
      </Provider>
    );

    const bundles = getBundles(stats, modules);
    const vendorBundle = paths.public + 'vendor.bundle.js';
    const appBundle = paths.public + 'main.js';
    const styles = bundles.filter(bundle => bundle.file.endsWith('.css'));
    const appStyle = !dev ? styles.map(style => `<link href=${style.file} rel="stylesheet"/>`).join('\n') : '';
    const scripts = bundles.filter(bundle => bundle.file.endsWith('.js'));

    const indexHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <title>Komodo SSR</title>
          ${appStyle}
        </head>          
        <body>
          <div id="root">${AppComponent}</div>
          ${
            scripts.map(script => {
              return `<script src="${paths.public}${script.file}"></script>`
            }).join('\n')
          }
          <script src=${vendorBundle}></script>
          <script src=${appBundle}></script>
          <script> window.REDUX_DATA = ${JSON.stringify(data)} </script>
        </body>
      </html>
    `;

    if (context.url) {
      res.writeHead(301, {
        Location: context.url
      });
      res.end();
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(indexHTML);
    }
  });

}

export default render;
