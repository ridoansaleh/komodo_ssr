import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider } from "react-redux";
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

    const AppComponent = renderToString(
      <Provider store={store}>
        <StaticRouter
          context={context}
          location={req.url}
        >
          <App />
        </StaticRouter>
      </Provider>
    );

    const indexHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>React SSR Template</title>
          <link rel="stylesheet" type="text/css" href="/main.css"/>
        </head>          
        <body>
          <div id="root">${AppComponent}</div>
          <script>
            window.REDUX_DATA = ${JSON.stringify(data)}
          </script>
          <script src="/bundle.js"></script>
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