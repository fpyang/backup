
import React, { Component } from 'react';
import { View, Text, Dimensions, Button, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import TitleBar from './tabDecorators/TitleBar';
import { About, Admission, Books, Grade, Guess, QA, Region, DataList } from './activityModules';
import Award from './activityModules/Award';
import Review from './activityModules/Review';
import NavigationBar from '../NavigationBar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { activityAbout, activityAdmission, activityAward, activityBooks, activityGrade,
         activityGuess, activityQA, activityRegion, activityReview } from '../../images/images';

import { learningPoll, learningWrite, learningRead, learningVideo, learningStar } from '../../images/images';
const uWidth = Dimensions.get('window').width;
const uHeight = Dimensions.get('window').height;
const mWidth = Math.floor((uWidth-12)/3);
const headerFontColor = '#2D82C6';
const styles = {
    content: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        //alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    buttonContainer: {
        width: mWidth, height: mWidth, backgroundColor: 'white', 
        margin: 2, justifyContent: 'center', alignItems: 'center'
    },
    iconImg: {
       marginBottom: 15
    },
    iconTitle: {
       fontSize: 16
    }

}


class LearningScreen extends Component{
    constructor(props){
        super(props);
        // context is used on header's
            
        this.activityModules = [
            //{target: 'Stars', routeName: 'Stars', title: '寫作新星', icon: learningStar},
            //{target: 'LevelUp', routeName: 'LevelUp', title: '閱讀練功坊', icon: learningRead},
            //{target: 'Poll', routeName: 'Poll', title: '校園民調', icon: learningPoll},
            //{target: 'ClassRoom', routeName: 'ClassRoom', title: '寫作教室', icon: learningWrite, context: 'Award'},
            //{target: 'MarkingEssay', routeName: 'MarkingEssay', title: '批改作文', icon: activityBooks},
            {target: 'WarmUp', routeName: 'WarmUp', title: '寫作練習', icon: learningWrite}
        ];
        this.state={
            theData: '',
            title: '',
            semantics: '',
            score: ''
        }

    }
    componentWillMount(){

        fetch(('http://140.122.63.113/aces/titles.ashx'), {
            method: 'GET'}).then((response) => {
              if (response.status === 200) {
      
                response.json().then(json => {
                                      this.setState(Object.assign({}, this.state, {'title': json.toString()}));
                                    });
              } else {
                //console.log(response.status);
              }
            })
            .catch((error) => {
              //console.log(error);
            });
        /*
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
              }
        */
        let body = {
            t: '可貴的合作經驗',
            c: '可貴的合作經驗'
            };
        var formData = new FormData();
        formData.append("t", "可貴的合作經驗");
        formData.append("c", "可貴的合作經驗");
        fetch(('http://140.122.63.113/aces/semacheck.ashx?').concat('c=').
        concat("可貴的合作經驗").
        concat('&').concat('t=').concat("可貴的合作經驗"), {
            method: 'POST',           
        }).then((response) => {
                if (response.status === 200) {       
                response.text().then(text => {
                                        this.setState(Object.assign({}, this.state, {'semantics': text}));
                                    });
                } else {
                //console.log(response.status);
                }
            })
            .catch((error) => {
                //console.log(error);
            });


        //http://140.122.63.113/aces/score.ashx
        
        fetch(('http://140.122.63.113/aces/score.ashx?').concat('c=').
        concat("可貴的合作經驗").
        concat('&').concat('t=').concat("可貴的合作經驗"), {
            method: 'POST',
            body: formData,
        }).then((response) => {
                if (response.status === 200) {
        
                response.text().then(json => {
                                        this.setState(Object.assign({}, this.state, {'score': json.toString()}));
                                    });
                } else {
                //console.log(response.status);
                }
            })
            .catch((error) => {
                //console.log(error);
            });
        

    }
    //
    render(){
        
        return(
        <View style={{flex: 1}}>
            <View style={styles.content}>
              { this.activityModules.map(
                  (modules, index)=>{
                      return (
                      <TouchableOpacity 
                        key={index}                     
                        style={styles.buttonContainer}
                        onPress={() => {
                            this.props.navigation.navigate(modules.routeName, {
                                title: modules.title, 
                                back: modules.back,
                                target: modules.target,
                                context: modules.context,
                                titleName: modules.titleName
                            });                         
                        }}
                        > 
                      <Image style={styles.iconImg} source={modules.icon}/>
                      <Text style={styles.iconTitle}>
                        {modules.title}                      
                      </Text>
                      </TouchableOpacity>);
                  }
              )}
            </View>
        </View>);
        /*

        return(
            <View style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>score:{this.state.score}</Text>
                <Text>fetch:{this.state.title}</Text>
                <Text>semantics:{this.state.semantics}</Text>
            </View>
        );

        */
    }
}

  
function mapStateToProps(state) {
    return {
        signIn: state.signIn
    };
  }
  
  export default connect(mapStateToProps)(LearningScreen);

