import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TitleBar from '../tabDecorators/TitleBar';
import GuessItem from './utilities/GuessItem';

const styles = {
    content: {
        flex: 1,
        backgroundColor: 'white'
    }
}
class Guess extends Component{
    render(){
        let configObjs=[{
            title: '考前暖身',
            pageUrl: 'https://ucampusapp.weebly.com/Guess_1.html',
            back: 'Guess',
            itemTitle: '考前猜題分析',
            itemAuthor: '聯合盃作文大賽官方',
            itemPublisher: '摘要文字'
        },
        {
            title: '首獎作品與賞析',
            pageUrl: 'https://ucampusapp.weebly.com/Guess_2.html',
            back: 'Guess',
            itemTitle: '考前猜題分析2',
            itemAuthor: '聯合盃作文大賽官方',
            itemPublisher: '摘要文字'
        }
        ]
        return(
            
                <View style={{flex: 1}}>
                    <View style={styles.content}>
                    { configObjs.map((configObj, index)=>{
                         return (<GuessItem {...configObj} {...this.props} key={index}>  </GuessItem>)
                     })
                    }
                    
                    </View>
                </View>
            );
    }
}

export { Guess };