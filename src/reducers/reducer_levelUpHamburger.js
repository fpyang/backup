import { SET_LEVELUP_HAMBURGER_STATE } from '../actions';

const defaultStatus = {
    open: false
  };

export default function (state = defaultStatus, action) {
  if (action) {
    switch (action.type) {
      case SET_LEVELUP_HAMBURGER_STATE:
        return action.payload;
      default:
        return state;
    }
  }
}