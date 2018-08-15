import React, { Component } from 'react';
import { View, Text, WebView, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectLevel } from '../../../actions/index';

import TitleBar from '../tabDecorators/TitleBar';

const styles = {
    content: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    itemStyle: {
        display: 'flex',
        width: '100%',
        height: 90,
        flexDirection: 'column',
        margin: 1

    },
    sectionTitle: {
        width: '100%',
        height: 43,
        paddingLeft: 10,
        justifyContent: 'center',
        backgroundColor: '#f1f1f1'
    },
    sectionContent: {
        width: '100%',
        height: 43,
        paddingLeft: 10,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    sectionPs: {
        width: Dimensions.get('window').width - 20,
        height: 'auto',
        margin: 10,
        backgroundColor: '#f1f1f1'
    },
    sectionBottom: {
        width: '100%',
        height: 25,
        margin: 10,
        backgroundColor: '#f1f1f1'
    }
}
class DataList extends Component{
    constructor(props){
        super(props);
        this.getData = this.getData.bind(this);
    }
    /*
    Currently, uCampus only deal with two types of target, i.e.
     1 Grade
     2 Admission.
     For eacy type of target, we request corresponding JSON data source
    */

    getData(targetType){
        switch(targetType){
            case 'Grade':
                return {
                    final: {
                    data: [
                        {title: '姓名', data: '菜應紋'},
                        {title: '參賽組別', data: '國中七年級組'},
                        {title: '入場證號碼', data: '7777777'},
                        {title: '成績', data: '5級分'},
                        {title: '名次', data: '感動類優選'},
                        {title: '就讀學校', data: '台北市中山國中'}
                ],
                    ps: '備註: \n全國總決賽頒獎典禮 \n日期: 106年1月22日(日)'
                },
                tryout: {
                    data: [
                        {title: '姓名', data: '菜應紋'},
                        {title: '參賽組別', data: '國中七年級組'},
                        {title: '入場證號碼', data: '7777777'},
                        {title: '成績', data: '6級分'},
                        {title: '名次', data: '第一名'},
                        {title: '就讀學校', data: '台北市中山國中'}
                ],
                    ps: '備註: \n全國總決賽頒獎典禮 \n日期: 106年1月22日(日)'
                }
            };
            case 'Admission':
                return {
                    final: {
                    data: [
                        {title: '姓名', data: '菜應紋'},
                        {title: '參賽組別', data: '國中七年級組'},
                        {title: '入場證號碼', data: '6666666'},
                        {title: '考場', data: '海山國中'},
                        {title: '應考教室', data: '607教室'},
                        {title: '考試時間', data: '10:00~11:00'}],
                    ps: '比賽開始後15分鐘不得入場；不得提前交卷，待監考人員統一收卷後再行離開。資格不符者一律不予計分。'
                },
                tryout: {
                    data: [
                        {title: '姓名', data: '菜應紋'},
                        {title: '參賽組別', data: '國中七年級組'},
                        {title: '入場證號碼', data: '7777777'},
                        {title: '考場', data: '南山中學'},
                        {title: '應考教室', data: '705教室'},
                        {title: '考試時間', data: '10:00~11:00'}],
                    ps: '比賽開始後15分鐘不得入場；不得提前交卷，待監考人員統一收卷後再行離開。資格不符者一律不予計分。'
                }
            };
            default:
                return [

                ];
        }
    }
    render(){
        //console.log(this.props.navigation.state.params.pageUrl);
        return(
        <ScrollView >
            <View style={styles.content}>
              {
                 this.getData(this.props.navigation.state.params.target)[this.props.stage.tryoutOrFinal].data.map(
                     (value, index)=>{
                         return(
                            <View style={styles.itemStyle} key={index}>
                                <View style={styles.sectionTitle}><Text>{value.title}</Text></View>
                                <View style={styles.sectionContent}><Text>{value.data}</Text></View>
                            </View>
                         );
                     }
                 )
             } 
             <View style={styles.sectionPs}><Text>
             {this.getData(this.props.navigation.state.params.target).ps}
             </Text></View>
             <View style={styles.sectionBottom}></View>
            </View>
        </ScrollView>);
    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({ selectLevel }, dispatch);
  }
  
  
function mapStateToProps(state) {
    return {
        selectedLevel: state.awardLevel,
        stage: state.stage
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(DataList);
