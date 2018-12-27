import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { AppContainer } from "react-hot-loader";
import App from './components/App';
import createStore from './reducers/store';

const store = createStore(window.REDUX_DATA);

const render = Component => (
    ReactDOM.hydrate(
        <Provider store={store}>
            <BrowserRouter>
                <AppContainer>
                    <Component />
                </AppContainer>
            </BrowserRouter>
        </Provider>,
        document.getElementById('root')
    )
)

render(App)

if (module.hot) {
    module.hot.accept("./components/App", () => {
        render(App);
    });
}
