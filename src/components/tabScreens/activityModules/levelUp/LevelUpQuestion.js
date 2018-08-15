import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { setLevelUpHamburgerState } from '../../../../actions/index';


class LevelUpQuestion extends Component{
    constructor(props){
        super(props);
        this.state = {
            active: false
        }
    }
    render(){
        return (
        <View> <Text>question</Text> </View>
        )
    }

}


function mapDispatchToProps(dispatch) {

    return bindActionCreators({ setLevelUpHamburgerState }, dispatch);
  }
  
  
function mapStateToProps(state) {
    return {
        writingContext: state.writingContext
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(LevelUpQuestion);