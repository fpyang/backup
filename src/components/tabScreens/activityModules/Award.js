import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TitleBar from '../tabDecorators/TitleBar';
import LevelSelector from './utilities/LevelSelector';
import WinnerListItem from './utilities/WinnerListItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectLevel } from '../../../actions/index';

const grayBackground = '#F1F1F1';
const styles = {
    content: {
        flex: 1,
        backgroundColor: grayBackground
    },
    levels: {
        flex: 1.2,
        backgroundColor: grayBackground
    },
    regions: {
        flex: 4,
        backgroundColor: '#F1F1F1'
    }
}
class Award extends Component{
    constructor(props){
        super(props);
    }
    render(){
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

        ]
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
                <View style={styles.regions}>                
                    { 
                      configObjs[Number(this.props.selectedLevel.awardLevel)-1].map(
                          (configObj, index)=>{
                              return (<WinnerListItem {...this.props} {...configObj} key={index}/>);
                          }
                      )
                    }
                </View>
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

  