import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import Loadable from 'react-loadable';
import App from './general/components/App';
import createStore from './reducers/store';

const store = createStore(window.REDUX_DATA);

const render = Component => (
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(
      <Provider store={store}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>,
      document.getElementById('root')
    )
  })
)

render(App)
