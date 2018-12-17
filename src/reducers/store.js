import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './index';

const makeStore = (initialState) => {
    return createStore(
        reducers,
        initialState,
        applyMiddleware(thunkMiddleware)
    );
}

export default makeStore
