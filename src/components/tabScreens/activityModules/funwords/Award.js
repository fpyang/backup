import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const styles = {

    winnerList: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white'
    },
    item: {
        display: 'flex',
        width: '100%',
        height: 30,
        flex: 3,
        flexDirection: 'row',
    },
    itemField: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        display: 'flex',
        width: '100%',
        height: 40,
        flexDirection: 'row',
        backgroundColor: '#f1f1f1',
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        borderTopColor: '#cccccc',
        borderTopWidth: 0,
    },
    headerWord: {
        color: '#2D82C6'
    }
}

class Award extends Component{
    constructor(props){
        super(props);
        this.getShortWinnerList = this.getShortWinnerList.bind(this);
    }
    getShortWinnerList(){
        return(
            {
                winners: [
                    {
                        name: '張允盛',
                        school: '市立民族國小',
                        rank: '第一名'       
                    },
                    {
                        name: '呂容禎',
                        school: '正義國小',
                        rank: '第二名'  
                    },
                    {
                        name: '張允盛',
                        school: '市立民族國小',
                        rank: '第一名'       
                    },
                    {
                        name: '呂容禎',
                        school: '正義國小',
                        rank: '第二名'  
                    }],
                activated: false

            }
            );
        }
    render(){
        if(this.getShortWinnerList().activated){
            return(
                <View style={styles.winnerList}>
                <View style={styles.header}>
                        <View style={styles.itemField}>
                            <Text style={styles.headerWord}>姓名</Text>
                        </View>
                        <View style={styles.itemField}>
                            <Text style={styles.headerWord}>所屬學校</Text>
                        </View>
                        <View style={styles.itemField}>
                            <Text style={styles.headerWord}>名次</Text>
                        </View>
                   </View><View style={{height: 5}}></View>
                <ScrollView style={styles.winnerList}>
                   {
                       this.getShortWinnerList().winners.map(
                           (winner, index)=>{
                               return(
                                   <View style={styles.item} key={index}>
                                   <View style={styles.itemField}>
                                       <Text>{winner.name}</Text>
                                   </View>
                                   <View style={styles.itemField}>
                                       <Text>{winner.school}</Text>
                                   </View>
                                   <View style={styles.itemField}>
                                       <Text>{winner.rank}</Text>
                                   </View>
                                   </View>
                               );
                           }
                       )
                   }
                <View style={{height: 80}}></View>
                </ScrollView>
                </View>
            )
        }else{
            return(
            <View style={{display: 'flex', flex: 1, justifycontent: 'center', alignItems: 'center'}}>
                <Text>尚未公布</Text></View>)
            
        }
        
    }
}

export default Award ;

