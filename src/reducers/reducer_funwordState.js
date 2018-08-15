import { FUNWORD_STATE } from '../actions';

/*
There are four sub-page states as below:
  - Intro
  - Submit
  - Vote
  - Award
*/
const defaultStatus = {
    funwordState: 'Intro'
  };

export default function (state = defaultStatus, action) {
  if (action) {
    switch (action.type) {
      case FUNWORD_STATE:
        return action.payload;
      default:
        return state;
    }
  }
}