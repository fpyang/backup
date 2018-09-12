import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectLevel } from '../../../../actions/index';

const grayBackground = '#F1F1F1';
const styles = {
    levels: {
        flex: 1,
        backgroundColor: grayBackground
    },
    levelTop: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: grayBackground,
      margin: 2,
      marginBottom: 1
    },
    levelBottom: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: grayBackground,
      margin: 2,
      marginTop: 1
    },
    level01:{
        flex: 1,
        backgroundColor: 'white',
        marginRight: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    level02:{
        flex: 1,
        backgroundColor: 'white',
        marginRight: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    level03:{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    level04:{
        flex: 1,
        backgroundColor: 'white',
        marginRight: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    level05:{
        flex: 1,
        backgroundColor: 'white',
        marginRight: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    level06:{
        flex: 1,
        backgroundColor: '#F1F1F1',
        justifyContent: 'center',
        alignItems: 'center'
    },
    regions: {
        flex: 4,
        backgroundColor: '#F1F1F1'
    },
    selected: {
        backgroundColor: '#2D82C6'
    },
    unselected: {
        backgroundColor: 'white'
    },
    selectedText: {
        color: 'white',
        fontSize: 16
    },
    unselectedText: {
        color: 'black',
        fontSize: 16
    },
    selectedSmallText: {
        color: 'white',
        fontSize: 16
    },
    unselectedSmallText: {
        color: 'black',
        fontSize: 16
    },
    selectedScoreText: {
        color: 'white',
        fontSize: 28
    },
    unselectedScoreText: {
        color: 'black',
        fontSize: 28
    }
}

class ScorePerspectiveSelector extends Component{

    constructor(props){

        super(props);
        this.props.selectLevel('1');
        this.setSelectedLevel = this.setSelectedLevel.bind(this);
        this.state = {
            selectedLevel: 1
        }

    }

    setSelectedLevel(index){
        this.setState({selectedLevel: index});
        this.props.selectLevel(index);
    }

    render(){
        //console.log(this.state.selectedLevel);
        return(
            <View style={styles.levels}>
                  <View style={styles.levelTop}>
                    <TouchableOpacity 
                        style={[styles.level01, this.state.selectedLevel == '1' ? styles.selected : styles.unselected]}
                        onPress={()=>{this.setSelectedLevel('1')}}>
                        <Text style={[styles.scoreFont, this.state.selectedLevel == '1' ? styles.selectedScoreText : styles.unselectedScoreText]}
                        >{this.props.writingContext.score.S}</Text>
                        <Text style={[this.state.selectedLevel == '1' ? styles.selectedText : styles.unselectedText]}
                        >整體分數</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.level02, this.state.selectedLevel == '2' ? styles.selected : styles.unselected]}
                        onPress={()=>{this.setSelectedLevel('2')}}>
                        <Text style={[this.state.selectedLevel == '2' ? styles.selectedScoreText : styles.unselectedScoreText]}
                        >{this.props.writingContext.score.F1S}</Text>
                        <Text style={[this.state.selectedLevel == '2' ? styles.selectedText : styles.unselectedText]}
                        >立意取材</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.level03, this.state.selectedLevel == '3' ? styles.selected : styles.unselected]}
                        onPress={()=>{this.setSelectedLevel('3')}}>
                        <Text style={[this.state.selectedLevel == '3' ? styles.selectedScoreText : styles.unselectedScoreText]}
                        >{this.props.writingContext.score.F2S}</Text>
                        <Text style={[this.state.selectedLevel == '3' ? styles.selectedText : styles.unselectedText]}
                        >組織結構</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.levelBottom}>
                    <TouchableOpacity 
                        style={[styles.level04, this.state.selectedLevel == '4' ? styles.selected : styles.unselected]}
                        onPress={()=>{this.setSelectedLevel('4')}}>
                        <Text style={[this.state.selectedLevel == '4' ? styles.selectedScoreText : styles.unselectedScoreText]}
                        >{this.props.writingContext.score.F3S}</Text>
                        <Text style={[this.state.selectedLevel == '4' ? styles.selectedText : styles.unselectedText]}
                        >遣詞造句</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.level05, this.state.selectedLevel == '5' ? styles.selected : styles.unselected]}
                        onPress={()=>{this.setSelectedLevel('5')}}>
                        <Text style={[this.state.selectedLevel == '5' ? styles.selectedScoreText : styles.unselectedScoreText]}
                        >{this.props.writingContext.score.F4S}</Text>
                        <Text style={[this.state.selectedLevel == '5' ? styles.selectedSmallText : styles.unselectedSmallText]}
                        >{'錯別字、格式與\n標點符號'}</Text>
                    </TouchableOpacity>
                    <View 
                        style={styles.level06}
                        onPress={()=>{}}>
                    </View>
                  </View>
            </View>
            
        );
    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({ selectLevel }, dispatch);
  }
  
function mapStateToProps(state) {

    return {
        selectedLevel: state.selectedLevel,
        writingContext: state.writingContext.context
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ScorePerspectiveSelector);