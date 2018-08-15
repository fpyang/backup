import { SIGN_IN } from '../actions';
import { USER_PROFILE } from '../actions';

const defaultStatus = {
    user: {
      uid: null,
      name: '',
      schoolCity:'',
      schoolType: '',
      schoolLevel: '',
      schoolName: '',
      email: '',
      admission: '',
      //classCode: '',
      agreement: '',
      phoneNumber: ''
    }
  };

function autoAssignFunwordGroup(user){

    let schoolType = user.schoolType;
    let schoolLevel = user.schoolLevel;

    //國小 國中 高中職
    //一年級 二年級 三年級 四年級 五年級 六年級 國七 國八 國九

    /*
    1. 國小中年級組: 國小三年級 國小四年級
    2. 國小高年級組: 五年級 六年級
    3. 國中組: 國中
    4. 高中職組: 高中職
    */

    if(schoolType === '國中'){
        return '國中組';
    }
    if(schoolType === '高中職'){
      return '高中職組';
    }
    if(schoolType === '國小'){
        if((schoolLevel === '三年級')||(schoolLevel === '四年級')){
          return'國小中年級組';
        }
        if((schoolLevel === '五年級')||(schoolLevel === '六年級')){
          return '國小高年級組';
        }
        if((schoolLevel === '一年級')||(schoolLevel === '二年級')){
          return '國小低年級組'; //FIXME: 低年級要排除在外, 不顯示這活動
        }
    }
  }


export default function (state = defaultStatus, action) {
  if (action) {
    switch (action.type) {
      case SIGN_IN:
        return { ...state, user: action.payload.user};
      case USER_PROFILE:
        return { ...state, user: action.payload.user}; 
      default:
        return state;
    }
  }
}