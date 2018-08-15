
import React, { Component } from 'react';
import { View, Text, Dimensions, Button, TouchableOpacity, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import TitleBar from './tabDecorators/TitleBar';
import { About, Admission, Books, Grade, Guess, QA, Region, DataList } from './activityModules';
import Award from './activityModules/Award';
import Review from './activityModules/Review';
import NavigationBar from '../NavigationBar';
import { activityFunword, activityAbout, activityAdmission, activityAward, activityBooks, activityGrade,
         activityGuess, activityQA, activityRegion, activityReview } from '../../images/images';

const uWidth = Dimensions.get('window').width;
const uHeight = Dimensions.get('window').height;
const mWidth = Math.floor((uWidth-12)/3);
const headerFontColor = '#2D82C6';
const styles = {
    content: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    buttonContainer: {
        width: mWidth, height: mWidth, backgroundColor: 'white', 
        margin: 2, justifyContent: 'center', alignItems: 'center'
    },
    iconImg: {
       marginBottom: 15
    },
    iconTitle: {
       fontSize: 16
    }

}


class ActivityScreen extends Component{
    constructor(props){
        
        super(props);
        this.qualifyForFunwordGroup = this.qualifyForFunwordGroup.bind(this);
        // context is used on header's
        if(this.qualifyForFunwordGroup(this.props.signIn.user)){
            this.activityModules = [
                {target: 'FunWord', routeName: 'FunWord', title: '創意玩字', icon: activityFunword},
                {target: 'About', routeName: 'About', title: '關於比賽', icon: activityAbout},
                {target: 'Region', routeName: 'Region', title: '賽區資訊', icon: activityRegion},
                {target: 'Review', routeName: 'Review', title: '題目回顧', icon: activityReview},
                {target: 'Award', routeName: 'Award', title: '得獎名單', icon: activityAward, context: 'Award'},
                {target: 'Books', routeName: 'Books', title: '作文專書', icon: activityBooks},
                {target: 'QA', routeName: 'QA', title: '常見問題', icon: activityQA},           
                {target: 'Guess', routeName: 'Guess', title: '考前暖身', icon: activityGuess},
                /*{target: 'Grade', routeName: 'DataList', title: '初賽成績', icon: activityGrade, 
                  back: 'ActivityScreen', context: 'Grade', titleName: '成績'},
                {target: 'Admission', routeName: 'DataList', title: '初賽入場證', icon: activityAdmission, 
                  back: 'ActivityScreen', context: 'Admission', titleName: '入場證' }*/
            ]
        }else{
            this.activityModules = [
                //{target: 'FunWord', routeName: 'FunWord', title: '創意玩字', icon: activityAbout},
                {target: 'About', routeName: 'About', title: '關於比賽', icon: activityAbout},
                {target: 'Region', routeName: 'Region', title: '賽區資訊', icon: activityRegion},
                {target: 'Review', routeName: 'Review', title: '題目回顧', icon: activityReview},
                {target: 'Award', routeName: 'Award', title: '得獎名單', icon: activityAward, context: 'Award'},
                {target: 'Books', routeName: 'Books', title: '作文專書', icon: activityBooks},
                {target: 'QA', routeName: 'QA', title: '常見問題', icon: activityQA},           
                {target: 'Guess', routeName: 'Guess', title: '考前暖身', icon: activityGuess},
                /*{target: 'Grade', routeName: 'DataList', title: '初賽成績', icon: activityGrade, 
                  back: 'ActivityScreen', context: 'Grade', titleName: '成績'},
                {target: 'Admission', routeName: 'DataList', title: '初賽入場證', icon: activityAdmission, 
                  back: 'ActivityScreen', context: 'Admission', titleName: '入場證' }*/
            ]
        }
        
        

    }
    qualifyForFunwordGroup(user){
        let qualified = true;
        let schoolType = user.schoolType;
        let schoolLevel = user.schoolLevel;
    
        /*
        1. 國小中年級組: 國小三年級 國小四年級
        2. 國小高年級組: 五年級 六年級
        3. 國中組: 國中
        4. 高中職組: 高中職

        低年級不能參加
        */
    
        if(schoolType === '國小'){
            if((schoolLevel === '一年級')||(schoolLevel === '二年級')){
                qualified = false;
            }
        }
        return qualified;
      }
    render(){
        return(
        <View style={{flex: 1}}>
            <View style={styles.content}>
              { this.activityModules.map(
                  (modules, index)=>{
                      return (
                      <TouchableOpacity 
                        key={index}                     
                        style={styles.buttonContainer}
                        onPress={() => {
                            /*this.props.navigation.setParams({
                                tabBarVisible: false});*/
                            this.props.navigation.navigate(modules.routeName, {
                                title: modules.title, 
                                back: modules.back,
                                target: modules.target,
                                context: modules.context,
                                titleName: modules.titleName
                            });                         
                        }}
                        > 
                      <Image style={styles.iconImg} source={modules.icon}/>
                      <Text style={styles.iconTitle}>
                        {modules.title}                      
                      </Text>
                      </TouchableOpacity>);
                  }
              )}
            </View>
        </View>);
    }
}

function mapStateToProps(state) {
    return {
        signIn: state.signIn
    };
  }
  
  export default connect(mapStateToProps)(ActivityScreen);