/*
source={{uri: this.props.navigation.state.params.pageUrl}}
style={{height: '100%', marginTop: 5, marginBottom:-200}}
*/

import React, { Component } from 'react';
import { WebView, ScrollView } from 'react-native';

export default class WeeblyWebView extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
                <WebView {...this.props} style={{height: '100%', marginTop: 5, marginBottom:-200}}></WebView>

        );
    }
}
