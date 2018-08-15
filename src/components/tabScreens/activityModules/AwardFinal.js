import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TitleBar from '../tabDecorators/TitleBar';
import LevelSelector from './utilities/LevelSelector';
import WinnerListContainer from './utilities/WinnerListContainer';
import ListItem from './utilities/ListItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectLevel } from '../../../actions/index';

const grayBackground = '#F1F1F1';
const styles = {
    content: {
        flex: 1,
        backgroundColor: grayBackground
    },
    levels: {
        flex: 1.2,
        backgroundColor: grayBackground
    },
    regions: {
        flex: 4,
        backgroundColor: '#F1F1F1'
    }
}
class AwardFinal extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let configObj={
            title: 'titleOfItem',
            back: 'Award',
            pageUrl: 'https://www.yahoo.com'
        }
        if("awardLevel" in this.props.selectedLevel){
            //pass
        }else{
            
        }
        /*
        Using Spread Operator to propogate this.props to child component
        (We need this.props.navigate to operate stackNavigator)
        */
        return(
        <View style={{flex: 1}}>
            <View style={styles.content}>
                <View style={styles.levels}>
                  <LevelSelector />
                </View>
                <View style={styles.regions}>                
                  <WinnerListContainer context={'final'}/>
                </View>
            </View>
        </View>);
    }
}
function mapDispatchToProps(dispatch) {

    return bindActionCreators({ selectLevel }, dispatch);
  }
  
  
function mapStateToProps(state) {
    return {
        selectedLevel: state.awardLevel,
        stage: state.stage
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(AwardFinal);

  