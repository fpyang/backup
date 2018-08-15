import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TitleBar from '../tabDecorators/TitleBar';

const styles = {
    content: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    }
}
class Admission extends Component{
    render(){
        return(
        <View style={{flex: 1}}>
            <View style={styles.content}>
            <Text> Admission </Text>
            </View>
        </View>);
    }
}

export { Admission };