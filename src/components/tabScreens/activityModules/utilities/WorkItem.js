import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentWritingContext } from '../../../../actions/index';

const styles = {
    content: {
        flex: 1,
        backgroundColor: '#f1f1f1'
    },
    item: {
        height: 100,// / PixelRatio.get(),
        width: '95%',
        alignSelf: 'flex-end',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        padding: 8,// / PixelRatio.get(),
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 1,// / PixelRatio.get(),
        marginBottom: 1,// / PixelRatio.get(),
        borderBottomWidth: 1,
        borderBottomColor: '#d3d3d3'
    },
    itemTitle: {
        fontSize: 14
    },
    scoreBox: {
        width: 60,
        height: 60,
        backgroundColor: '#2D82C6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    scoreNumber: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold'
    },
    scoreText: {
        color: 'white',
        fontSize: 11,
        fontWeight: 'bold'
    },
    draftBox: {
        width: 60,
        height: 60,
        backgroundColor: 'gray',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    draftText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    },
    contentArea: {
       display: 'flex',
       width: Dimensions.get('window').width * 0.9 - 100,
       height: '100%',
       backgroundColor: 'white',
       flexDirection: 'column',
       justifyContent: 'space-around'
    },
    contentStartTime: {
       color: 'gray'
    },
    contentEndTime: {
        color: 'gray'
    },
    contentTitle: {
        fontSize: 16
    }
}

class WorkItem extends Component{
    constructor(props){
        super(props);
        this.formatDate = this.formatDate.bind(this);
    }

   formatDate(date) {
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }

    render(){
        var draftIcon = this.props.type == 'draft' ? (<View style={styles.draftBox}> <Text style={styles.draftText}>草稿</Text></View>):
                         (<View style={styles.scoreBox}> 
                         <Text style={styles.scoreNumber}>{this.props.score}</Text>
                         <Text style={styles.scoreText}>整體分數</Text></View>);
        let content = (<View style={styles.contentArea}>
        <Text style={styles.contentTitle}>{this.props.title}</Text>
        <Text style={styles.contentStartTime}>測驗日期：{
            this.formatDate(this.props.startDate)}</Text>
        <Text style={styles.contentEndTime}>完成日期：{
            this.formatDate(this.props.endDate)}</Text>
        </View>);

        let currentWritingContext = {
            questionTitle: '我想當老師', 
            questionPrompt: 'questionPrompt',
            initText: 'Alfred'
        }
        return(
            <TouchableOpacity 
                onPress={
                    ()=>{
                    
                    /*Promise.all(
                        //this.props.setCurrentWritingContext(currentWritingContext)
                    ).then(*/
                        if(this.props.type=='draft'){
                            //this.props.writingContext.context.questionTitle
                            //We must set current writing context first
                            Promise.all(
                                this.props.setCurrentWritingContext(currentWritingContext)
                            ).then(
                            this.props.navigation.navigate('WarmUpTyping', { 
                                title: this.props.title, 
                                back: this.props.back
                                }))
                        }else{
                            this.props.navigation.navigate('WarmUpScore', { 
                                title: this.props.title, 
                                back: this.props.back
                                })
                        }
                        
                    //)
                    }
                    }
                >
                
                <View style={styles.item}>
                    { draftIcon }
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(WorkItem);