import React, { Component } from 'react';
import { View, Text, Dimensions, Button, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import TitleBar from './tabDecorators/TitleBar';
/*
import About from './activityModules/About';
import Admission from './activityModules/Admission';
import Award from './activityModules/Award';
import Books from './activityModules/Books';
import Grade from './headerLeftactivityModules/Grade';
import Guess from './activityModules/Guess';
import QA from './activityModules/QA';
import Region from './activityModules/Region';
import Review from './activityModules/Review';
*/
//import {Grade} from './activityModules/Grade';
import { Stars } from './activityModules';
import LevelUp from './activityModules/LevelUp';
import DataList from './activityModules/DataList';
import ClassRoom from './activityModules/ClassRoom';
import Poll from './activityModules/Poll';
import WarmUp from './activityModules/WarmUp';
import MarkingEssay from './activityModules/MarkingEssay';
import AwardFinal from './activityModules/AwardFinal';
import Review from './activityModules/Review';
import FinalButton from './activityModules/utilities/FinalButton';
import LevelUpHamburger from './activityModules/levelUp/LevelUpHamburger';
import Leaf from './activityModules/Leaf';
import WinnerList from './activityModules/WinnerList';
import NavigationBar from '../NavigationBar';
import LearningScreen from './LearningScreen';

import WarmUpQuestion from './activityModules/warmups/WarmUpQuestion';
import WarmUpCollection from './activityModules/warmups/WarmUpCollection';
import WarmUpTyping from './activityModules/warmups/WarmUpTyping';
import WarmUpScore from './activityModules/warmups/WarmUpScore';
import WarmUpCompleteButton from './activityModules/warmups/WarmUpCompleteButton';

import LevelUpQuestion from './activityModules/levelUp/LevelUpQuestion';
import LevelUpRanking from './activityModules/levelUp/LevelUpRanking';
import LevelUpAnsweredQuestion from './activityModules/levelUp/LevelUpAnsweredQuestion';

import Explaination from './activityModules/Explaination';
import LevelUpReturnButton from './activityModules/levelUp/LevelUpReturnButton';
import ExplainationButton from './activityModules/utilities/ExplainationButton';

const headerFontColor = '#2D82C6';
const styles = {
    headerLeft: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'      
    },
    headerRight: {
        marginRight: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'      
    },
    headerText: {
        fontSize: 18,
        color: headerFontColor
    }
}

