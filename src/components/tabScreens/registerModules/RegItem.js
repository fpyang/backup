import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';

const identationLeft = 20;
const styles = {
    item: {
        display: 'flex',
        width: '100%',
        height: 60,
        backgroundColor: 'white',
        margin: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 8
    },
    titleView:{
        width: 80,
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    },
    prompt: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    promptView:{
        width: 230,
        backgroundColor: 'white',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        margin: 8
    },
    clickIndicator: {
        alignSelf: 'flex-end'
    },
    mustFillIndicator: {
        height: 8,
        width: 8,
        backgroundColor: 'orange',
        borderRadius: 4,
        margin: 2
    },
    optionalFillIndicator: {
        height: 8,
        width: 8,
        backgroundColor: 'white',
        borderRadius: 4,
        margin: 2
    }
}
class RegItem extends Component{
    constructor(props){
        super(props);
        this.state ={
            inputText: ''
        }
    }
    render(){
        
            return (
                <View style={styles.item}>
                
                {this.props.must &&
                    <View style={styles.mustFillIndicator} />}
                {!this.props.must &&
                    <View style={styles.optionalFillIndicator} />}
                <View style={styles.titleView}>
                    <Text style={styles.title}>{this.props.fieldType}</Text>
                </View>
                <View style={styles.promptView}>
                {!this.props.textInput &&
                    <Text style={styles.prompt}>{this.props.prompt}</Text>}
                {this.props.textInput && this.props.prompt.length == 0 &&
                    <Text style={styles.prompt}>{this.props.promptText}</Text>}
                {this.props.textInput && this.props.prompt.length > 0 &&
                    <Text style={styles.prompt}>{this.props.prompt}</Text>}
                </View>
                <Icon name="angle-right" size={30} color='gray' style={styles.clickIndicator}/>
                </View>
            )
       
        
    
        
    }

}


  
  export default RegItem;