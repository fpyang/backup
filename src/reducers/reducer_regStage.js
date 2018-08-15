import { SET_REG_STAGE } from '../actions';
import { REG_NEXT } from '../actions';
import { REG_LAST } from '../actions';

/*

  Phone
  Message
  Profile
  Logined
  
*/
const PhoneTitle = '電話驗證';
const MessageTitle = '簡訊認證';
const ProfileTitle = '基本資料';
const defaultStatus = {
    appStage: 'Phone',
    appStageTitle: PhoneTitle,
    hasLast: false,
    hasNext: true
  };

function getNextState(state){
    switch(state.appStage){
        case 'Phone':
            return Object.assign({}, state, {
                appStage: 'Message',
                appStageTitle: MessageTitle,
                hasLast: true,
                hasNext: false
            });
        case 'Message':
            return Object.assign({}, state, {
                appStage: 'Profile',
                appStageTitle: ProfileTitle,
                hasLast: false,
                hasNext: true
            });
        case 'Profile':
            return Object.assign({}, state, {
                appStage: 'Logined',
                appStageTitle: '',
                hasLast: false,
                hasNext: false
            });
        default: 
        return state;
    }
}

function getLastState(state){
    switch(state.appStage){
        case 'Phone':
            return state;
        case 'Message':
            return Object.assign({}, state, {
                appStage: 'Phone',
                appStageTitle: PhoneTitle,
                hasLast: false,
                hasNext: true
            });
        case 'Profile':
            return state;
        default:
            return state;
    }
}

export default function (state = defaultStatus, action) {
  if (action) {
    switch (action.type) {
      case SET_REG_STAGE:
        return action.payload;
      case REG_NEXT:
        return getNextState(state);
      case REG_LAST:
        return getLastState(state);
      default:
        return state;
    }
  }
}