import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { bindActionCreators } from 'redux';
import firebase from 'react-native-firebase';
import { regNext, regLast, setAppStage, signIn, saveCurrentProfile, setOnboardingStatus } from '../../../actions/index';
import { SmsVerifyInput } from './SmsVerifyInput';
import LLTextInput from '../activityModules/utilities/LLTextInput';
import UserProfile from './UserProfile';

const styles = {
    page: {
        display: 'flex',
        flex: 1,
        backgroundColor: 'white'
    },
    bar: {
        display: 'flex',
        height: 50,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
}
class PhoneVerify extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: null,
            message: '',
            codeInput: '',
            phoneNumber: '',
            validPhoneNum: '',
            phoneNumberFormValid: false,
            confirmResult: null,
            authStateChanged: ''
        }
        this.renderPhoneInput = this.renderPhoneInput.bind(this);
        this.isNumeric = this.isNumeric.bind(this);
        this.phoneNumberVerify = this.phoneNumberVerify.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.saveProfile = this.saveProfile.bind(this);
        this.confirmCode = this.confirmCode.bind(this);
        this.users = firebase.firestore().collection('users');
        this.syncCurrentUserProfile = this.syncCurrentUserProfile.bind(this);
          
    }
    componentDidMount() {
        
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            this.setState({ authStateChanged: JSON.stringify(user)});
            this.setState({ user: user.toJSON()});
            this.props.signIn(user);
            this.syncCurrentUserProfile(user.uid);

            this.users.where("uid", "==", user.uid).get()
                      .then(querySnapshot => {
                          let size = querySnapshot.size;
                          if(size > 0){
                              this.props.setAppStage('Login');//Skip filling user profile form
                              //Load user-profile to app
                              querySnapshot.forEach(documentSnapshot => {
                                  this.props.saveCurrentProfile(documentSnapshot.data());                        
                            });
                          }else{
                              this.props.setAppStage('Registering');
                              this.props.setRegStage('Profile');
                          }
                      
                      });
                      
            //this.props.setAppStage('Login');
            //this.props.setAppStage('Registering');
          } else {
            // User has been signed out, reset the state
            this.setState({
              user: null,
              message: '',
              codeInput: '',
              phoneNumber: '',
              validPhoneNum: '',
              phoneNumberFormValid: false,
              confirmResult: null
            });
          }
        });
        
       
      }
    
      componentWillUnmount() {
         if (this.unsubscribe) this.unsubscribe();
      }

      syncCurrentUserProfile(uid){
        this.users.where("uid", "==", uid).get()
        .then(querySnapshot => {
             querySnapshot.forEach(documentSnapshot => {
                let user = {
                    name: documentSnapshot.data().name,
                    schoolCity: documentSnapshot.data().schoolCity,
                    schoolType: documentSnapshot.data().schoolType,
                    schoolLevel: documentSnapshot.data().schoolLevel,
                    schoolName: documentSnapshot.data().schoolName,
                    email: documentSnapshot.data().email,
                    admission: documentSnapshot.data().admission,
                    //classCode: documentSnapshot.data().classCode,
                    agreement: documentSnapshot.data().agreement,
                    uid: documentSnapshot.data().uid,
                    phoneNumber: documentSnapshot.data().phoneNumber,
                    funwordGroup: documentSnapshot.data().funwordGroup
                };
                this.props.signIn(user);
             });
          
          
        });
    }

      isNumeric(n){
          return !isNaN(parseFloat(n)) && isFinite(n);
      }

      nextStep(){

        switch(this.props.regStage.appStage){
            case 'Phone':
               return this.signIn();
            case 'Message':
              return this.confirmCode();
            case 'Profile':
              return this.saveProfile();
            default: 
              return ()=>{};
        }

      }
      phoneNumberVerify(){
          //replace +886 (區碼) TODO: 是否允許其他區碼
          let refinedNumber = this.state.phoneNumber.replace('+886', '0');
          if(refinedNumber.length === 10 && this.isNumeric(refinedNumber)){
                this.setState({validPhoneNum: '+886' + refinedNumber.substr(1)},
                ()=>{this.setState({phoneNumberFormValid: true})}
            );
          }else{
            this.setState({phoneNumberFormValid: false});
          }
      }


      signIn = () => {
        const { validPhoneNum } = this.state;
        this.setState({ message: 'Sending code ...' });
    
        firebase.auth().signInWithPhoneNumber(validPhoneNum)
          .then(confirmResult => {
              this.setState({ confirmResult, message: 'Code has been sent!' });
              this.props.regNext();
        })
          .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));
      };
    
      confirmCode = () => {
        const { codeInput, confirmResult } = this.state;
        if(codeInput!= null){
            if (confirmResult && codeInput.length) {
                if(codeInput.length == 6){
                    confirmResult.confirm(codeInput)
                    .then((user) => {
                      this.setState({ message: 'Code Confirmed!' });
                      this.setState({user});                  
                      //check if user existed in fireCloud?
                      //existing user
                      //this.props.setAppStage('Login');//Skip filling user profile form
                      //new user
                      // Create a query against the collection
                      this.users.where("uid", "==", user.uid).get()
                      .then(querySnapshot => {
                          let size = querySnapshot.size;
                          if(size > 0){
                              this.props.setAppStage('Login');//Skip filling user profile form
                              //Load user-profile to app
                              querySnapshot.forEach(documentSnapshot => {
                                  this.props.saveCurrentProfile(documentSnapshot.data());                        
                            });
                          }else{
                              this.props.signIn(user);
                              this.props.regNext();//lead to user profile filling page
                          }
                      
                      });
                      
                    })
                    .catch(error => this.setState({ message: `Code Confirm Error: ${codeInput} ${error.message}` }));
                }
                
              }
        }   
      };
    
      signOut = () => {
        firebase.auth().signOut();
      }

      saveProfile(){
          //save the profile to db
          this.userProfile.saveCurrentProfile();
      }

    renderPhoneInput(){
        return(
        <View style={{flex: 1}}>
            <View style={styles.bar}>
                
                <Text>{JSON.stringify(this.state.message)}</Text>
                {this.props.regStage.hasLast && 
                <TouchableOpacity onPress={()=>{this.props.regLast()}}
                ><Text style={{fontSize: 18, fontWeight: 'bold'}}> {'電話驗證'} </Text></TouchableOpacity>}
                
                {!this.props.regStage.hasLast && <Text style={{fontSize: 18, color: 'transparent'}}> {'電話驗證'} </Text>}
                <Text style={{fontSize: 18, fontWeight: 'bold'}}> {this.props.regStage.appStageTitle} </Text>
                
                {(this.props.regStage.hasNext && this.state.phoneNumberFormValid) &&
                <TouchableOpacity onPress={()=>{
                    this.nextStep();
                }}
                ><Text style={{fontSize: 18, fontWeight: 'bold', color: '#2D82C6'}}> {'下一步'} </Text></TouchableOpacity>}
                {(this.props.regStage.hasNext && !this.state.phoneNumberFormValid) &&
                <TouchableOpacity onPress={()=>{}}
                ><Text style={{fontSize: 18, fontWeight: 'bold', color: 'gray'}}> {'下一步'} </Text></TouchableOpacity>}
                {!this.props.regStage.hasNext && <Text style={{fontSize: 18, color: 'transparent'}}> {'下一步'} </Text>}
            </View>
            
            <View style={{flex: 1}}>  
                { this.props.regStage.appStage === 'Phone' &&    
                <View style={styles.page}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 50, width: '100%', borderColor: 'gray', borderWidth: 0.5}}>
                    <View><Text>電話號碼:</Text></View>
                    <LLTextInput
                        underlineColorAndroid={'transparent'}
                        style={{height: '100%', width: '80%'}}
                        onChangeText={(phoneNumber) => {
                            this.setState({phoneNumber}, ()=>this.phoneNumberVerify());
                            this.phoneNumberVerify();
                        }}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        keyboardType='phone-pad'
                        maxLength={15}
                        value={'' + this.state.phoneNumber}
                    />
                    </View>
                    <View style={{margin: 10}}>
                    <Text>您必須先驗證電話號碼, 才能開始使用.</Text>                
                    </View>
                </View> }

                { this.props.regStage.appStage === 'Message' &&
                <View style={{width: '100%', flex: 1, backgroundColor: 'white', marginTop: 50}}>
                    <View style={{width: 50, height: 50, backgroundColor: 'white'}}></View>
                    <SmsVerifyInput
                        placeholder=""
                        label="VerifyCode"
                        maxLength={6}
                        inputStyle={{justifyContent: 'center', alignItems: 'center'}}
                        value={this.state.codeInput}
                        keyboardType="phone-pad"
                        onChangeText={codeInput => {
                            this.setState({ codeInput }, this.confirmCode);
                        }} />
                </View>}

                { this.props.regStage.appStage === 'Profile' && <UserProfile onRef={ref => (this.userProfile = ref)}/> }

            </View>
        </View>
    );
    }

    render(){
        /*
        if(this.props.signIn.user){
            if(this.props.signIn.user.uid){

                this.props.setAppStage('Login');

            }
        }*/
        //Set logout mechanism
       // <Text>{JSON.stringify(this.state.message)}</Text>
       // <Text>authStateChanged: {this.state.authStateChanged}</Text>
        return (
            <View style={styles.page}>
                <Text>{JSON.stringify(this.state.message)}</Text>
                <Text>authStateChanged: {this.state.authStateChanged}</Text>
                {this.renderPhoneInput()}       
            </View>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ regNext, regLast, setAppStage, signIn, saveCurrentProfile, setOnboardingStatus }, dispatch);
  }
  
  
function mapStateToProps(state) {
    return {
        regStage: state.regStage,
        appStage: state.appStage,
        signIn: state.signIn,
        onboarding: state.onboarding
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(PhoneVerify);