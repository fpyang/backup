import { ONBOARDING } from '../actions';

/*

  true for onboarding
  
*/
const defaultStatus = {
    status: true
  };

export default function (state = defaultStatus, action) {
  if (action) {
    switch (action.type) {
      case ONBOARDING:
        return action.payload;
      default:
        return state;
    }
  }
}