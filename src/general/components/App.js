import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot, setConfig } from 'react-hot-loader';
import routes from '../../routes';

setConfig({ logLevel: 'debug' })

const App = () => (
  <Switch>
    {
      routes.map(route => 
        <Route
          key={route.path}
          { ...route }
        />
      )
    }
  </Switch>
);

export default hot(module)(App)
