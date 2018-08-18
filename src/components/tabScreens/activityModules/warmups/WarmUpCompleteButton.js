import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Keyboard } from 'react-native';
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
                          //submit with type masterpiece
                          if (this.props.writingContext == 'notSubmittedYet'){
                            //add a doc to Cloud FireStore
                            this.warmupCollection.add({
                                title: this.props.writingContext.questionTitle,
                                content: this.props.writingContext.content,
                                type: 'masterpiece',
                                startTime: new Date(),
                                endTime: new Date(),
                                score: {}
                            });
                          }else{
                            //over-write a doc 
                            this.warmupCollection.doc(this.props.writingContext.id).set({
                                title: this.props.writingContext.questionTitle,
                                content: this.props.writingContext.content,
                                type: 'masterpiece',
                                startTime: this.props.writingContext.startTime, 
                                endTime: new Date(),
                                score: {}
                                });
                          }

                          break;
                          case 1:
                          //submit with type draft
                          if (this.warmupCollection.writingContext == 'notSubmittedYet'){
                            //add a doc to Cloud FireStore
                            this.todos.add({
                                title: this.props.writingContext.questionTitle,
                                content: this.props.writingContext.content,
                                type: 'draft',
                                startTime: new Date(),
                                endTime: new Date(),
                                score: {}
                            });
                          }else{
                             //over-write a doc 
                            this.warmupCollection.doc(this.props.writingContext.id).set({
                                title: this.props.writingContext.questionTitle,
                                content: this.props.writingContext.content,
                                type: 'draft',
                                startTime: this.props.writingContext.startTime,
                                endTime: new Date(),
                                score: {}
                                });   
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