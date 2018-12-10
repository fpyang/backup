import React, { Component } from 'react';
import { View, Text, TouchableOpacity, WebView, PixelRatio } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { selectLevel } from '../../../../actions/index';

//#2D82C6
const styles = {
    content: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    item: {
        height: 106,// / PixelRatio.get(),
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        padding: 8,// / PixelRatio.get(),
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 1,// / PixelRatio.get(),
        marginBottom: 1,// / PixelRatio.get(),
    },
    itemIcon: {
        width: 60,
        height: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemIconGreatColor: {
        backgroundColor: '#2D82C6'
    },
    itemIconNormalColor: {
        backgroundColor: 'red'
    },
    itemTitleBox: {
        display: 'flex',
        height: '80%',
        padding: 8,
        flex: 1,
        backgroundColor: 'white'
    },
    itemTitle: {
        fontSize: 18
    },
    itemTitleView: {
        height: '50%',
        width: '100%'
    },
    itemTitleMetadata: {
        height: '50%',
        width: '100%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    itemTitleMetadataDate: {
        color: 'gray'
    },
    itemTitleMetadataView: {
        color: 'gray'
    },
    percentage: {
        color: 'white',
        fontSize: 16
    },
    percentageText: {
        color: 'white',
        fontSize: 10
    }
}
class LevelUpItem extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let content = (
                <View style={styles.itemTitleBox}>
                  <View style={styles.itemTitleView} >
                    <Text style={styles.itemTitle}>挑戰AI極限 Google要玩什麼</Text> 
                  </View>
                  <View style={styles.itemTitleMetadata} >
                    <Text style={styles.itemTitleMetadataDate}>2018/05/06.國際力</Text>
                    <Text style={styles.itemTitleMetadataView}>
                    <Icon name='eye' size={14} color='gray' />110</Text>
                  </View>
                </View>);
        if(this.props.title){
            content = (
                <View style={styles.itemTitleBox}>
                <View style={styles.itemTitleView} >
                  <Text style={styles.itemTitle}>{this.props.title}</Text> 
                </View>
                <View style={styles.itemTitleMetadata} >
                  <Text style={styles.itemTitleMetadataDate}>2018/05/06.國際力</Text>
                  <Text style={styles.itemTitleMetadataView}>
                  <Icon name='eye' size={14} color='gray' />110</Text>
                </View>
              </View>);
        }
        return(
        <TouchableOpacity 
          onPress={
              ()=>{
              this.props.navigation.navigate('LevelUpAnsweredQuestion', { 
                  title: this.props.title, 
                  back: this.props.back,
                  pageUrl: this.props.pageUrl
                })
              }
            }
        >
        <View style={styles.item}>
            <View style={[styles.itemIcon, styles.itemIconGreatColor]}>
            <Text style={styles.percentage}>100%</Text>
            <View style={{height: '10%'}}></View>
            <Text style={styles.percentageText}>答對率</Text>
            </View>
            { content }
            <Icon name='angle-right' size={30} color='gray' />
        </View>
        </TouchableOpacity>
        );
    }
}
function mapDispatchToProps(dispatch) {

    return bindActionCreators({ selectLevel }, dispatch);
  }
  
  
function mapStateToProps(state) {
    return {
        selectedLevel: state.awardLevel
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(LevelUpItem);

  