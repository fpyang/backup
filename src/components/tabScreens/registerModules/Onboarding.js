import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import Swiper from 'react-native-swiper';
import { setAppStage } from '../../../actions/index';
import { onboarding01, onboarding02, onboarding03 } from '../../../images/images';

const { width, height } = Dimensions.get('window');
let imageSize = width * 0.7;
const identationLeft = 20;
const styles = {
    wrapper: {
        width: '100%',
        height: '80%'
    },
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    text1: {
      color: '#1982C4',
      fontSize: 26,
      fontWeight: 'bold',
    },
    text2: {
        color: '#FF595E',
        fontSize: 26,
        fontWeight: 'bold',
      },
    text3: {
        color: '#8AC926',
        fontSize: 26,
        fontWeight: 'bold',
    },
    text1s: {
        color: '#1982C4',
        fontSize: 16,
        fontWeight: 'bold',
      },
    text2s: {
        color: '#FF595E',
        fontSize: 16,
        fontWeight: 'bold',
    },
    text3s: {
        color: '#8AC926',
        fontSize: 16,
        fontWeight: 'bold',
    },
    iconImg: {
        width: imageSize,
        height: imageSize
    },
    buttonStyle: {
        width: imageSize * 0.9,
        height: 50,
        borderRadius: 22,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    controlText: {
        color: 'gray',
        fontSize: 25,
        fontWeight: 'bold'
    }
}
class OnBoarding extends Component{
    constructor(props){
        super(props);
        this.state = {
            swiperIndex: 0,
            buttonColor: '#1982C4'
        }
        this._onMomentumScrollEnd = this._onMomentumScrollEnd.bind(this);
        
    }
    _onMomentumScrollEnd(e, state, context) {
        // untested but this should work
        this.setState({swiperIndex: state.index});
        switch(state.index){
            case 0:
                this.setState({buttonColor: '#1982C4'});
                break;
            case 1:
                this.setState({buttonColor: '#FF595E'});
                break;
            case 2:
                this.setState({buttonColor: '#8AC926'});
                break;
            default:
                break;
        }
      }
    render(){
        return(
            <View style={{flex: 1, backgroundColor: 'white'}}>
            <Swiper 
                containerStyle={styles.wrapper} 
                showsButtons={true}
                onMomentumScrollEnd={this._onMomentumScrollEnd}
                nextButton={<Text style={styles.controlText}>›</Text>}
                prevButton={<Text style={styles.controlText}>‹</Text>}
            >
                <View style={styles.slide1}>
                <Image style={styles.iconImg} source={onboarding01}/>
                <Text style={styles.text1}>聯合盃精彩賽事，一手掌握</Text>
                <Text style={styles.text1s}>賽區資訊、考題回顧、寫作秘笈、及時入手</Text>
                </View>
                <View style={styles.slide2}>
                <Image style={styles.iconImg} source={onboarding02}/>
                <Text style={styles.text2}>特別賽事，創意玩字大賽</Text>
                <Text style={styles.text2s}>寫字、拍照、上傳、投票，等你來挑戰</Text>
                </View>
                <View style={styles.slide3}>
                <Image style={styles.iconImg} source={onboarding03}/>
                <Text style={styles.text3}>學習，就從uCampus開始</Text>
                <Text style={styles.text3s}>寫作、閱讀、活動、競賽，多元有趣的學習服務</Text>
                </View>
            </Swiper>
            <TouchableOpacity 
                style={[styles.buttonStyle, {backgroundColor: this.state.buttonColor}]}
                onPress={()=>{this.props.setAppStage('Registering')}}>
                <Text style={styles.buttonText}>進入</Text>
            </TouchableOpacity>
              <Text style={styles.buttonText}>margin~</Text>
            </View> 
            );

    }
    
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({ setAppStage }, dispatch);
  }
  
  
function mapStateToProps(state) {
    return {
        appStage: state.appStage,
        signIn: state.signIn
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(OnBoarding);