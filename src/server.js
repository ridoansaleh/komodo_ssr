import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from 'react-router-dom';
import App from './components/App';

const render = (req, res) => {
  const context = {};
  
  const html = ReactDOMServer.renderToString(
    <StaticRouter
      context={context}
      location={req.url}
    >
      <App/>
    </StaticRouter>
  );
  
  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    });
    res.end();
  } else {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>React SSR Template</title>
        </head>          
        <body>
          <div id="root">${html}</div>
          <script src="/bundle.js"></script>
        </body>
      </html>
    `);
  }
}

export default render;