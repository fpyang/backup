import React, { Component } from 'react';
import { View, Text, WebView } from 'react-native';
import TitleBar from '../tabDecorators/TitleBar';
import WeeblyWebView from './utilities/WeeblyWebView';

const styles = {
    content: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    }
}
export default class Leaf extends Component{
    constructor(props){
        super(props);
    }
    //signup-container-header
    render(){
        //console.log(this.props.navigation.state.params.pageUrl);
        return(
        <View style={{flex: 1}}>
            <View style={styles.content}>
            <WeeblyWebView source={{uri: this.props.navigation.state.params.pageUrl}} />
            </View>
        </View>);
    }
}

