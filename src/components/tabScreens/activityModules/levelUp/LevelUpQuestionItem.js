



import React, { Component } from 'react';
import { View, Text } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

const styles = {
    questionMargin: {
        marginTop: 10,
        width: '90%'
    },
    questionBorder: {
        borderWidth: 1,
        width: '100%',
        borderStyle: 'solid',
        borderRadius: 20,
        padding: 10,  
        height: 'auto',
        display: 'flex',
        alignItems: 'flex-start'
    },
    questionBottomMargin: {
        height: 10,
        width: '100%'
    }
}
class LevelUpQuestionItem extends Component{
    constructor(props){
        super(props);      
    }
    render(){
        this.radio_props = this.props.options.map(
            (value, index)=>{
                return {label: value, value: 0 }
            }
        );

        return (
            <View style={styles.questionMargin}>
              <View style={styles.questionBorder}> 
              <Text textAlign={'justify'}>{this.props.question}</Text>
              <View style={styles.questionBottomMargin}/>
              {
              <RadioForm
                style={{ alignItems: 'flex-start' }}
                radio_props={this.radio_props}
                initial={-1}
                buttonSize={10}
                buttonOuterSize={15}
                onPress={(value) => {this.setState({value:value})}}
                />
              }
              </View>
            </View>
        )
    }

}
  
export default LevelUpQuestionItem;