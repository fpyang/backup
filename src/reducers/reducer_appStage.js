import { SET_APP_STAGE } from '../actions';

/*

  OnBoarding
  Registering
  Login
  
*/
const defaultStatus = {
    appStage: 'Login'//'OnBoarding'
  };

export default function (state = defaultStatus, action) {
  if (action) {
    switch (action.type) {
      case SET_APP_STAGE:
        return action.payload;
      default:
        return state;
    }
  }
}