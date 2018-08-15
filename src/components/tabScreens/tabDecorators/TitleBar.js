import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';

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
    render(){
        if(Platform.OS == 'ios'){
            return(
                <View>
                    <View style={{height: 22, backgroundColor: 'white'}}></View>
                    <View style={styles.bar}>
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