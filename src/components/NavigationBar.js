import React, { Component } from 'react';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import LearningStack from './tabScreens/LearningStack';
import ActivityStack from './tabScreens/ActivityStack';
import MessageScreen from './tabScreens/MessageScreen';
import SettingsScreen from './tabScreens/SettingsScreen';

const NavigationBar = TabNavigator(
    {
      訊息: { screen: MessageScreen },
      學習: { screen:  LearningStack }, //LearningStack
      聯合盃: { screen: ActivityStack }, //ActivityStack
      設定: { screen: SettingsScreen }
    },
    {
      initialRouteName: '聯合盃',
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          /*
          if (routeName === 'Home') {
            iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          } else if (routeName === 'Settings') {
            iconName = `ios-options${focused ? '' : '-outline'}`;
          }*/
          switch(routeName){
              case '訊息':
                iconName = '../images/tabs/news.png';
                return(<Image
                  style={{ tintColor:tintColor}}
                  source={require('../images/tabs/news.png')}
                  tintColor={tintColor}
                />);
                
              case '學習':
                iconName = '../images/tabs/learning.png';
                return(<Image
                  style={{ tintColor:tintColor}}
                  source={require('../images/tabs/learning.png')}
                  tintColor={tintColor}
                />);
              case '設定':
                iconName = '../images/tabs/setting.png';
                return(<Image
                  style={{ tintColor:tintColor}}
                  source={require('../images/tabs/setting.png')}
                  tintColor={tintColor}
                />);
              case '聯合盃':
                iconName = '../images/tabs/udn.png';
                return(<Image
                  style={{ tintColor:tintColor}}
                  source={require('../images/tabs/udn.png')}
                  tintColor={tintColor}
                />);
              default:
                iconName = '../images/tabs/rocket.png';
                return(<Image
                  style={{ tintColor:tintColor}}
                  source={require('../images/tabs/news.png')}
                  tintColor={tintColor}
                />);
          }
  
          // You can return any component that you like here! We usually use an
          // icon component from react-native-vector-icons
          //return (<Ionicons name={iconName} size={25} color={tintColor} />);
          //return (<Icon name={iconName} size={25} color={tintColor} />);
          
        },
      }),
      tabBarOptions: {
        activeTintColor: '#00a4e4',
        inactiveTintColor: 'gray',
        style: {
            backgroundColor: 'white'
        } 
      },
      tabBarComponent: TabBarBottom,
      tabBarPosition: 'bottom',
      animationEnabled: false,
      swipeEnabled: false,
    }
  );

  export default NavigationBar;
