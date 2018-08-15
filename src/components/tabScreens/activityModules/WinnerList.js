import React, { Component } from 'react';
import { View, Text } from 'react-native';
import WinnerListContainer from './utilities/WinnerListContainer';

const styles = {
    content: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    }
}
export default class WinnerList extends Component{
    constructor(props){
        super(props);
    }
    //signup-container-header
    render(){
        return(
        <View style={{flex: 1}}>
            <View style={styles.content}>
            <WinnerListContainer context={'tryout'} {...this.props}/>
            </View>
        </View>);
    }
}

