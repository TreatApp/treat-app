import { combineReducers } from 'redux';
import Immutable from 'immutable';

import { NETWORK, AUTHENTICATION } from './actions';

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

const rootReducer = combineReducers({
  appState
});

export default rootReducer;