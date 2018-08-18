import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentWritingContext } from '../../../../actions/index';

const styles = {
    startButton: {
        backgroundColor: '#2D82C6',
        width: '70%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        height: 46,
        borderRadius: 20
    },
    startButtonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    pageStyle: {
        display: 'flex'
    },
    questionBox: {
        width: '90%', 
        height: 'auto', 
        backgroundColor: 'white',
        alignSelf: 'center',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'gray',
        margin: 8,
        padding: 8
    },
    questionText: {
        color: 'gray'
    },
    titleBox: {
        width: '90%', 
        height: 'auto', 
        backgroundColor: 'white',
        alignSelf: 'center',
        margin: 10
    },
    questionArea: {
        width: '100%',
        height: '70%',
        marginTop: 10
    },
    page: {
        backgroundColor: 'white',
        flex: 1
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    }
}
class WarmUpQuestion extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={styles.page}>
                <View style={styles.questionArea}>
                <View style={styles.titleBox}>
                <Text style={styles.title}> 題目: {this.props.writingContext.context.questionTitle} </Text>
                </View>
                <View style={styles.questionBox}>
                  <Text style={styles.questionText}> {this.props.writingContext.context.questionPrompt} </Text>
                </View>
                </View>

                <TouchableOpacity
                  onPress={()=>{this.props.navigation.navigate('WarmUpTyping', { 
                    title: '寫作練習', 
                    questionTitle: this.props.writingContext.context.questionTitle,
                    questionPrompt: this.props.writingContext.context.questionPrompt,
                    initText: '',
                    back: 'WarmUpQuestion'
                })}}
                >
                   <View style={styles.startButton}>
                       <Text style={styles.startButtonText}> 開始寫文章 </Text>
                   </View>
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
        writingContext: state.writingContext
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(WarmUpQuestion);