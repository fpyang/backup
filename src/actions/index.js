export const SELECT_AWARDLEVEL = 'SELECT_AWARDLEVEL';
export const SELECT_GRADE = 'SELECT_GRADE';
export const SELECT_REGION = 'SELECT_REGION';
export const SELECT_STAGE = 'SELECT_STAGE';
export const SET_WRITING_CONTEXT = 'SET_WRITING_CONTEXT';
export const SET_LEVELUP_HAMBURGER_STATE = 'SET_LEVELUP_HAMBURGER_STATE';
export const LEVELUP_HAMBURGER = 'LEVELUP_HAMBURGER';
export const SET_APP_STAGE = 'SET_APP_STAGE';
export const SET_REG_STAGE = 'SET_REG_STAGE';
export const REG_NEXT = 'REG_NEXT';
export const REG_LAST = 'REG_LAST';
export const FUNWORD_STATE = 'FUNWORD_STATE';
export const SIGN_IN = 'SIGN_IN';
export const USER_PROFILE = 'USER_PROFILE';



//SIGN_IN
export function saveCurrentProfile(user){
  return{
    type: USER_PROFILE,
    payload: {
      user
    }
  }
}

//SIGN_IN
export function signIn(user){
  return{
    type: SIGN_IN,
    payload: {
      user
    }
  }
}

//SIGN_OUT
export function signOut(){
  return{
    type: 'SIGN_OUT',
    payload: {
    }
  }
}

export function setFunwordState(funwordState){
  /*
    There are four sub-page states as below:
    - Intro
    - Submit
    - Vote
    - Award
  */
  return{
    type: FUNWORD_STATE,
    payload: {
      funwordState
    }
  }
}

export function setAppStage(appStage){

  return{
    type: SET_APP_STAGE,
    payload: {
      appStage
    }
  }
}

export function setRegStage(regStage){

  return{
    type: SET_REG_STAGE,
    payload: {
      regStage
    }
  }
}

export function regNext(){

  return{
    type: REG_NEXT,
    payload: {
      
    }
  }
}

export function regLast(){

  return{
    type: REG_LAST,
    payload: {
      
    }
  }
}

export function selectLevel(awardLevel){

    return{
      type: SELECT_AWARDLEVEL,
      payload: {
        awardLevel
      }
    }
  }

export function selectGrade(grade){

  return{
    type: SELECT_GRADE,
    payload: {
      grade
    }
  }
}


export function selectRegion(region){

  return{
    type: SELECT_REGION,
    payload: {
      region
    }
  }
}

export function toggleLevelUpHamburger(){

  return{
    type: LEVELUP_HAMBURGER,
    payload: {
    }
  }
}



export function selectStage(tryoutOrFinal){
  let name = (tryoutOrFinal == 'final')? '初賽' : '決賽';
  return{
    type: SELECT_STAGE,
    payload: {
      tryoutOrFinal: tryoutOrFinal,
      statusName: name,
      statusButton: (tryoutOrFinal == 'final')? 'tryout' : 'final'
    }
  }
}



export function setCurrentWritingContext(context){
  return{
    type: SET_WRITING_CONTEXT,
    payload: {
      context
    }
  }
}


export function setLevelUpHamburgerState(state){
  return{
    type: SET_LEVELUP_HAMBURGER_STATE,
    payload: {
      state
    }
  }
}