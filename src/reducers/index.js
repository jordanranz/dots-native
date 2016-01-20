/* @flow */

import events from './events';

import { combineReducers } from "redux";

// const data = (state = {
//   isFetching: false,
//   message: ""
// }, action) => {
//   switch (action.type) {
//   case types.REQUEST_DATA:
//     return Object.assign({}, state, {
//       isFetching: true
//     });
//   case types.RECEIVE_DATA:
//     return Object.assign({}, state, {
//       isFetching: false,
//       message: action.data.message,
//       meow: action.data.meow
//     });
//   default:
//     return state;
//   }
// };

const rootReducer = combineReducers({
  //data,
  events
});

export default rootReducer;
