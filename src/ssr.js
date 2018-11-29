import React from 'react';
import { renderToString } from 'react-dom/server';
import template from './template';
import App from './App';

export default function render(req, res) {
  const appString = renderToString(<App />);
  res.send(template({
    body: appString,
    title: 'FROM THE SERVER',
  }));
}