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
class WarmUpCompleteButton extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>完成</Text>
            </TouchableOpacity>
        )
    }
}

export default WarmUpCompleteButton;