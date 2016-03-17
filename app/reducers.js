import { combineReducers } from 'redux';
import Immutable from 'immutable';

import { NETWORK_PROGRESS, NETWORK_FAILED } from './actions';

function appState(state = Immutable.Map({
  networkProgress: false,
  networkFailed: false
}), action = null) {
  switch (action.type) {
    case NETWORK_PROGRESS:
    case NETWORK_FAILED:
      return state.merge(action.state);

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  appState
});

export default rootReducer;