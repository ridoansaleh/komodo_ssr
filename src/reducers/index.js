import { combineReducers } from 'redux';
import { peopleReducer } from './people';

const reducers = combineReducers({
  people: peopleReducer
});

export default reducers
