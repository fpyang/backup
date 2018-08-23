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
        this.state = {
            titles: [],
            loading: true
        }
    }
    componentWillMount(){
        fetch(('http://140.122.63.113/aces/titles.ashx'), {
            method: 'GET'}).then((response) => {
              if (response.status === 200) {
      
                response.json().then(json => {
                                      this.setState(Object.assign({}, this.state, {'titles': json}), 
                                      ()=>{this.setState({loading: false})});
                                    });
              } else {
                //console.log(response.status);
              }
            })
            .catch((error) => {
              //console.log(error);
            });
    }
    render(){
        /*
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
        }*/
        /*
                <SubjectItem {...this.props} {...config}/>
                <SubjectItem {...this.props} {...config2}/>
                <SubjectItem {...this.props} {...config3}/>
        */
        return(
            <View>
                <View style={styles.selectQuestion}>
                <Text style={styles.selectQuestionTitle}> 選擇題目</Text>
                </View>

                {(this.state.loading) && <View style={{marginTop: 100,alignSelf: 'center'}}><Text>載入題目中...</Text></View>}
                
                {this.state.titles.map((value, index)=>{
                   let config = {
                    title: value.title, 
                    back: 'WarmUp',
                    questionTitle: value.title,
                    questionPrompt: value.hint,
                    pageUrl: 'https://www.google.com'
                    }
                   return (<SubjectItem {...this.props} {...config}/>);

                })}
            </View>
        )
    }
}

export default WarmUp;