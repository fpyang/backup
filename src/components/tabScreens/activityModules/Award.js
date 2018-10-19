import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import TitleBar from '../tabDecorators/TitleBar';
import LevelSelector from './utilities/LevelSelector';
import WinnerListItem from './utilities/WinnerListItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectLevel } from '../../../actions/index';
const { height } = Dimensions.get('window');
const grayBackground = '#F1F1F1';
const styles = {
    content: {
        flex: 1,
        backgroundColor: grayBackground
    },
    levels: {
        height: 0.25*height,
        backgroundColor: grayBackground
    },
    regions: {
        height: 0.75*height,
        backgroundColor: '#F1F1F1'
    }
}
class Award extends Component{
    constructor(props){
        super(props);
        this.state = {
            configObjs: null,
            loading: true
        }
    }
    componentWillMount(){

        fetch(('https://ucampus-89e65.firebaseapp.com/static/json/award.json'), {
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
    render(){
        /*
        let configObjs=[
            [
                {
                title: '北區',
                back: 'Award',
                itemTitle: '北區'
                },
                {
                    title: '中區',
                    back: 'Award',
                    itemTitle: '中區'
                },
                {
                    title: '南區',
                    back: 'Award',
                    itemTitle: '南區'
                },
                {
                    title: '東區',
                    back: 'Award',
                    itemTitle: '東區'
                },
                {
                    title: '離島',
                    back: 'Award',
                    itemTitle: '離島'
                }
            ],
            [
                {
                title: '北區',
                back: 'Award',
                itemTitle: '北區'
                },
                {
                    title: '中區',
                    back: 'Award',
                    itemTitle: '中區'
                },
                {
                    title: '南區',
                    back: 'Award',
                    itemTitle: '南區'
                },
                {
                    title: '東區',
                    back: 'Award',
                    itemTitle: '東區'
                }
            ],
            [
                {
                title: '北區',
                back: 'Award',
                itemTitle: '北區'
                },
                {
                    title: '中區',
                    back: 'Award',
                    itemTitle: '中區'
                },
                {
                    title: '南區',
                    back: 'Award',
                    itemTitle: '南區'
                },
                {
                    title: '東區',
                    back: 'Award',
                    itemTitle: '東區'
                }
            ],
            [
                {
                title: '北區',
                back: 'Award',
                itemTitle: '北區'
                },
                {
                    title: '中區',
                    back: 'Award',
                    itemTitle: '中區'
                },
                {
                    title: '南區',
                    back: 'Award',
                    itemTitle: '南區'
                },
                {
                    title: '東區',
                    back: 'Award',
                    itemTitle: '東區'
                }
            ],
            [
                {
                title: '北區',
                back: 'Award',
                itemTitle: '北區'
                },
                {
                    title: '中區',
                    back: 'Award',
                    itemTitle: '中區'
                },
                {
                    title: '南區',
                    back: 'Award',
                    itemTitle: '南區'
                },
                {
                    title: '東區',
                    back: 'Award',
                    itemTitle: '東區'
                }
            ],
            [
                {
                title: '北區',
                back: 'Award',
                itemTitle: '北區'
                },
                {
                    title: '中區',
                    back: 'Award',
                    itemTitle: '中區'
                },
                {
                    title: '南區',
                    back: 'Award',
                    itemTitle: '南區'
                },
                {
                    title: '東區',
                    back: 'Award',
                    itemTitle: '東區'
                }
            ]

        ]*/
        if("awardLevel" in this.props.selectedLevel){
            //pass
        }else{
            
        }
        /*
        Using Spread Operator to propogate this.props to child component
        (We need this.props.navigate to operate stackNavigator)
        */
        return(
        <View style={{flex: 1}}>
            <View style={styles.content}>
                <View style={styles.levels}>
                  <LevelSelector />
                </View>
                <ScrollView style={styles.regions}>                
                    { (this.state.configObjs)?
                      this.state.configObjs[Number(this.props.selectedLevel.awardLevel)-1].map(
                          (configObj, index)=>{
                              return (<WinnerListItem {...this.props} {...configObj} key={index}/>);
                          }
                      ):<Text>loading</Text>
                    }
                </ScrollView>
            </View>
        </View>);
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(Award);

  