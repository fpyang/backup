import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TitleBar from '../tabDecorators/TitleBar';
import ListItem from './utilities/ListItem';

const styles = {
    content: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    }
}
class About extends Component{
    render(){
        let configObjs=[
            {
                title: '賽事說明',
                back: 'About',
                itemTitle: '賽事說明',
                pageUrl: 'https://ucampusapp.weebly.com/about.html'
            },
            {
                title: '賽事規則',
                back: 'About',
                itemTitle: '賽事規則',
                pageUrl: 'https://ucampusapp.weebly.com/rule.html'
            }
        ]
        return(
        <View style={{flex: 1}}>
            <View style={styles.content}>
            { 
                      configObjs.map(
                          (configObj, index)=>{
                              return (<ListItem {...this.props} {...configObj} key={index}/>);
                          }
                      )
                  }
            </View>
        </View>);
    }
}

export { About };