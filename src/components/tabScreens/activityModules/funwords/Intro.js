import React, { Component } from 'react';
import { View, Text } from 'react-native';
import WeeblyWebView from '../utilities/WeeblyWebView';

const styles = {
    intro: {
        flex: 1,
        height: '100%',
        backgroundColor: '#F1F1F1'
    }
}
class Intro extends Component{
    constructor(props){
        super(props);
    }
    //ucampusapp.weebly.com/final_north.html
    render(){
        return(
            <View style={styles.intro}>
                <WeeblyWebView source={{uri: 'https://ucampusapp.weebly.com/FunwordAbout.html'}} />
            </View>
        )
    }
}

export default Intro ;

