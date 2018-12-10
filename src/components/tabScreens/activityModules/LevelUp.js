import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DrawerLayout from 'react-native-drawer-layout';
import watch from 'redux-watch';
import { selectLevel } from '../../../actions/index';
import LevelUpItem from './utilities/LevelUpItem';

class LevelUp extends Component{
    constructor(props){
        super(props);
        this.getLevelUpData = this.getLevelUpData.bind(this);
        this.state = {
            loading: true,
            configObjs: []
        }
    }
    componentWillMount(){

        fetch(('http://test.educoco.com:5000/articlesbf'), {
            method: 'GET'}).then((response) => {
              if (response.status === 200) {
                response.json().then(json => {
                                      this.setState(Object.assign({}, this.state, {'configObjs': json.data, 'loading': false}));
                                    });
              } else {
                //console.log(response.status);
              }
            })
            .catch((error) => {
              //console.log(error);
            });
    }
    getLevelUpData(){
       return[
                {
                    title: '挑戰AI極限 Google要玩什麼'

                },
                {
                    title: '挑戰Alf極限 Gigipu要玩什麼'

                }
            ]
    }
    render(){
        let navigationView = (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
              <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
            </View>
          );

          let container = [];
          if(this.state.loading){
   
              container = <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>題目載入中...</Text></View>
      
          }else{
              container = [];
              { this.state.configObjs.map((article, index)=>{
                  container.push(<LevelUpItem {...this.props} title={article.subject} key={index}/>)
              })
             }
          }
        return(           
                <DrawerLayout
                drawerWidth={300}
                drawerPosition={DrawerLayout.positions.Left}
                onDrawerSlide={e =>
                            this.setState({drawerSlideOutput: JSON.stringify(e.nativeEvent)})}
                onDrawerStateChanged={e =>
                            this.setState({drawerStateChangedOutput: JSON.stringify(e)})}
                drawerBackgroundColor="red"
                ref={drawer => {
                            return (this.drawer = drawer);
                            }}
                keyboardDismissMode="on-drag"
                statusBarBackgroundColor="blue"
                renderNavigationView={() => navigationView}>
                            <ScrollView>
                                <Text>{JSON.stringify(this.props.levelUpHamburgerOpen)}</Text>
                            {  container }
                            </ScrollView>
                </DrawerLayout>


        )
    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({ selectLevel }, dispatch);
  }
  
  
function mapStateToProps(state) {
    return {
        levelUpHamburgerOpen: state.levelUpHamburgerOpen,
        listOfArticles: state.listOfArticles
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(LevelUp);
