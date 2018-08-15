import React, { Component } from 'react';
import { View, Text, TouchableOpacity, WebView, PixelRatio } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { selectLevel } from '../../../../actions/index';

//#2D82C6
const styles = {
    content: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    item: {
        height: 56,// / PixelRatio.get(),
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        padding: 8,// / PixelRatio.get(),
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 1,// / PixelRatio.get(),
        marginBottom: 1,// / PixelRatio.get(),
    },
    itemTitle: {
        fontSize: 14
    }
}
class WinnerListItem extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let content = (<Text style={styles.itemTitle}>{}</Text>);
        if(this.props.itemTitle){
            content = (<Text style={styles.itemTitle}>{this.props.itemTitle}</Text>);
        }
        return(
        <TouchableOpacity 
          onPress={
              ()=>{
              this.props.navigation.navigate('WinnerList', { 
                  title: this.props.title, 
                  back: this.props.back,
                  itemTitle: this.props.itemTitle
                })
              }
            }
        >
        <View style={styles.item}>
            { content }
            <Icon name='angle-right' size={30} color='gray' />
        </View>
        </TouchableOpacity>
        );
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(WinnerListItem);

  