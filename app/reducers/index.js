import { combineReducers } from 'redux';
import * as recipesReducer from './recipes';

//export default combineReducers(Object.assign(recipesReducer));

export default rootReducer = (state, action) => {
    //state = undefined
    return appReducer(state, action)
  }

const appReducer = combineReducers(Object.assign(recipesReducer))
  