import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, Dimensions, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import ActionSheet from 'react-native-actionsheet';
import { setCurrentWritingContext } from '../../../../actions/index';

const styles = {
    page: {
       display: 'flex',
       flex: 1,
       height: '100%',
       backgroundColor: 'white'
    },
    titleArea: {
        backgroundColor: '#EFEFEF',
        width: '100%',
        height: 50,
        justifyContent: 'center'
    },
    titleText: {
        margin: 10,
        fontWeight: 'bold',
        fontSize: 16
    },
    hintText: {
        color: 'gray'
    },
    hintTextLayout: {
        height: 20,
        paddingRight: 20,
        width: '100%',
        alignItems: 'flex-end'
    }
}
class WarmUpTyping extends Component{
    constructor(props){
        super(props);
        this.state = {
            workText: this.props.writingContext.context.initText,
            wordLength: 0,
            text: '',
            keyboardHeight: Dimensions.get('window').height
        }   
        this._keyboardDidShow = this._keyboardDidShow.bind(this);
    }
    componentWillMount(){
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    }
    showActionSheet(){
        this.ActionSheet.show();
    }
    _keyboardDidShow(e) {

            this.setState({keyboardHeight : Dimensions.get('window').height - e.endCoordinates.height - 170});
            //Test if 170 is correct parameter in other resolutions
    }
    render(){
        return(
            <View style={styles.page}>
            <View style={styles.titleArea}>
                <Text style={styles.titleText}>題目: {this.props.writingContext.context.questionTitle}</Text>
            </View>
            <View style={{height: this.state.keyboardHeight}}>
            <ScrollView  keyboardShouldPersistTaps='always'>
            <TextInput
                    underlineColorAndroid={'transparent'}
                    autoFocus = {true}
                    multiline = {true}
                    style={{height: '100%', width: '100%', backgroundColor: 'white', height:'100%', borderWidth: 0, marginBottom: 20}}
                    onChangeText={(text) => {
                        this.setState({text});
                        this.setState({wordLength: text.length});
                    }
                    }
                    value={this.state.workText}
            />
            </ScrollView>
            </View>
            <View style={styles.hintTextLayout}>
            <Text style={styles.hintText}>文章最少500字, 已輸入{this.state.wordLength}字</Text>
            </View>
            <ActionSheet
                ref={o => this.ActionSheet = o}
                title={'Which one do you like ?'}
                options={['Apple', 'Banana', 'cancel']}
                cancelButtonIndex={2}
                destructiveButtonIndex={1}
                onPress={(index) => { /* do something */ }}
                />
            </View>
        )
    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({ setCurrentWritingContext }, dispatch);
  }
  
  
function mapStateToProps(state) {
    return {
        writingContext: state.writingContext
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(WarmUpTyping);