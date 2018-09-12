import React, { Component } from 'react';
import { View, Text, TouchableOpacity, WebView, PixelRatio, Platform } from 'react-native';
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
class ListItem extends Component{
    constructor(props){
        super(props);
        this.adaptiveUri = this.adaptiveUri.bind(this);
    }
    adaptiveUri(fileUrl){
        if (Platform.OS === 'ios') { 
                  //return fileUrl
                  //return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`;
                  return `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(fileUrl)}`;
          } else if (Platform.OS === 'android') {
                  //pdf
                  //console.log(`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(fileUrl)}`)
                  return `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(fileUrl)}`;
                  //others
                  //return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`;
               
          }
    
    /*依據檔案形式，可以使用 google or msoffice 去顯示 pdf、excel、ppt、doc 等文件*/
    }
    render(){
        let content = (<Text style={styles.itemTitle}></Text>);
        if(this.props.itemTitle){
            content = (<Text style={styles.itemTitle}>{this.props.itemTitle}</Text>);
        }
        let notWeebly = false;
        if(this.props.notWeebly){
            notWeebly=true;
        }
        if(this.props.isPdf){
            return(
                <TouchableOpacity 
                onPress={
                    ()=>{
                    this.props.navigation.navigate('Leaf', { 
                        title: this.props.title, 
                        back: this.props.back,
                        pageUrl: this.adaptiveUri(this.props.pageUrl),
                        notWeebly: notWeebly
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
        }else{
            return(
                <TouchableOpacity 
                onPress={
                    ()=>{
                    this.props.navigation.navigate('Leaf', { 
                        title: this.props.title, 
                        back: this.props.back,
                        pageUrl: this.props.pageUrl,
                        notWeebly: notWeebly
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
}
function mapDispatchToProps(dispatch) {

    return bindActionCreators({ selectLevel }, dispatch);
  }
  
  
function mapStateToProps(state) {
    return {
        selectedLevel: state.awardLevel
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ListItem);

  