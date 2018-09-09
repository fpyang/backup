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
    constructor(props){
        super(props);
        this.state = {
            configObjs: [],
            loading: true
        }

    }
    componentWillMount(){

        fetch(('https://ucampus-89e65.firebaseapp.com/static/json/guess.json'), {
            method: 'GET'}).then((response) => {
              if (response.status === 200) {
                response.json().then(json => {
                                      this.setState(Object.assign({}, this.state, {'configObjs': json, 'loading': false}));
                                    });
              } else {
                //console.log(response.status);
              }
            })
            .catch((error) => {
              //console.log(error);
            });
    }
    render(){
        let configObjs=[{
            title: '考前暖身',
            pageUrl: 'https://ucampusapp.weebly.com/Guess_1.html',
            back: 'Guess',
            imageUrl: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
            itemTitle: '考前猜題分析',
            itemAuthor: '聯合盃作文大賽官方',
            itemPublisher: '摘要文字'
        },
        {
            title: '首獎作品與賞析',
            pageUrl: 'https://ucampusapp.weebly.com/Guess_2.html',
            back: 'Guess',
            imageUrl: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
            itemTitle: '考前猜題分析2',
            itemAuthor: '聯合盃作文大賽官方',
            itemPublisher: '摘要文字'
        }
        ]
        let container = [];
        if(this.state.loading){
 
            container = <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>loading</Text></View>
    
        }else{
            container = [];
            { this.state.configObjs.map((configObj, index)=>{
                container.push(<GuessItem {...configObj} {...this.props} key={index}>  </GuessItem>)
            })
           }
        }
        return(
            
                <View style={{flex: 1}}>
                    <View style={styles.content}>
                      {container} 
                    </View>
                </View>
            );
    }
}

export { Guess };