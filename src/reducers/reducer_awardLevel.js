import { SELECT_AWARDLEVEL } from '../actions';

const defaultStatus = {
    awardLevel: '1'
  };

export default function (state = defaultStatus, action) {
  if (action) {
    switch (action.type) {
      case SELECT_AWARDLEVEL:
        return action.payload;
      default:
        return state;
    }
  }
}