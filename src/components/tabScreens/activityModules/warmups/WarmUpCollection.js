import React, { Component } from 'react';
import { View, Text } from 'react-native';
import WorkItem from '../utilities/WorkItem';
const styles = {
    page: {
        flex: 1,
        backgroundColor: 'white'
    }
}
class WarmUpCollection extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let workData = [
            {
                type: 'draft',
                startDate: new Date(),
                endDate: new Date(),
                title: '我想當老師'

            },
            {
                type: 'masterpiece',
                startDate: new Date(),
                endDate: new Date(),
                title: '我想當太空人',
                score: 6

            }
        ]
        return(
            <View style={styles.page}>
                { workData.map(
                    (value, index)=>{
                        
                        if(value.type=='masterpiece'){
                            return(
                                <WorkItem key={index} {...value} {...this.props} back='WarmUpCollection'/>
                            );
                        }else{
                            return(
                                <WorkItem key={index} {...value} {...this.props} back='WarmUpCollection'/>
                            );
                        }
                        

                    }
                )}
            </View>
        )
    }
}

export default WarmUpCollection;