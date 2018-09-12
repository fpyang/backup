import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionSheet from 'react-native-actionsheet';
import firebase from 'react-native-firebase';
import { setCurrentWritingContext } from '../../../../actions/index';

const grayBackground = '#F1F1F1';
const styles = {
    button: {
        display: 'flex',
        margin: 10
    },
    buttonText:{
        fontSize: 18,
        color: '#2D82C6'
    }
}
class WarmUpCompleteButton extends Component{
    constructor(props){
        super(props);
        this.showActionSheet = this.showActionSheet.bind(this);
        this.warmupCollection = firebase.firestore().collection('aiwriting/'.concat(this.props.signIn.user.uid)
        .concat('/collection'));
    }
    showActionSheet(){
        this.ActionSheet.show();
    }
    render(){
        return(
            <View>
                <ActionSheet
                ref={o => this.ActionSheet = o}
                title={''}
                options={['送出評分', '儲存草稿內容', '取消']}
                cancelButtonIndex={2}
                destructiveButtonIndex={1}
                onPress={(index) => {
                      switch(index){
                          case 0:
                          //Process Template:
                          //1. get the relevance between content and topic
                          //2. get the score 
                          //3. submit with type masterpiece
                          /*
                          .concat('t=').
                            concat(this.props.writingContext.questionTitle).
                            concat('&').concat('c=').concat(this.props.writingContext.content)
                          */
                        var formData = new FormData();
                        formData.append("t", this.props.writingContext.questionTitle);
                        formData.append("c", this.props.writingContext.content);
                        if(this.props.writingContext.content.length > 499){
                        fetch(('http://140.122.63.113/aces/semacheck.ashx'), {
                                method: 'POST',
                                body: formData,           
                            }).then((response) => {
                                    if (response.status === 200) {       
                                    response.text().then(text => {
                                                            if(text=='低'){
                                                                Alert.alert(
                                                                    '你的作文好像沒寫到跟題目有關係的內容，建議你再看一看自己的作文!',
                                                                    '你確定立即將作文送出評分?',
                                                                    [
                                                                      {text: '確定', onPress: () => {    

                                                                        fetch(('http://140.122.63.113/aces/score.ashx'), {
                                                                                method: 'POST',
                                                                                body: formData,
                                                                            }).then((response) => {
                                                                                    if (response.status === 200) {
                                                                            
                                                                                    response.json().then(json => {
                                                                                                            this.props.setCurrentWritingContext({score: json});
                                                                                                        }).then(

                                                                                                            ()=>{

                                                                                                                if (this.props.writingContext.type == 'notSubmittedYet'){
                                                                                                                    //add a doc to Cloud FireStore
                                                                                                                    this.warmupCollection.add({
                                                                                                                        title: this.props.writingContext.questionTitle,
                                                                                                                        content: this.props.writingContext.content,
                                                                                                                        type: 'masterpiece',
                                                                                                                        startTime: new Date(),
                                                                                                                        endTime: new Date(),
                                                                                                                        score: this.props.writingContext.score
                                                                                                                    }).then(
                                                                                                                        ()=>{
                                                                                                                            this.props.navigation.navigate('WarmUpScore', { 
                                                                                                                                title: this.props.writingContext.questionTitle, 
                                                                                                                                back: 'WarmUp'
                                                                                                                                });
                                                                                                                        }
                                                                                                                    );
                                                                                                                  }else{
                                                                                                                    //over-write a doc 
                                                                                                                    this.warmupCollection.doc(this.props.writingContext.id).set({
                                                                                                                        title: this.props.writingContext.questionTitle,
                                                                                                                        content: this.props.writingContext.content,
                                                                                                                        type: 'masterpiece',
                                                                                                                        startTime: this.props.writingContext.startTime, 
                                                                                                                        endTime: new Date(),
                                                                                                                        score: this.props.writingContext.score
                                                                                                                        }).then(
                                                                                                                            ()=>{
                                                                                                                                this.props.navigation.navigate('WarmUpScore', { 
                                                                                                                                    title: this.props.writingContext.questionTitle, 
                                                                                                                                    back: 'WarmUp'
                                                                                                                                    });
                                                                                                                            }
                                                                                                                        );
                                                                                                                  }
                                                                                                            }
                                                                                                            
                                                                                                        );
                                                                                    } else {
                                                                                    //console.log(response.status);
                                                                                    }
                                                                                })
                                                                                .catch((error) => {
                                                                                    //console.log(error);
                                                                                });

                                                                        


                                                                      }},
                                                                      {text: '取消', onPress: () => {}}
                                                                    ],
                                                                    { cancelable: false }
                                                                  )
                                                            }else{
                                                                Alert.alert(
                                                                    '',
                                                                    '你確定立即將作文送出評分?',
                                                                    [
                                                                      {text: '確定', onPress: () => {                                    

                                                                                fetch(('http://140.122.63.113/aces/score.ashx'), {
                                                                                method: 'POST',
                                                                                body: formData,
                                                                            }).then((response) => {
                                                                                    if (response.status === 200) {
                                                                            
                                                                                    response.json().then(json => {
                                                                                                            this.props.setCurrentWritingContext({score: json});
                                                                                                        }).then(

                                                                                                            ()=>{

                                                                                                                if (this.props.writingContext.type == 'notSubmittedYet'){
                                                                                                                    //add a doc to Cloud FireStore
                                                                                                                    this.warmupCollection.add({
                                                                                                                        title: this.props.writingContext.questionTitle,
                                                                                                                        content: this.props.writingContext.content,
                                                                                                                        type: 'masterpiece',
                                                                                                                        startTime: new Date(),
                                                                                                                        endTime: new Date(),
                                                                                                                        score: this.props.writingContext.score
                                                                                                                    }).then(
                                                                                                                        ()=>{
                                                                                                                            this.props.navigation.navigate('WarmUpScore', { 
                                                                                                                                title: this.props.writingContext.questionTitle, 
                                                                                                                                back: 'WarmUp'
                                                                                                                                });
                                                                                                                        }
                                                                                                                    );
                                                                                                                  }else{
                                                                                                                    //over-write a doc 
                                                                                                                    this.warmupCollection.doc(this.props.writingContext.id).set({
                                                                                                                        title: this.props.writingContext.questionTitle,
                                                                                                                        content: this.props.writingContext.content,
                                                                                                                        type: 'masterpiece',
                                                                                                                        startTime: this.props.writingContext.startTime, 
                                                                                                                        endTime: new Date(),
                                                                                                                        score: this.props.writingContext.score
                                                                                                                        }).then(
                                                                                                                            ()=>{
                                                                                                                                this.props.navigation.navigate('WarmUpScore', { 
                                                                                                                                    title: this.props.writingContext.questionTitle, 
                                                                                                                                    back: 'WarmUp'
                                                                                                                                    });
                                                                                                                            }
                                                                                                                        );
                                                                                                                  }
                                                                                                            }
                                                                                                            
                                                                                                        );
                                                                                    } else {
                                                                                    //console.log(response.status);
                                                                                    }
                                                                                })
                                                                                .catch((error) => {
                                                                                    //console.log(error);
                                                                                });

                                                                      }},
                                                                      {text: '取消', onPress: () => {}}
                                                                    ],
                                                                    { cancelable: false }
                                                                  )

                                                            }
                                                        });
                                    } else {
                                    //console.log(response.status);
                                    }
                                })
                                .catch((error) => {
                                    //console.log(error);
                                });}else{

                                    //alert the content length is less than 500 word
                                    Alert.alert(
                                        '字數小於500字',
                                        '請充實內容後再評分,若是仍在醞釀靈感,可以先存成草稿',
                                        [
                                          {text: 'OK', onPress: () => {}},
                                        ],
                                        { cancelable: false }
                                      )

                                }
                          break;
                          case 1:
                          //submit with type draft
                          if (this.props.writingContext.type == 'notSubmittedYet'){
                            //add a doc to Cloud FireStore
                            this.warmupCollection.add({
                                title: this.props.writingContext.questionTitle,
                                content: this.props.writingContext.content,
                                type: 'draft',
                                startTime: new Date(),
                                endTime: new Date(),
                                score: {}
                            }).then(
                                ()=>{
                                    this.props.navigation.navigate('WarmUpCollection');
                                }
                            );
                          }else{
                             //over-write a doc 
                            this.warmupCollection.doc(this.props.writingContext.id).set({
                                title: this.props.writingContext.questionTitle,
                                content: this.props.writingContext.content,
                                type: 'draft',
                                startTime: this.props.writingContext.startTime,
                                endTime: new Date(),
                                score: {}
                                }).then(
                                    ()=>{
                                        this.props.navigation.navigate('WarmUpCollection');
                                    }
                                );   
                          }
                          break;
                          case 2:
                          //no op
                          break;
                      }
                }}
                />
                <TouchableOpacity style={styles.button} onPress={()=>{
                    Keyboard.dismiss();
                    this.showActionSheet();
                }
                    }>
                    <Text style={styles.buttonText}>完成</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({ setCurrentWritingContext }, dispatch);
  }
  
  
function mapStateToProps(state) {
    return {
        writingContext: state.writingContext.context,
        signIn: state.signIn
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(WarmUpCompleteButton);