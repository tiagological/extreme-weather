import { combineReducers } from 'redux';
import getCitiesReducer from './getCitiesReducer';
import updateUserInputReducer from './updateUserInputReducer';

export default combineReducers({
  citiesData: getCitiesReducer,
  userInput: updateUserInputReducer
});
