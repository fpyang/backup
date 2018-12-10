import { combineReducers } from 'redux';
import firebase from 'react-native-firebase';
import AwardLevel from './reducer_awardLevel';
import Region from './reducer_region';
import Stage from './reducer_stage';
import WritingContext from './reducer_writingContext';
import LevelUpHamburger from './reducer_levelUpHamburger';
import AppStage from './reducer_appStage';
import RegStage from './reducer_regStage';
import FunwordState from './reducer_funwordState';
import SignIn from './reducer_login';
import Onboarding from './reducer_onboarding';
import Articles from './reducer_articles';

const appReducer = combineReducers({
    awardLevel: AwardLevel,
    region: Region,
    stage: Stage,
    writingContext: WritingContext,
    levelUpHamburgerOpen: LevelUpHamburger,
    appStage: AppStage,
    regStage: RegStage,
    funwordState: FunwordState,
    signIn: SignIn,
    onboarding: Onboarding,
    articles: Articles
});


const rootReducer = (state, action) => {
    if (action.type === 'SIGN_OUT') {
      state = undefined;
      firebase.auth().signOut();
    }
  
    return appReducer(state, action)
  }
  
  export default rootReducer;