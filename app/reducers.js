import { combineReducers } from 'redux';
import Immutable from 'immutable';

import { NETWORK, AUTHENTICATION } from './actions';
import { GET_PROFILE } from './components/user/actions';
import { GET_EVENTS } from './components/guest/actions';
import { GET_EVENT_LOGS, GET_EVENT_REQUESTS, ADD_EVENT_LOG, ADD_EVENT_REQUEST, UPDATE_EVENT_REQUEST } from './components/event/actions';
import { GET_CATEGORIES, UPLOAD_IMAGE, UPLOAD_PROGRESS, GET_USER_EVENTS } from './components/host/actions';

function appState(state = Immutable.Map({
  networkProgress: false,
  networkFailed: false,
  authenticated: false
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

function eventState(state = Immutable.Map({
  eventLogs: [],
  eventRequests: []
}), action = null) {
  switch (action.type) {
    case GET_EVENT_LOGS:
    case GET_EVENT_REQUESTS:
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

function createEventState(state = Immutable.Map({
  categories: [],
  progress: 0,
  images: []
}), action = null) {
  switch (action.type) {
    case UPLOAD_IMAGE:
      let { images } = state.toJS();
      images.push(action.state.image);
      return state.merge({ progress: 0, images: images });

    case GET_CATEGORIES:
    case UPLOAD_PROGRESS:
      return state.merge(action.state);

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  appState,
  userState,
  eventState,
  eventsState,
  userEventsState,
  createEventState
});

export default rootReducer;