import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SmsVerifyInput } from './SmsVerifyInput';

class PhoneVerifyPanel extends Component{

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

export default PhoneVerifyPanel;