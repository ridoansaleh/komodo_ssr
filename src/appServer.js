import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider } from "react-redux";
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import stats from '../build/react-loadable.json';
import App from './components/App';
import routes from './routes';
import createStore from './reducers/store';

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

    console.log("Modules : ",modules);


    let bundles = getBundles(stats, modules);
    const publicPath = process.env.DEV ? 'http://localhost:3001/' : '/'
    const styles = process.env.DEV ? '' : '<link rel="stylesheet" type="text/css" href="/main.csss"></link>'
    const vendorBundle = publicPath + 'vendor.bundle.js'
    const appBundle = publicPath + 'bundle.js'

    const indexHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <title>Komodo SSR</title>
          ${styles}
        </head>          
        <body>
          <div id="root">${AppComponent}</div>
          ${bundles.map(bundle => {
            return `<script src="${publicPath}${bundle.file}"></script>`
          }).join('\n')}
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
      res.writeHead(200, {"Content-Type": "text/html"});
      res.end(indexHTML);
    }
  });

}

export default render;