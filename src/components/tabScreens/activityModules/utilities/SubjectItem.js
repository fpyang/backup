import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentWritingContext } from '../../../../actions/index';

const styles = {
    content: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    item: {
        height: 56,// / PixelRatio.get(),
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        padding: 8,// / PixelRatio.get(),
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 1,// / PixelRatio.get(),
        marginBottom: 1,// / PixelRatio.get(),
    },
    itemTitle: {
        fontSize: 14
    }
}

class SubjectItem extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let content = <Text>{this.props.questionTitle}</Text>;
        let currentWritingContext = {
            questionTitle: this.props.questionTitle, 
            questionPrompt: this.props.questionPrompt,
            initText: '',
            content: '',
            type: 'notSubmittedYet'
        }
        return(
            <TouchableOpacity 
                onPress={
                    ()=>{
                    Promise.all(
                        this.props.setCurrentWritingContext(currentWritingContext)
                    ).then(
                        this.props.navigation.navigate('WarmUpQuestion', { 
                            title: this.props.title, 
                            back: this.props.back,
                            pageUrl: this.props.pageUrl
                            })
                    )
                    }
                    }
                >
                <View style={styles.item}>
                    { content }
                    <Icon name='angle-right' size={30} color='gray' />
                </View>
            </TouchableOpacity>
        )
    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({ setCurrentWritingContext }, dispatch);
  }
  
  
function mapStateToProps(state) {
    return {
        selectedLevel: state.awardLevel
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SubjectItem);