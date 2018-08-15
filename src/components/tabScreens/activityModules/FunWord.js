import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Award from './funwords/Award';
import Intro from './funwords/Intro';
import Submit from './funwords/Submit';
import Vote from './funwords/Vote';
import { setFunwordState } from '../../../actions/index';

const styles = {
    content: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    subPageSelectors: {
       flex: 0.6,
       flexDirection: 'row',
       backgroundColor: '#F1F1F1F1'
    },
    subPageSelector: {
        margin: 2,
        height: '100%',
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
     },
    subPageContent: {
       flex: 4,
       backgroundColor: '#F1F1F1F1'
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
    }
}
class FunWord extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
        <View style={{flex: 1}}>          
            <View style={styles.content}>
                <View style={styles.subPageSelectors}>
                    <TouchableOpacity 
                        style={[styles.subPageSelector, this.props.funwordState == 'Intro' ? styles.selected : styles.unselected]}
                        onPress={()=>{this.props.setFunwordState('Intro')}}>
                        <Text style={[this.props.funwordState == 'Intro' ? styles.selectedText : styles.unselectedText]}
                        >活動說明</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.subPageSelector, this.props.funwordState == 'Submit' ? styles.selected : styles.unselected]}
                        onPress={()=>{this.props.setFunwordState('Submit')}}>
                        <Text style={[this.props.funwordState == 'Submit' ? styles.selectedText : styles.unselectedText]}
                        >投稿</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.subPageSelector, this.props.funwordState == 'Vote' ? styles.selected : styles.unselected]}
                        onPress={()=>{this.props.setFunwordState('Vote')}}>
                        <Text style={[this.props.funwordState == 'Vote' ? styles.selectedText : styles.unselectedText]}
                        >投票</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.subPageSelector, this.props.funwordState == 'Award' ? styles.selected : styles.unselected]}
                        onPress={()=>{this.props.setFunwordState('Award')}}>
                        <Text style={[this.props.funwordState == 'Award' ? styles.selectedText : styles.unselectedText]}
                        >得獎名單</Text>
                    </TouchableOpacity>
                </View>
            <View style={styles.subPageContent}>
            {this.props.funwordState === 'Intro' && <Intro />}
            {this.props.funwordState === 'Submit' && <Submit />}
            {this.props.funwordState === 'Vote' && <Vote />}
            {this.props.funwordState === 'Award' && <Award />}
            </View>
            </View>
        </View>);
    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({ setFunwordState }, dispatch);
  }
  
  
function mapStateToProps(state) {
    return {
        funwordState: state.funwordState.funwordState
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(FunWord);