import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ScorePerspectiveSelector from '../utilities/ScorePerspectiveSelector';

const grayBackground = '#F1F1F1';
const styles = {
    page: {
        display: 'flex',
        flex: 3
    },
    scorePerspective: {
        flex: 1,
        backgroundColor: grayBackground
    },
    scoreDescription: {
        flex: 2,
        padding: 10,
        backgroundColor: 'white'
    },
    textTitle: {
       fontWeight: 'bold'
    },
    textContent: {

    }
}
class WarmUpScore extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={styles.page}>
                <View style={styles.scorePerspective}>
                <ScorePerspectiveSelector />
                </View>
                <View style={styles.scoreDescription}>
                <Text style={styles.textTitle}>
                    文章標題
                </Text>
                <Text></Text>
                <Text>
                    文章內容
                </Text>
                </View>
            </View>
        )
    }
}

export default WarmUpScore;