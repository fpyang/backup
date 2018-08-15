import React, { Component } from 'react';
import { View, Text } from 'react-native';
import SubjectItem from './utilities/SubjectItem';

const styles = {
    selectQuestion: {
        width: '100%',
        height: 35,
        justifyContent: 'center',
        marginLeft: 5
    },
    selectQuestionTitle: {
        color: 'gray'
    }
}
class WarmUp extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let config = {
            title: 'google', 
            back: 'WarmUp',
            questionTitle: '當一天的老師',
            questionPrompt: '寫作小幫手: \n\n求學至今，你遇過許多不同的老師，如果請你當一天的老師，你會做些什麼？是在家政課上，安排學生服裝表演？還是帶領學生進行戶外教學？或者整天都面帶微笑，不責備學生？……請寫出你的想法與做法。',
            pageUrl: 'https://www.google.com'
        };
        let config2 = {
            title: 'google2', 
            back: 'WarmUp',
            questionTitle: '當一天的老師2',
            questionPrompt: '寫作小幫手2: \n\n求學至今，你遇過許多不同的老師，如果請你當一天的老師，你會做些什麼？是在家政課上，安排學生服裝表演？還是帶領學生進行戶外教學？或者整天都面帶微笑，不責備學生？……請寫出你的想法與做法。',
            pageUrl: 'https://www.google.com'
        }
        let config3 = {
            title: 'google3', 
            back: 'WarmUp',
            questionTitle: '當一天的老師3',
            questionPrompt: '寫作小幫手3: \n\n求學至今，你遇過許多不同的老師，如果請你當一天的老師，你會做些什麼？是在家政課上，安排學生服裝表演？還是帶領學生進行戶外教學？或者整天都面帶微笑，不責備學生？……請寫出你的想法與做法。',
            pageUrl: 'https://www.google.com'
        }
        return(
            <View>
                <View style={styles.selectQuestion}>
                <Text style={styles.selectQuestionTitle}> 選擇題目</Text>
                </View>
                <SubjectItem {...this.props} {...config}/>
                <SubjectItem {...this.props} {...config2}/>
                <SubjectItem {...this.props} {...config3}/>
            </View>
        )
    }
}

export default WarmUp;