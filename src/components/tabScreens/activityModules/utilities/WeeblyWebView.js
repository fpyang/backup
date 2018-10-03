/*
source={{uri: this.props.navigation.state.params.pageUrl}}
style={{height: '100%', marginTop: 5, marginBottom:-200}}
*/

import React, { Component } from 'react';
import { WebView, ScrollView, Linking, Platform } from 'react-native';

export default class WeeblyWebView extends Component {
    constructor(props){
        super(props);
        this.openExternalLink = this.openExternalLink.bind(this);
    }
    openExternalLink(req) {
        const isWeebly = req.url.search('weebly') !== -1;

        if (isWeebly) {
            return true;
          } else {
            Linking.openURL(req.url);
            return false;
          }
      
    }
    render(){
        return(
                <WebView 
                {...this.props} 
                onShouldStartLoadWithRequest={this.openExternalLink}
                onNavigationStateChange={(event)=>{
                    const isWeebly = event.url.search('weebly') !== -1;
                    if(Platform.OS === 'android'){
                        if (isWeebly) {
                            return true;
                          } else {
                            Linking.openURL(event.url);
                            return false;
                          }
                    }
                }}
                style={{height: '100%', marginTop: 5, marginBottom:-200}}></WebView>

        );
    }
}
