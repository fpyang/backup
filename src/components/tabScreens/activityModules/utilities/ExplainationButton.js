import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

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
class ExplainationButton extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <TouchableOpacity style={styles.button}
                onPress={()=>{
                    this.props.navigation.navigate(this.props.target, {
                        title: this.props.title, 
                        back: this.props.back,
                        previousTitle: this.props.previousTitle
                    });  
                }}
            >
                <Text style={styles.buttonText}>說明</Text>
            </TouchableOpacity>
        )
    }
}

export default ExplainationButton;
