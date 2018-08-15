import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectLevel, selectStage } from '../../../../actions/index';

const grayBackground = '#F1F1F1'; //
const styles = {
    buttonStyle: {
        color: '#2D82C6',
        fontSize: 18,
        margin: 6
    }
}

class FinalButton extends Component{

    constructor(props){

        super(props);

        this.props.selectLevel('1');
        this.setSelectedLevel = this.setSelectedLevel.bind(this);
        this.toggleButton = this.toggleButton.bind(this);
        this.state = {
            selectedLevel: 1,
            statusButton: '決賽'
        }

    }

    setSelectedLevel(index){
        this.setState({selectedLevel: index});
        this.props.selectLevel(index);
    }

    toggleButton(){
        //console.log(this.state.statusButton);
        if(this.state.statusButton == '初賽'){
            this.setState({ statusButton : '決賽'});
            this.props.selectStage('tryout');
        }else{//this.props.context
            this.setState({ statusButton :   '初賽'});
            this.props.selectStage('final');
        }
        
    }

    render(){
        return(
            <TouchableOpacity 
              onPress={()=>{
              
                  this.toggleButton();
                  
                  this.props.navigation.setParams({ title: this.state.statusButton + this.props.navigation.state.params.titleName });
                  
                }}
            >
                <Text style={styles.buttonStyle}>{this.state.statusButton}</Text>
            </TouchableOpacity>
        );
    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({ selectLevel, selectStage }, dispatch);
  }
  
function mapStateToProps(state) {

    return {
        selectedLevel: state.selectedLevel
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(FinalButton);