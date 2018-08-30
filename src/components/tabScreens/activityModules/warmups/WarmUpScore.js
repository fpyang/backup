import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import ScorePerspectiveSelector from '../utilities/ScorePerspectiveSelector';
import { connect } from 'react-redux';

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
        padding: 0,
        backgroundColor: 'white'
    },
    textTitle: {
       fontWeight: 'bold'
    },
    textContent: {

    },
    sepLine: {
        height: 15,
        width: '100%',
        backgroundColor: '#F1F1F1',
        marginTop: 6,
        marginBottom: 6
    },
    descLine: {
        height: 38,
        width: '100%',
        backgroundColor: '#F1F1F1',
        justifyContent: 'center',
        marginTop: 0,
        marginBottom: 8
    },
    descLineText: {
        color: 'gray'
    },
    titleFont: {
        fontSize: 16,
        color: 'black'
    },
    scoreTextArea: {
        padding: 8
    }
}
class WarmUpScore extends Component{
    constructor(props){
        super(props);
        this.renderOverview = this.renderOverview.bind(this);
        this.renderMaterial = this.renderMaterial.bind(this);
        this.renderStructure = this.renderStructure.bind(this);
        this.renderSentenance = this.renderSentenance.bind(this);
        this.renderTypo = this.renderTypo.bind(this);
        this.renderScoreDescription = this.renderScoreDescription.bind(this);
    }
    renderOverview(){
        return(<View style={styles.scoreDescription}>
            <View style={styles.descLine} />
            <ScrollView>
            <Text style={styles.textTitle}>
                 {'\n'}
            </Text>
            <Text style={styles.titleFont}>題目: {this.props.writingContext.title}</Text>
            <Text>
                {'\n'}
            </Text>
            <Text>{this.props.writingContext.content}</Text>
            </ScrollView>
            </View>);
    }
    renderScoreDescription(){
        return(<View style={styles.scoreDescription}>
            <ScrollView>
            <View style={styles.descLine}><Text style={styles.descLineText}>{'  評分結果'}</Text></View>
            <View style={styles.scoreTextArea}>
            {(this.props.selectedLevel==2)&&<Text>{this.props.writingContext.score.F1C}</Text>}
            {(this.props.selectedLevel==3)&&<Text>{this.props.writingContext.score.F2C}</Text>}
            {(this.props.selectedLevel==4)&&<Text>{this.props.writingContext.score.F3C}</Text>}
            {(this.props.selectedLevel==5)&&<Text>{this.props.writingContext.score.F4C}</Text>}
            </View>
            <View style={styles.sepLine} />
            <View style={styles.scoreTextArea}>
            <Text style={styles.textTitle}>
                {'\n'}
            </Text>
            <Text style={styles.titleFont}>{this.props.writingContext.title}</Text>
            <Text>
                {'\n'}
            </Text>
            <Text>{this.props.writingContext.content}</Text>
            </View>
            </ScrollView>
            </View>);
    }
    renderMaterial(){

    }
    renderStructure(){

    }
    renderSentenance(){

    }
    renderTypo(){

    }
    render(){
        return(
            <View style={styles.page}>
                <View style={styles.scorePerspective}>
                <ScorePerspectiveSelector score={this.props.score}/>
                </View>
                {(this.props.selectedLevel==1)&&this.renderOverview()}
                {(this.props.selectedLevel!=1)&&this.renderScoreDescription()}
            </View>
        )
    }
}

function mapStateToProps(state) {

    return {
        selectedLevel: state.awardLevel.awardLevel,
        writingContext: state.writingContext.context
    }
}
  
export default connect(mapStateToProps)(WarmUpScore);