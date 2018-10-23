import React, { Component } from 'react';
import { Dimensions, View, Text, FlatList, ScrollView, Modal, TouchableHighlight, WebView } from 'react-native';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import TitleBar from './tabDecorators/TitleBar';
import MessageItem from './tabDecorators/MessageItem';
import WeeblyWebView from './activityModules/utilities/WeeblyWebView';

    

const { width, height } = Dimensions.get('window');
const styles = {
    messages: {

    },
    headerBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        width: width
    },
    iconView: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconImg: {
        
     }
}
export default class MessageScreen extends Component{
    constructor(props){
        super(props);
        this.messages = firebase.firestore().collection('messages').orderBy('date', 'desc');
        this.onMessagesUpdate = this.onMessagesUpdate.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
        this.state = {
            loading: true,
            modalVisible: false,
            modalURL: ''
        }
    }
    componentDidMount() {
        this.unsubscribe = this.messages.onSnapshot(this.onMessagesUpdate);
        
    }
    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
        
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    onMessagesUpdate(querySnapshot){
        const messages = [];
        querySnapshot.forEach((doc) => {
            const { content, date, title, detailURL } = doc.data();
            let filteringCondition = true; //set up filtering condition here
            if(filteringCondition){ 
                messages.push({
                    key: doc.id,
                    id: doc.id,
                    doc, // DocumentSnapshot
                    content,
                    date,
                    title,
                    detailURL
                });
            }      
        });
        this.setState({ 
            messages,
            loading: false,
        });
    }
    //
    render(){
        if(this.state.messages){
            if(this.state.messages.length>0){
            return(
                <View style={{flex: 1}}>
        
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <View style={{flex: 1, marginTop: 0}}>
                   
                      <View style={styles.headerBar}>
                      
                      <TouchableHighlight
                        onPress={() => {
                          this.setModalVisible(!this.state.modalVisible);
                        }}>
                        <View style={styles.iconView}> 
                            <Icon name='angle-left' size={30} color='gray' />    
                        </View>
                      </TouchableHighlight>
                      
                      <Text> 訊息 </Text>
                      <TouchableHighlight
                        onPress={() => {
                        }}>
                        <View style={styles.iconView} />
                      </TouchableHighlight>
                     </View>
                      <View style={{flex: 1, flexDirection:'column'}}>
                        <WeeblyWebView source={{uri: this.state.modalURL}} />
                      </View>
                    
                  </View>
                </Modal>
        
                    <TitleBar title={'訊息'}/>
                    <ScrollView>
                        <FlatList
                            style={{flex: 1, marginBottom: 130}}
                            contentContainerStyle={styles.messages}
                            data={this.state.messages}
                            renderItem={({ item }) => {
                                return(
                                    <TouchableHighlight onPress={()=>{
                                        this.setState({modalURL: item.detailURL});
                                        this.setModalVisible(true)}}>
                                        <MessageItem {...item} onClick={this.setModalVisible} />
                                    </TouchableHighlight>
                                );
                             }}
                            />
                    </ScrollView>
                </View>);
        }else{
            return(
            <View style={{flex: 1, marginTop: 0}}>     
            <TitleBar title={'訊息'}/> 
            <View style={styles.headerBar}>
            
            </View>
            <View style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems:'center'}}>
                <Text>尚未有任何訊息</Text>
            </View></View>);
        }
        
    }else{
        return(<View style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems:'center'}}>
                <Text>載入中</Text>
            </View>);
    }}
}