let hamburgerState = true;
const LearningStackComponent = StackNavigator({
    LearningScreen: { screen: LearningScreen,
        navigationOptions: {
            headerLeft: <View></View>,
        }
     },
    //寫作新星
    Stars: { screen: Stars,             
        navigationOptions: ({ navigation }) => ({
        tabBarVisible: false,
        headerRight: <View />,
        headerLeft: <TouchableOpacity 
                        onPress={() => navigation.navigate('LearningScreen')}
                        >
                        <View style={styles.headerLeft}>
                            <Icon 
                            name="angle-left" 
                            size={30} 
                            style={{marginRight: 5, marginLeft: 5}}
                            color={headerFontColor}>
                            </Icon>
                            <Text style={styles.headerText}>返回</Text>
                        </View>
                    </TouchableOpacity>,
        headerTitle: 
            <View
            style={{
                flex: 1,
                alignItems: 'center'
            }}
            ><Text
               style={{
                   backgroundColor: 'white',
                   alignSelf: 'center',
                   textAlignVertical: 'center',
                   fontSize: 16, 
                   fontWeight: 'bold'
               }}
               onPress={() => {
                   
               }}> 寫作新星 </Text></View>,
            headerStyle: { 
              height: 50,
              backgroundColor: 'white'
            },
            headerTitleStyle: {
               alignSelf: 'center'
            }
        }) 
    },
    //寫作教室
    ClassRoom: { screen: ClassRoom,                 
        navigationOptions: ({ navigation }) => ({
        tabBarVisible: false,
        headerRight: <View/>,
        headerLeft: <TouchableOpacity 
                        onPress={() => navigation.navigate('LearningScreen')}
                        >
                        <View style={styles.headerLeft}>
                            <Icon 
                            name="angle-left" 
                            size={30} 
                            style={{marginRight: 5, marginLeft: 5}}
                            color={headerFontColor}>
                            </Icon>
                            <Text style={styles.headerText}>返回</Text>
                        </View>
                    </TouchableOpacity>,
        headerTitle: 
            <View
                style={{
                    flex: 1,
                    alignItems: 'center'
                }}
            ><Text
               style={{
                   backgroundColor: 'white',
                   alignSelf: 'center',
                   textAlignVertical: 'center',
                   fontSize: 16, 
                   fontWeight: 'bold'
               }}
               onPress={() => {
                   
               }}> 寫作教室 </Text></View>,
            headerStyle: { 
              height: 50,
              backgroundColor: 'white'
            },
            headerTitleStyle: {
               alignSelf: 'center'
            }
        }) 
    },
    //批改作文
    MarkingEssay: { screen: MarkingEssay,                 
        navigationOptions: ({ navigation }) => ({
        tabBarVisible: false,
        headerRight: <View />,
        headerLeft: <TouchableOpacity 
                        onPress={() => navigation.navigate('LearningScreen')}
                        >
                        <View style={styles.headerLeft}>
                            <Icon 
                            name="angle-left" 
                            size={30} 
                            style={{marginRight: 5, marginLeft: 5}}
                            color={headerFontColor}>
                            </Icon>
                            <Text style={styles.headerText}>返回</Text>
                        </View>
                    </TouchableOpacity>,
        headerTitle: 
        <View
            style={{
                flex: 1,
                alignItems: 'center'
            }}
        ><Text
               style={{
                   backgroundColor: 'white',
                   alignSelf: 'center',
                   textAlignVertical: 'center',
                   fontSize: 16, 
                   fontWeight: 'bold'
               }}
               onPress={() => {
                   
               }}> 批改作文 </Text></View>,
            headerStyle: { 
              height: 50,
              backgroundColor: 'white'
            },
            headerTitleStyle: {
               alignSelf: 'center'
            }
        }) 
    },
    //寫作練習
    WarmUp: { screen: WarmUp,                 
        navigationOptions: ({ navigation }) => ({
        tabBarVisible: false,
        headerRight: <TouchableOpacity 
                        onPress={() => navigation.navigate('WarmUpCollection')}
                        >
                        <View style={styles.headerRight}>
                            <Text style={styles.headerText}>作品集</Text>
                        </View>
                    </TouchableOpacity>,
        headerLeft: <TouchableOpacity 
                        onPress={() => navigation.navigate('LearningScreen')}
                        >
                        <View style={styles.headerLeft}>
                            <Icon 
                            name="angle-left" 
                            size={30} 
                            style={{marginRight: 5, marginLeft: 5}}
                            color={headerFontColor}>
                            </Icon>
                            <Text style={styles.headerText}>返回</Text>
                        </View>
                    </TouchableOpacity>,
        headerTitle: 
        <View
            style={{
                flex: 1,
                alignItems: 'center'
            }}
        ><Text
               style={{
                   backgroundColor: 'white',
                   alignSelf: 'center',
                   textAlignVertical: 'center',
                   fontSize: 16, 
                   fontWeight: 'bold'
               }}
               onPress={() => {
                   
               }}> 寫作練習 </Text></View>,
            headerStyle: { 
              height: 50,
              backgroundColor: 'white'
            },
            headerTitleStyle: {
               alignSelf: 'center'
            }
        }) 
    },
    //閱讀練功房
    LevelUp: { screen: LevelUp,                 
        navigationOptions: ({ navigation }) => ({
        tabBarVisible: false,
        headerRight: <LevelUpHamburger navigation={ navigation }/>,
        headerLeft: <TouchableOpacity 
                        onPress={() => navigation.navigate('LearningScreen')}
                        >
                        <View style={styles.headerLeft}>
                            <Icon 
                            name="angle-left" 
                            size={30} 
                            style={{marginRight: 5, marginLeft: 5}}
                            color={headerFontColor}>
                            </Icon>
                            <Text style={styles.headerText}>返回</Text>
                        </View>
                    </TouchableOpacity>,
        headerTitle: 
        <View
            style={{
                flex: 1,
                alignItems: 'center'
            }}
        ><Text
               style={{
                   backgroundColor: 'white',
                   alignSelf: 'center',
                   textAlignVertical: 'center',
                   fontSize: 16, 
                   fontWeight: 'bold'
               }}
               onPress={() => {
                   
               }}> 閱讀練功房 </Text></View>,
            headerStyle: { 
              height: 50,
              backgroundColor: 'white'
            },
            headerTitleStyle: {
               alignSelf: 'center'
            }
        }) 
    },
    //校園民調
    Poll: { screen: Poll,                 
        navigationOptions: ({ navigation }) => ({
        tabBarVisible: false,
        headerRight: <View />,
        headerLeft: <TouchableOpacity 
                        onPress={() => navigation.navigate('LearningScreen')}
                        >
                        <View style={styles.headerLeft}>
                            <Icon 
                            name="angle-left" 
                            size={30} 
                            style={{marginRight: 5, marginLeft: 5}}
                            color={headerFontColor}>
                            </Icon>
                            <Text style={styles.headerText}>返回</Text>
                        </View>
                    </TouchableOpacity>,
        headerTitle: 
        <View
            style={{
                flex: 1,
                alignItems: 'center'
            }}
        ><Text
               style={{
                   backgroundColor: 'white',
                   alignSelf: 'center',
                   textAlignVertical: 'center',
                   fontSize: 16, 
                   fontWeight: 'bold'
               }}
               onPress={() => {
                   
               }}> 校園民調 </Text></View>,
            headerStyle: { 
              height: 50,
              backgroundColor: 'white'
            },
            headerTitleStyle: {
               alignSelf: 'center'
            }
        }) 
    },
    //寫作練習: 評分
    WarmUpScore: { screen: WarmUpScore,                 
        navigationOptions: ({ navigation }) => ({
        tabBarVisible: false,
        headerRight: <View />,
        headerLeft: <TouchableOpacity 
                        onPress={() => navigation.navigate(navigation.state.params.back)}
                        >
                        <View style={styles.headerLeft}>
                            <Icon 
                            name="angle-left" 
                            size={30} 
                            style={{marginRight: 5, marginLeft: 5}}
                            color={headerFontColor}>
                            </Icon>
                            <Text style={styles.headerText}>返回</Text>
                        </View>
                    </TouchableOpacity>,
        headerTitle: 
        <View
            style={{
                flex: 1,
                alignItems: 'center'
            }}
        ><Text
               style={{
                   backgroundColor: 'white',
                   alignSelf: 'center',
                   textAlignVertical: 'center',
                   fontSize: 16, 
                   fontWeight: 'bold'
               }}
               onPress={() => {
                   
               }}> 評分 </Text></View>,
            headerStyle: { 
              height: 50,
              backgroundColor: 'white'
            },
            headerTitleStyle: {
               alignSelf: 'center'
            }
        }) 
    },
    //寫作練習: 作答
    WarmUpTyping: { screen: WarmUpTyping,                 
        navigationOptions: ({ navigation }) => ({
        tabBarVisible: false,
        headerRight: <WarmUpCompleteButton />,
        headerLeft: <TouchableOpacity 
                        onPress={() => navigation.navigate(navigation.state.params.back)}
                        >
                        <View style={styles.headerLeft}>
                            <Icon 
                            name="angle-left" 
                            size={30} 
                            style={{marginRight: 5, marginLeft: 5}}
                            color={headerFontColor}>
                            </Icon>
                            <Text style={styles.headerText}>返回</Text>
                        </View>
                    </TouchableOpacity>,
        headerTitle: 
        <View
            style={{
                flex: 1,
                alignItems: 'center'
            }}
        ><Text
               style={{
                   backgroundColor: 'white',
                   alignSelf: 'center',
                   textAlignVertical: 'center',
                   fontSize: 16, 
                   fontWeight: 'bold'
               }}
               onPress={() => {
                   
               }}> 寫作練習 </Text></View>,
            headerStyle: { 
              height: 50,
              backgroundColor: 'white'
            },
            headerTitleStyle: {
               alignSelf: 'center'
            }
        }) 
    },
    //寫作練習: 考題
    WarmUpQuestion: { screen: WarmUpQuestion,                 
        navigationOptions: ({ navigation }) => ({
        tabBarVisible: false,
        headerRight: <View />,
        headerLeft: <TouchableOpacity 
                        onPress={() => navigation.navigate('WarmUp')}
                        >
                        <View style={styles.headerLeft}>
                            <Icon 
                            name="angle-left" 
                            size={30} 
                            style={{marginRight: 5, marginLeft: 5}}
                            color={headerFontColor}>
                            </Icon>
                            <Text style={styles.headerText}>返回</Text>
                        </View>
                    </TouchableOpacity>,
        headerTitle: 
        <View
            style={{
                flex: 1,
                alignItems: 'center'
            }}
        ><Text
               style={{
                   backgroundColor: 'white',
                   alignSelf: 'center',
                   textAlignVertical: 'center',
                   fontSize: 16, 
                   fontWeight: 'bold'
               }}
               onPress={() => {
                   
               }}> 寫作練習 </Text></View>,
            headerStyle: { 
              height: 50,
              backgroundColor: 'white'
            },
            headerTitleStyle: {
               alignSelf: 'center'
            }
        }) 
    },
    //考前練功坊: 已經回答過的問題
    LevelUpAnsweredQuestion: { screen: LevelUpAnsweredQuestion,                 
        navigationOptions: ({ navigation }) => ({
        tabBarVisible: false,
        headerRight: <View />,
        headerLeft: <TouchableOpacity 
                        onPress={() => navigation.navigate('LevelUp')}
                        >
                        <View style={styles.headerLeft}>
                            <Icon 
                            name="angle-left" 
                            size={30} 
                            style={{marginRight: 5, marginLeft: 5}}
                            color={headerFontColor}>
                            </Icon>
                            <Text style={styles.headerText}>返回</Text>
                        </View>
                    </TouchableOpacity>,
        headerTitle: 
        <View
            style={{
                flex: 1,
                alignItems: 'center'
            }}
        ><Text
               style={{
                   backgroundColor: 'white',
                   alignSelf: 'center',
                   textAlignVertical: 'center',
                   fontSize: 16, 
                   fontWeight: 'bold'
               }}
               onPress={() => {
                   
               }}> {navigation.state.params.title} </Text></View>,
            headerStyle: { 
              height: 50,
              backgroundColor: 'white'
            },
            headerTitleStyle: {
               alignSelf: 'center'
            }
        }) 
    },
    //考前練功坊: 尚未回答過的問題
    LevelUpQuestion: { screen: LevelUpQuestion,                 
        navigationOptions: ({ navigation }) => ({
        tabBarVisible: false,
        headerRight: <View />,
        headerLeft: <TouchableOpacity 
                        onPress={() => navigation.navigate('LevelUp')}
                        >
                        <View style={styles.headerLeft}>
                            <Icon 
                            name="angle-left" 
                            size={30} 
                            style={{marginRight: 5, marginLeft: 5}}
                            color={headerFontColor}>
                            </Icon>
                            <Text style={styles.headerText}>返回</Text>
                        </View>
                    </TouchableOpacity>,
        headerTitle: 
        <View
            style={{
                flex: 1,
                alignItems: 'center'
            }}
        ><Text
               style={{
                   backgroundColor: 'white',
                   alignSelf: 'center',
                   textAlignVertical: 'center',
                   fontSize: 16, 
                   fontWeight: 'bold'
               }}
               onPress={() => {
                   
               }}> {navigation.state.params.title} </Text></View>,
            headerStyle: { 
              height: 50,
              backgroundColor: 'white'
            },
            headerTitleStyle: {
               alignSelf: 'center'
            }
        }) 
    },
    //練功坊排行榜
    LevelUpRanking: { screen: LevelUpRanking,                 
        navigationOptions: ({ navigation }) => ({
        tabBarVisible: false,
        headerRight: <ExplainationButton 
                         navigation={navigation}
                         target='Explaination'
                         title='說明'
                         back='LevelUpRanking'
                         previousTitle='排行榜'
                         />,
        headerLeft: <LevelUpReturnButton navigation={navigation}/>,
        headerTitle: 
        <View
            style={{
                flex: 1,
                alignItems: 'center'
            }}
        ><Text
               style={{
                   backgroundColor: 'white',
                   alignSelf: 'center',
                   textAlignVertical: 'center',
                   fontSize: 16, 
                   fontWeight: 'bold'
               }}
               onPress={() => {
                   
               }}> {navigation.state.params.title} </Text></View>,
            headerStyle: { 
              height: 50,
              backgroundColor: 'white'
            },
            headerTitleStyle: {
               alignSelf: 'center'
            }
        }) 
    },
    //練功坊排行榜的說明
    Explaination: { screen: Explaination,                 
        navigationOptions: ({ navigation }) => ({
        tabBarVisible: false,
        headerRight: <View />,
        headerLeft: <TouchableOpacity 
                        onPress={() => navigation.navigate(navigation.state.params.back,
                            {title: navigation.state.params.previousTitle}
                        )}
                        >
                        <View style={styles.headerLeft}>
                            <Icon 
                            name="close" 
                            size={30} 
                            style={{marginRight: 5, marginLeft: 5}}
                            color={headerFontColor}>
                            </Icon>
                        </View>
                    </TouchableOpacity>,
        headerTitle: 
        <View
            style={{
                flex: 1,
                alignItems: 'center'
            }}
        ><Text
               style={{
                   backgroundColor: 'white',
                   alignSelf: 'center',
                   textAlignVertical: 'center',
                   fontSize: 16, 
                   fontWeight: 'bold'
               }}
               onPress={() => {
                   
               }}> {navigation.state.params.title} </Text></View>,
            headerStyle: { 
              height: 50,
              backgroundColor: 'white'
            },
            headerTitleStyle: {
               alignSelf: 'center'
            }
        }) 
    },
    //寫作練習: 作品集
    WarmUpCollection: { screen: WarmUpCollection,                 
        navigationOptions: ({ navigation }) => ({
        tabBarVisible: false,
        headerRight: <View />,
        headerLeft: <TouchableOpacity 
                        onPress={() => navigation.navigate('WarmUp')}
                        >
                        <View style={styles.headerLeft}>
                            <Icon 
                            name="angle-left" 
                            size={30} 
                            style={{marginRight: 5, marginLeft: 5}}
                            color={headerFontColor}>
                            </Icon>
                            <Text style={styles.headerText}>返回</Text>
                        </View>
                    </TouchableOpacity>,
        headerTitle: 
        <View
            style={{
                flex: 1,
                alignItems: 'center'
            }}
        ><Text
               style={{
                   backgroundColor: 'white',
                   alignSelf: 'center',
                   textAlignVertical: 'center',
                   fontSize: 16, 
                   fontWeight: 'bold'
               }}
               onPress={() => {
                   
               }}> 作品集 </Text></View>,
            headerStyle: { 
              height: 50,
              backgroundColor: 'white'
            },
            headerTitleStyle: {
               alignSelf: 'center'
            }
        }) 
    }
  },
  {
    navigationOptions: {
            headerLeft: (<View></View>), 
            headerRight: (<View></View>),
            headerTitle: <View
                style={{
                    flex: 1,
                    alignItems: 'center'
                }}
                ><Text
               style={{
                   textAlignVertical: 'center',
                   fontSize: 16, 
                   fontWeight: 'bold'
               }}
               onPress={() => {
                   
               }}> 學習 </Text></View>,
            headerStyle: { 
              height: 50,
              width: '100%',
              backgroundColor: 'white'
            },
            headerTitleStyle: {
                textAlign: 'center',
                alignSelf: 'center'
            }
        }
  },
  {
    mode: 'modal',
    headerMode: 'none'
  });

/*
//Wrap the StackNavigator inside a class will cause tabBarVisible config. inactivate
class ActivityStack extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return <LearningStackComponent screenProps={this.props}/>;
    }

}
*/

export default LearningStackComponent;