import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { setLevelUpHamburgerState } from '../../../actions/index';
import PhoneVerify from './PhoneVerify';
import UserProfile from './UserProfile';
import MessageVerify from './MessageVerify';


//This is a Depregated Page

const identationLeft = 20;
const styles = {
    page: {
        display: 'flex',
        backgroundColor: 'gray',
        flex: 1
    },
    bar: {
        display: 'flex',
        height: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
}

class RegisterPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            active: false
        }
        
    }
    render(){
        if(Platform.OS == 'ios'){
            return(
                <View>
                    <View style={{height: 22, backgroundColor: 'white'}}></View>
                    <View style={styles.bar}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}> {this.props.title} </Text>
                    </View>
                    <View style={styles.page}>
                    <UserProfile />
                    </View>
                </View>
                );
        }else{//<UserProfile /> <PhoneVerify /><MessageVerify />
            return(
                <View style={{flex: 1}}>
                <View style={styles.bar}>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}> {'電話驗證'} </Text>
                </View>
                <View style={{flex: 1}}>
                
                <UserProfile /> 
                
                </View>
                </View>
                );
        }
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);