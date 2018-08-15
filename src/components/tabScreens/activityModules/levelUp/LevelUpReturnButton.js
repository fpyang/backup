import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Hamburger from 'react-native-hamburger';
import { bindActionCreators } from 'redux';
import { setLevelUpHamburgerState } from '../../../../actions/index';

const headerFontColor = '#2D82C6';
const styles = {
    headerText: {
        fontSize: 18,
        color: headerFontColor
    },
    headerLeft: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'      
    },
}
class LevelUpReturnButton extends Component{
    constructor(props){
        super(props);
        this.state = {
            active: false
        }
    }
    render(){
        return (
            <TouchableOpacity 
                        onPress={() => {
                            this.props.navigation.navigate('LevelUp');
                            this.props.setLevelUpHamburgerState(false);
                    }}
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
                    </TouchableOpacity>
        )
    }

}


function mapDispatchToProps(dispatch) {

    return bindActionCreators({ setLevelUpHamburgerState }, dispatch);
  }
  
  
function mapStateToProps(state) {
    return {
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(LevelUpReturnButton);
