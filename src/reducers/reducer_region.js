import { SELECT_REGION } from '../actions';

const defaultStatus = {
    region: ''
  };

export default function (state = defaultStatus, action) {
  if (action) {
    switch (action.type) {
      case SELECT_REGION:
        return action.payload;
      default:
        return state;
    }
  }
}