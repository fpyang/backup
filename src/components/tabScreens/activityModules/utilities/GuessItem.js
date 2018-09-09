import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, WebView, Linking, PixelRatio, Dimensions } from 'react-native';
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
        height: 90,// / PixelRatio.get(),
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        padding: 17,// / PixelRatio.get(),
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 1,
        marginBottom: 1,
        borderBottomColor: '#47315a',
        borderBottomWidth: 1,// / PixelRatio.get(),
        marginLeft: 10// / PixelRatio.get()
    },
    itemThumbnail: {
        height: 70,// / PixelRatio.get(),
        width: 70,// / PixelRatio.get(),
        backgroundColor: 'black'
    },
    itemContent: {
        height: 80,// / PixelRatio.get(),
        width: Dimensions.get('window').width - 180,//(240 / PixelRatio.get()),
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'space-around'
    },
    itemTitle: {
        fontSize: 16
    },
    itemAuthor: {
        fontSize: 12,
        color: 'gray'
    },
    itemPublisher: {
        fontSize: 12,
        color: 'gray'
    }
}
class GuessItem extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let content = (<Text>default item title</Text>);
        if(this.props.itemTitle){
            content = (<Text>{this.props.itemTitle}</Text>);
        }
        return(
            <TouchableOpacity 
            onPress={
                ()=>{
                this.props.navigation.navigate('Leaf', { 
                    title: this.props.title, 
                    back: this.props.back,
                    pageUrl: this.props.pageUrl
                })
                }
            }
            >
                <View style={styles.item}>
                <Image 
                style={styles.itemThumbnail}
                source={{uri: this.props.imageUrl}}></Image>
                    <View style={styles.itemContent}>
                        <Text style={styles.itemTitle}> {this.props.itemTitle} </Text>
                        <Text style={styles.itemAuthor}> {this.props.itemAuthor} </Text>
                        <Text style={styles.itemPublisher}> {this.props.itemPublisher} </Text>
                    </View>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(GuessItem);

  