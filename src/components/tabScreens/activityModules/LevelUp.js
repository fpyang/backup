import React, { Component } from 'react';
import { View, Text } from 'react-native';
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
    }
    getLevelUpData(){
       return[
                {
                    title: '挑戰AI極限 Google要玩什麼'

                },
                {
                    title: '挑戰AI極限 Google要玩什麼'

                }
            ]
    }
    render(){
        let navigationView = (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
              <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
            </View>
          );
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
                            <View>
                                <Text>{JSON.stringify(this.props.levelUpHamburgerOpen)}</Text>
                            { this.getLevelUpData().map(
                                (value, index) => {
                                    return(<LevelUpItem {...this.props} title={value.title} key={index}/>)
                                }
                            ) }
                            </View>
                </DrawerLayout>


        )
    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({ selectLevel }, dispatch);
  }
  
  
function mapStateToProps(state) {
    return {
        levelUpHamburgerOpen: state.levelUpHamburgerOpen
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(LevelUp);
