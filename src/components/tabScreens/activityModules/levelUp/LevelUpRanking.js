import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { setLevelUpHamburgerState } from '../../../../actions/index';
import LevelUpRankingItem from './LevelUpRankingItem';


class LevelUpRanking extends Component{
    constructor(props){
        super(props);
        this.getRankingList = this.getRankingList.bind(this);
    }
    getRankingList(){
        let mock = [
            {
                name: '張三',
                school: '板橋國小',
                answerNumber: 20,
                correctRatio: 90
            },
            {
                name: '李四',
                school: '新埔國小',
                answerNumber: 20,
                correctRatio: 80
            },
            {
                name: '王五',
                school: '江翠國小',
                answerNumber: 20,
                correctRatio: 70
            },
            {
                name: '吳六',
                school: '龍山寺國小',
                answerNumber: 20,
                correctRatio: 60
            },
            {
                name: '柯七',
                school: '市政府國小',
                answerNumber: 20,
                correctRatio: 50
            },
            {
                name: '余八',
                school: '大湖國小',
                answerNumber: 20,
                correctRatio: 40
            }
            
        ];
        return mock;
    }
    render(){
        return (
        <View> 
        {this.getRankingList().map(
            function(value, index){
                return (<LevelUpRankingItem {...value} key={index} rank={index+1} />)
            }
        )}    
        </View>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(LevelUpRanking);
