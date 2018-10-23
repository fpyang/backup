import React, { Component } from 'react';
import { View, Text, Platform, StatusBar } from 'react-native';
import {isIphoneX} from '../activityModules/utilities/ScreenUtil';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ?(isIphoneX()?44:20):StatusBar.currentHeight;
const styles = {
    bar: {
        display: 'flex',
        height: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
}
export default class TitleBar extends Component{
    constructor(props){
        super(props);
    }
    //<View style={{height: 18, backgroundColor: 'white'}}></View>
    render(){
        if(Platform.OS == 'ios'){
            
            return(
                <View>   
                    <View style={[styles.bar, {marginTop: STATUSBAR_HEIGHT}]}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}> {this.props.title} </Text>
                    </View>
                </View>
                );
        }else{
            return(
                <View style={styles.bar}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}> {this.props.title} </Text>
                </View>);
        }
        
    }
}