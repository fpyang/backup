import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, PixelRatio } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { selectLevel } from '../../../../actions/index';
/*
  props: winnerListHight
*/
class WinnerListContainer extends Component{
    constructor(props){
        super(props);
        this.getWinnerList = this.getWinnerList.bind(this);
        this.getShortWinnerList = this.getShortWinnerList.bind(this);
        this.getComposedWinnerList = this.getComposedWinnerList.bind(this);
        this.getWinnerListByContext = this.getWinnerListByContext.bind(this);
        this.styles = {
            winnerList: {
                height: this.props.winnerListHight,
                width: '100%',
                backgroundColor: 'white'
            },
            item: {
                display: 'flex',
                width: '100%',
                height: 30,
                flex: 3,
                flexDirection: 'row',
            },
            itemField: {
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            },
            header: {
                display: 'flex',
                width: '100%',
                height: 40,
                flexDirection: 'row',
                backgroundColor: '#f1f1f1',
                borderBottomColor: '#cccccc',
                borderBottomWidth: 1,
                borderTopColor: '#cccccc',
                borderTopWidth: 0,
            },
            headerWord: {
                color: '#2D82C6'
            },
            configObjs: {},
            loading: true
        }
    }

    componentWillMount(){

        fetch(('https://ucampus-89e65.firebaseapp.com/static/json/winnerList.json'), {
            method: 'GET'}).then((response) => {
              if (response.status === 200) {
                response.json().then(json => {
                                      this.setState(Object.assign({}, this.state, {'configObjs': json, 'loading': false}));
                                    });
              } else {
                //console.log(response.status);
              }
            })
            .catch((error) => {
              //console.log(error);
            });
    }
    //this.props.navigation.state.params.itemTitle
    //this.props.selectedLevel.awardLevel
    getWinnerListByContext(){
        if(this.props.context == 'final'){
            return this.getComposedWinnerList().final[Number(this.props.selectedLevel.awardLevel)-1];
        }else{
            if(this.getComposedWinnerList().tryout[Number(this.props.selectedLevel.awardLevel)-1][this.props.navigation.state.params.itemTitle]){
                return this.getComposedWinnerList().tryout[Number(this.props.selectedLevel.awardLevel)-1][this.props.navigation.state.params.itemTitle];    
            }else{
                return this.getWinnerList();
            }
            }
    }

