import { combineReducers } from 'redux';
import Immutable from 'immutable';

import { NETWORK, AUTHENTICATION } from './actions';
import { GET_PROFILE } from './components/user/actions';
import { GET_EVENTS } from './components/guest/actions';
import { GET_USER_EVENTS } from './components/host/actions';

function appState(state = Immutable.Map({
  networkProgress: false,
  networkFailed: false,
  authenticated: false,
  showNavigation: true
}), action = null) {
  switch (action.type) {
    case NETWORK:
    case AUTHENTICATION:
      return state.merge(action.state);

    default:
      return state;
  }
}

function userState(state = Immutable.Map({
  profile: {}
}), action = null) {
  switch (action.type) {
    case GET_PROFILE:
      return state.merge(action.state);

    default:
      return state;
  }
}

function eventsState(state = Immutable.Map({
  events: []
}), action = null) {
  switch (action.type) {
    case GET_EVENTS:
      return state.merge(action.state);

    default:
      return state;
  }
}

function userEventsState(state = Immutable.Map({
  events: []
}), action = null) {
  switch (action.type) {
    case GET_USER_EVENTS:
      return state.merge(action.state);

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  appState,
  userState,
  eventsState,
  userEventsState
});

export default rootReducer;