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
export const ONBOARDING = 'ONBOARDING';
export const FETCH_ARTICLES = 'FETCH_ARTICLES';

export const RECEIVE_ARTICLES = 'RECEIVE_ARTICLES';
function receiveArticles(json) {
  return {
    type: RECEIVE_ARTICLES,
    articles: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

export const REQUEST_ARTICLES = 'REQUEST_ARTICLES'
function requestArticles() {
  return {
    type: REQUEST_ARTICLES
  }
}


// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchPosts('reactjs'))
export function fetchArticles() {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.
  return function(dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(requestArticles())
    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.
    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.
    return fetch(`http://test.educoco.com:5000/articlesbf`)
      .then(
        response => response.json(),
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => console.log('An error occurred.', error)
      )
      .then(json =>
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.
        dispatch(receiveArticles(json))
      )
  }
}

export function setOnboardingStatus(status){
  return{
    type: ONBOARDING,
    payload: {
      status
    }
  }
}

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