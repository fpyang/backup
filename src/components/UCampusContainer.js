import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { bindActionCreators } from 'redux';
import { setAppStage } from '../actions/index';
import NavigationBar from './NavigationBar';
import MessageVerify from './tabScreens/registerModules/MessageVerify';
import PhoneVerify from './tabScreens/registerModules/PhoneVerify';
import UserProfile from './tabScreens/registerModules/UserProfile';
import RegisterPage from './tabScreens/registerModules/RegisterPage';
import PhoneVerifyPanel from './tabScreens/registerModules/PhoneVerifyPanel';

const identationLeft = 20;
const styles = {
    page: {
        display: 'flex',
        flex: 1
    }
}
class UCampusContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            verifyCode: ''
        }
        
    }
    /*
    {(this.props.appStage=='OnBoarding')&&<RegisterPage />}
            {(this.props.appStage=='Registering')&&<RegisterPage />}
            {(this.props.appStage=='Login')&&<NavigationBar />}
    */
    render(){
        return(    
            <View style={styles.page}>
            {(this.props.appStage.appStage=='OnBoarding')&&<PhoneVerify />}
            {(this.props.appStage.appStage=='Registering')&&<PhoneVerify />}
            {(this.props.appStage.appStage=='Login')&&<NavigationBar />}
            </View>
        );
        
                
        //<NavigationBar /><RegisterPage /><PhoneVerify />
                
        
        /*
        if(this.props.appStage=='OnBoarding'){
            return(<View>
                <Text>OnBoarding</Text>
                <TouchableOpacity onPress={()=>{
                    this.props.setAppStage('Registering');
                }}>
                    <Text>r</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    this.props.setAppStage('OnBoarding');
                }}>
                    <Text>o</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    this.props.setAppStage('Login');
                }}>
                    <Text>l</Text>
                </TouchableOpacity>
                </View>);
        }*/

        
        
    }

}


function mapDispatchToProps(dispatch) {

    return bindActionCreators({ setAppStage }, dispatch);
  }
  
  
function mapStateToProps(state) {
    return {
        appStage: state.appStage
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(UCampusContainer);