import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TitleBar from '../tabDecorators/TitleBar';

const styles = {
    content: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    }
}
class Grade extends Component{
    render(){
        return(
        <View style={{flex: 1}}>
            <View style={styles.content}>
            <Text> grade </Text>
            </View>
        </View>);
    }
}

export { Grade };