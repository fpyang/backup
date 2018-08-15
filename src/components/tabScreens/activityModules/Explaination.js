
import React, { Component } from 'react';
import { View, Text } from 'react-native';

const styles = {
    page: {
        flex: 1,
        backgroundColor: 'white',
        padding: 25
    }
}
class Explaination extends Component{

    render(){
        return(
            <View style={styles.page}>
            <Text>計分方式</Text>
            <Text></Text>
            <Text>1.僅計算每篇第一次作答的分數</Text>
            <Text>2.僅計算每篇第一次作答的分數</Text>
            <Text>3.僅計算每篇第一次作答的分數</Text>
            <Text>註: 答對率計算方式: 作答篇數的答對率總和/作答篇數 x 100%</Text>
            </View>
        )
    }
}

export default Explaination ;