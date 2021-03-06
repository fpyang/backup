import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableHighlight, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { activityMsg } from '../../../images/images';

const { width, height } = Dimensions.get('window');
const styles = {
    messageItem: {
       display: 'flex',
       flexDirection: 'row',
       height: 70,
       width: width,
       alignItems: 'center'
    },
    messageContent: {
        height: 70,
        width: width - 80,
        margin: 10
    },
    top:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5
    },
    content:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5
    },
    iconImg: {
        marginLeft:20,
        height: 30,
        width: 30
    }
}


class MessageItem extends Component{

    constructor(props){
        super(props);
        this.dateFormator = this.dateFormator.bind(this);
    }
    
    dateFormator(theDate){
        let dateStr = theDate.getFullYear().toString() + '/' + (theDate.getMonth()+1).toString()
                     + '/' + theDate.getDate().toString();
        return dateStr;
    }
    render(){
        //<Icon name='comment' size={30} color='gray' style={{marginLeft: 20}} />
        return(
            <View style={styles.messageItem}>
            <Image style={styles.iconImg} source={activityMsg}/>
            <View style={styles.messageContent}>
            <View style={styles.top}>
            <Text>{this.props.title}</Text><Text>{this.dateFormator(this.props.date)}</Text>
            </View>
            <View style={styles.top}>
            <Text>{this.props.content}</Text>
            </View>
            </View>
            </View>
        );
    }
}

export default MessageItem;