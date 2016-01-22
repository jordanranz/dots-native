'use strict';

import {
  GET_EVENTS_REQUEST,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAILURE,
} from '../lib/constants';

const DotsExpress = require('../lib/DotsExpress').default;

/**
 * ## retreiving events actions
 */
export function getEventsRequest() {
  return {
    type: GET_EVENTS_REQUEST
  };
}
export function getEventsSuccess(json) {
  return {
    type: GET_EVENTS_SUCCESS,
    payload: json
  };
}
export function getEventsFailure(json) {
  return {
    type: GET_EVENTS_FAILURE,
    payload: json
  };
}

export function getTodayEvents() {
  return dispatch => {
    dispatch(getEventsRequest());
      //store or get a sessionToken
      return new DotsExpress().getTodayEvents()
        .then((json) => {
          dispatch(getEventsSuccess(json));
        })
        .catch((error) => {
          dispatch(getEventsFailure(error));
        });
    }
}

export function getUpcomingEvents() {
  return dispatch => {
    dispatch(getEventsRequest());
      //store or get a sessionToken
      return new DotsExpress().getUpcomingEvents()
        .then((json) => {
          dispatch(getEventsSuccess(json));
        })
        .catch((error) => {
          dispatch(getEventsFailure(error));
        });
    }
}
