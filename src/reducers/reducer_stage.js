import { SELECT_STAGE } from '../actions';

const defaultStatus = {
    tryoutOrFinal: 'tryout',
    statusName: '初賽',
    statusButton: 'final'
  };

export default function (state = defaultStatus, action) {
  if (action) {
    switch (action.type) {
      case SELECT_STAGE:
        return action.payload;
      default:
        return state;
    }
  }
}