    getComposedWinnerList(){

        return(
            {
                final: [
                    this.getWinnerList(),
                    this.getWinnerList(),
                    this.getWinnerList(),
                    this.getWinnerList(),
                    this.getWinnerList(),
                    this.getShortWinnerList()
                ],
                tryout: [
                    {
                        '北區': this.getShortWinnerList(),
                        '中區': this.getWinnerList(),
                        '南區': this.getShortWinnerList(),
                        '東區': this.getWinnerList(),
                        '離島1': this.getShortWinnerList()
                    },
                    {
                        '北區': this.getShortWinnerList(),
                        '中區': this.getWinnerList(),
                        '南區': this.getShortWinnerList(),
                        '東區2': this.getWinnerList()
                    },
                    {
                        '北區': this.getShortWinnerList(),
                        '中區': this.getWinnerList(),
                        '南區3': this.getShortWinnerList(),
                        '東區': this.getShortWinnerList()
                    },
                    {
                        '北區4': this.getShortWinnerList(),
                        '中區': this.getWinnerList(),
                        '南區': this.getShortWinnerList(),
                        '東區': this.getWinnerList()
                    },
                    {
                        '北區': this.getShortWinnerList(),
                        '中區': this.getShortWinnerList(),
                        '南區': this.getShortWinnerList(),
                        '東區5': this.getShortWinnerList() 
                    },
                    {
                        '北區': this.getWinnerList(),
                        '中區': this.getWinnerList(),
                        '南區6': this.getWinnerList(),
                        '東區': this.getWinnerList()  
                    }

                ]
            }
        );

    }
    getShortWinnerList(){
        return([
            {
                name: '張允盛',
                school: '市立民族國小',
                rank: '第一名'       
            },
            {
                name: '呂容禎',
                school: '正義國小',
                rank: '第二名'  
            },
            {
                name: '張允盛',
                school: '市立民族國小',
                rank: '第一名'       
            },
            {
                name: '呂容禎',
                school: '正義國小',
                rank: '第二名'  
            }]);
        }
    getWinnerList(){
        return([
            {
                name: '張允盛',
                school: '市立民族國小',
                rank: '第一名'       
            },
            {
                name: '呂容禎',
                school: '正義國小',
                rank: '第二名'  
            },
            {
                name: '張允盛',
                school: '市立民族國小',
                rank: '第一名'       
            },
            {
                name: '呂容禎',
                school: '正義國小',
                rank: '第二名'  
            },
            {
                name: '張允盛',
                school: '市立民族國小',
                rank: '第一名'       
            },
            {
                name: '呂容禎',
                school: '正義國小',
                rank: '第二名'  
            },
            {
                name: '張允盛',
                school: '市立民族國小',
                rank: '第一名'       
            },
            {
                name: '呂容禎',
                school: '正義國小',
                rank: '第二名'  
            },
            {
                name: '張允盛',
                school: '市立民族國小',
                rank: '第一名'       
            },
            {
                name: '呂容禎',
                school: '正義國小',
                rank: '第二名'  
            },
            {
                name: '張允盛',
                school: '市立民族國小',
                rank: '第一名'       
            },
            {
                name: '呂容禎',
                school: '正義國小',
                rank: '第二名'  
            },
            {
                name: '張允盛',
                school: '市立民族國小',
                rank: '第一名'       
            },
            {
                name: '呂容禎',
                school: '正義國小',
                rank: '第二名'  
            },
            {
                name: '張允盛',
                school: '市立民族國小',
                rank: '第一名'       
            },
            {
                name: '呂容禎',
                school: '正義國小',
                rank: '第二名'  
            },
            {
                name: '張允盛',
                school: '市立民族國小',
                rank: '第一名'       
            },
            {
                name: '呂容禎',
                school: '正義國小',
                rank: '第二名'  
            },
            {
                name: '張允盛',
                school: '市立民族國小',
                rank: '第一名'       
            },
            {
                name: '呂容禎',
                school: '正義國小',
                rank: '第二名'  
            },
            {
                name: '張允盛',
                school: '市立民族國小',
                rank: '第一名'       
            },
            {
                name: '呂容禎',
                school: '正義國小',
                rank: '第二名'  
            },
            {
                name: '張允盛',
                school: '市立民族國小',
                rank: '第一名'       
            },
            {
                name: '呂容禎',
                school: '正義國小',
                rank: '第二名'  
            },
            {
                name: '張允盛',
                school: '市立民族國小',
                rank: '第一名'       
            },
            {
                name: '呂容禎',
                school: '正義國小',
                rank: '第二名'  
            },
            {
                name: '張允盛',
                school: '市立民族國小',
                rank: '第一名'       
            },
            {
                name: '呂容禎',
                school: '正義國小',
                rank: '第二名'  
            },
            {
                name: '張允盛',
                school: '市立民族國小',
                rank: '第一名'       
            },
            {
                name: '呂容禎',
                school: '正義國小',
                rank: '第二名'  
            },
            {
                name: '張允盛',
                school: '市立民族國小',
                rank: '第一名'       
            },
            {
                name: '呂容禎',
                school: '正義國小',
                rank: '第二名'  
            },
            {
                name: '張允盛',
                school: '市立民族國小',
                rank: '第一名'       
            },
            {
                name: '呂容禎',
                school: '正義國小',
                rank: '第二名'  
            },
            {
                name: '張允盛',
                school: '市立民族國小',
                rank: '第一名'       
            },
            {
                name: '呂容禎',
                school: '正義國小',
                rank: '第二名'  
            },
            {
                name: '張允盛',
                school: '市立民族國小',
                rank: '第一名'       
            },
            {
                name: '呂容禎',
                school: '正義國小',
                rank: '第二名'  
            },
            {
                name: '張允盛',
                school: '市立民族國小',
                rank: '第一名'       
            },
            {
                name: '呂容禎',
                school: '正義國小',
                rank: '第二名'  
            },
            {
                name: '張允盛',
                school: '市立民族國小',
                rank: '第一名'       
            },
            {
                name: '呂容禎',
                school: '正義國小',
                rank: '第二名'  
            },
            {
                name: '張允盛',
                school: '市立民族國小',
                rank: '第一名'       
            },
            {
                name: '呂容禎',
                school: '正義國小',
                rank: '第二名'  
            },
            {
                name: '張允盛',
                school: '市立民族國小',
                rank: '第一名'       
            },
            {
                name: '呂容禎',
                school: '正義國小',
                rank: '第二名'  
            },
            {
                name: '張允盛',
                school: '市立民族國小',
                rank: '第一名'       
            },
            {
                name: '呂容禎',
                school: '正義國小',
                rank: '第二名'  
            },
            {
                name: '張允盛',
                school: '市立民族國小',
                rank: '第一名'       
            },
            {
                name: '呂容禎',
                school: '正義國小',
                rank: '第二名'  
            },
            {
                name: '張允盛',
                school: '市立民族國小',
                rank: '第一名'       
            },
            {
                name: '呂容禎',
                school: '正義國小',
                rank: '第二名'  
            },
            {
                name: '張允盛',
                school: '市立民族國小',
                rank: '第一名'       
            },
            {
                name: '呂容禎',
                school: '正義國小',
                rank: '佳作'  
            },
            {
                name: '張允盛',
                school: '市立民族國小',
                rank: '佳作'       
            },
            {
                name: '呂容禎',
                school: '正義國小',
                rank: '佳作'  
            },
            {
                name: '張允盛',
                school: '市立民族國小',
                rank: '佳作'       
            },
            {
                name: '呂容禎',
                school: '正義國小',
                rank: '佳作'  
            },
            {
                name: '張允盛',
                school: '市立民族國小',
                rank: '佳作'       
            },
            {
                name: '李大福',
                school: this.props.selectedLevel.awardLevel,
                rank: this.props.context  
            }
    ]);
    }
    //this.getWinnerListByContext(this.props.awardLevel, this.props.region)
    //this.props.context, this.props.selectedLevel.awardLevel
    render(){
        return(
            <View style={this.styles.winnerList}>
            <View style={this.styles.header}>
                    <View style={this.styles.itemField}>
                        <Text style={this.styles.headerWord}>姓名</Text>
                    </View>
                    <View style={this.styles.itemField}>
                        <Text style={this.styles.headerWord}>所屬學校</Text>
                    </View>
                    <View style={this.styles.itemField}>
                        <Text style={this.styles.headerWord}>名次</Text>
                    </View>
               </View><View style={{height: 5}}></View>
            <ScrollView style={this.styles.winnerList}>
               {
                   this.getWinnerListByContext().map(
                       (winner, index)=>{
                           return(
                               <View style={this.styles.item} key={index}>
                               <View style={this.styles.itemField}>
                                   <Text>{winner.name}</Text>
                               </View>
                               <View style={this.styles.itemField}>
                                   <Text>{winner.school}</Text>
                               </View>
                               <View style={this.styles.itemField}>
                                   <Text>{winner.rank}</Text>
                               </View>
                               </View>
                           );
                       }
                   )
               }
            <View style={{height: 80}}></View>
            </ScrollView>
            </View>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(WinnerListContainer);