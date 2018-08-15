import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import TitleBar from '../tabDecorators/TitleBar';
import ListItem from './utilities/ListItem';

const styles = {
    content: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    sectionStyle: {
        height: 36,
        padding: 7,
        justifyContent: 'center'
    }
}
class RegionFinal extends Component{
    render(){
        let container = [];
        let commonTitle = '常見問題';
        let configObjs=[
            {
                section: '第十二屆聯合盃作文大賽',
                data: [
                    {
                    title: '北區決賽',
                    back: 'RegionFinal',
                    itemTitle: '北區決賽',
                    pageUrl: 'https://ucampusapp.weebly.com/final_north.html'
                    },
                    {
                        title: '中區決賽',
                        back: 'RegionFinal',
                        itemTitle: '中區決賽',
                        pageUrl: 'https://ucampusapp.weebly.com/final_central.html'
                    },
                    {
                        title: '南區決賽',
                        back: 'RegionFinal',
                        itemTitle: '南區決賽',
                        pageUrl: 'https://ucampusapp.weebly.com/final_south.html'
                    },
                    {
                        title: '金門決賽',
                        back: 'RegionFinal',
                        itemTitle: '金門決賽',
                        pageUrl: 'https://ucampusapp.weebly.com/final_kinmen.html'
                    }
                
            ]
            }
    ]

    configObjs.map(
        (configObj, index)=>{
            container.push(<View style={styles.sectionStyle} key={'section'+index}>
                <Text>{configObj.section}</Text></View>);
            configObj.data.map(
              (configObjData, index)=>{
                  container.push(<ListItem {...this.props} {...configObjData} key={configObj.section+index}/>);
              }
          )
        }
    )

        return(
        <View style={{flex: 1}}>
            <ScrollView style={styles.content}>
            { container }
            </ScrollView>
        </View>);
    }
}

export { RegionFinal };