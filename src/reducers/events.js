'use strict';

import {
  GET_EVENTS_REQUEST,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAILURE,
} from '../lib/constants';

export default function events(state = {
  isFetching: true,
  events: []
}, action) {
  switch(action.type) {
    case GET_EVENTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case GET_EVENTS_SUCCESS:
      return Object.assign({}, state, {
          isFetching: false,
          events: action.payload,
      });
    case GET_EVENTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });

    default:
      return state;
  }
}