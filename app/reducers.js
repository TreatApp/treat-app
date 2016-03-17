import { combineReducers } from 'redux';
import Immutable from 'immutable';

import { NETWORK, AUTHENTICATION } from './actions';
import { GET_PROFILE } from './components/user/actions';

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

const rootReducer = combineReducers({
  appState,
  userState
});

export default rootReducer;