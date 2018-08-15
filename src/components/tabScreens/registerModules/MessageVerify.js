import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { bindActionCreators } from 'redux';
import { setLevelUpHamburgerState } from '../../../actions/index';
import { SmsVerifyInput } from './SmsVerifyInput';

const identationLeft = 20;

class MessageVerify extends Component{
    constructor(props){
        super(props);
        this.state = { verifyCode: ''}
    }
    
    render(){
        return(
                <SmsVerifyInput
                    placeholder=""
                    label="VerifyCode"
                    maxLength={6}
                    inputStyle={{justifyContent: 'center', alignItems: 'center'}}
                    value={this.state.verifyCode}
                    keyboardType="phone-pad"
                    onChangeText={verifyCode => {
                        //this.setState({ verifyCode }, this.updateButton);
                        this.setState({ verifyCode });
                    }} />
        )
    }

}


function mapDispatchToProps(dispatch) {

    return bindActionCreators({ setLevelUpHamburgerState }, dispatch);
  }
  
  
function mapStateToProps(state) {
    return {
        writingContext: state.writingContext
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(MessageVerify);