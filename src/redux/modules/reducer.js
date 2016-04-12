import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import word from './word';

export default combineReducers({
  auth,
  word,
  // Add the reducer to store on the `routing` key
  routing: routerReducer
});
