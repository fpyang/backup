
import React, { Component } from 'react';
import { View, Text } from 'react-native';

const styles = {
    item : {
        height: 100,
        width: '100%',
        backgroundColor: 'white',
        margin: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    itemHeader:{
        height: 100,
        width: '60%',
        backgroundColor: 'white',
        margin: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    rankIcon: {
        width: 70,
        height: 70,
        margin: 10,
        backgroundColor: 'white',
        borderWidth: 5,
        borderColor: 'blue',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rankNum: {
        fontSize: 30
    },
    name: {
        height: 70,
        width: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: 'white'
    },
    nameFont: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    schoolFont: {
        color: 'gray'
    },
    labels:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-end'
    },
    labelsFont:{
        fontSize: 12,
        fontWeight: 'bold'
    },
    ratios: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    ratiosFont: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    statistics:{
        display: 'flex',
        flexDirection: 'row',
        width: '36%',
        height: 70,
        backgroundColor: 'white'
    },
    rank1Color:{
        color: '#2D82C6'
    },
    rank2Color:{
        color: '#F3B644'
    },
    rank3Color:{
        color: '#2DC67A'
    },
    rankNColor:{
        color: 'gray'
    },
    rank1BColor:{
        borderColor: '#2D82C6'
    },
    rank2BColor:{
        borderColor: '#F3B644'
    },
    rank3BColor:{
        borderColor: '#2DC67A'
    },
    rankNBColor:{
        borderColor: 'gray'
    }
}
class LevelUpRankingItem extends Component{
    constructor(props){
        super(props);
        this.getColorByRank = this.getColorByRank.bind(this);
        this.getBorderColorByRank = this.getBorderColorByRank.bind(this);
    }
    getColorByRank(rank){
        if(rank == 1){
            return styles.rank1Color;
        }
        if(rank == 2){
            return styles.rank2Color;
        }
        if(rank == 3){
            return styles.rank3Color;
        }
        if(rank > 3){
            return styles.rankNColor;
        }

    }
    getBorderColorByRank(rank){
        if(rank == 1){
            return styles.rank1BColor;
        }
        if(rank == 2){
            return styles.rank2BColor;
        }
        if(rank == 3){
            return styles.rank3BColor;
        }
        if(rank > 3){
            return styles.rankNBColor;
        }

    }
    render(){
        return (
        <View style={styles.item}> 
            <View style={styles.itemHeader}>
            <View style={[styles.rankIcon, this.getBorderColorByRank(this.props.rank)]}>
              <Text style={[styles.rankNum, this.getColorByRank(this.props.rank)]}>{this.props.rank}</Text>
            </View>
            <View style={styles.name}>
                <Text style={styles.nameFont}>{this.props.name}</Text>
                <Text style={styles.schoolFont}>{this.props.school}</Text>
            </View>
            </View>
            <View style={styles.statistics}>
                <View style={styles.labels}>
                <Text style={styles.labelsFont}>  作答題數  </Text>
                <Text style={styles.labelsFont}>  答對率  </Text>
                </View>
                <View style={styles.ratios}>
                <Text style={styles.ratiosFont}>{this.props.answerNumber}</Text>
                <Text style={styles.ratiosFont}>{this.props.correctRatio}％</Text>
                </View>
            </View>
        </View>
        )
    }

}
  
export default LevelUpRankingItem;
