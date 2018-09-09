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
class Region extends Component{
    constructor(props){
        super(props);
        this.state = {
            configObjs: {},
            loading: true
        }
    }

    componentWillMount(){

        fetch(('https://ucampus-89e65.firebaseapp.com/static/json/region.json'), {
            method: 'GET'}).then((response) => {
              if (response.status === 200) {
                response.json().then(json => {
                                      this.setState(Object.assign({}, this.state, {'configObjs': json, 'loading': false}));
                                    });
              } else {
                //console.log(response.status);
              }
            })
            .catch((error) => {
              //console.log(error);
            });
    }
    render(){
        let container = [];
        let configObjs=[
            {
                section: '北區',
                data: [{
                    title: '台北市初賽',
                    back: 'Region',
                    itemTitle: '台北市初賽',
                    pageUrl: 'https://ucampusapp.weebly.com/tryout_taipei.html'
                },{
                    title: '新北市初賽',
                    back: 'Region',
                    itemTitle: '新北市初賽',
                    pageUrl: 'https://ucampusapp.weebly.com/tryout_new_taipei.html'
                },{
                    title: '桃園初賽',
                    back: 'Region',
                    itemTitle: '桃園初賽',
                    pageUrl: 'https://ucampusapp.weebly.com/tryout_taoyuan.html'
                },{
                    title: '新竹初賽',
                    back: 'Region',
                    itemTitle: '新竹初賽',
                    pageUrl: 'https://ucampusapp.weebly.com/tryout_hsinchu.html'
                }]
            },
            {
                section: '中部',
                data: [{
                    title: '台中初賽',
                    back: 'Region',
                    itemTitle: '台中初賽',
                    pageUrl: 'https://ucampusapp.weebly.com/tryout_taichung.html'
                },{
                    title: '南投初賽',
                    back: 'Region',
                    itemTitle: '南投初賽',
                    pageUrl: 'https://ucampusapp.weebly.com/tryout_nantou.html'
                },{
                    title: '雲林初賽',
                    back: 'Region',
                    itemTitle: '雲林初賽',
                    pageUrl: 'https://ucampusapp.weebly.com/tryout_yunlin.html'
                },{
                    title: '嘉義初賽',
                    back: 'Region',
                    itemTitle: '嘉義初賽',
                    pageUrl: 'https://ucampusapp.weebly.com/tryout_chiayi.html'
                }]
            },
            {
                section: '南部',
                data: [{
                    title: '台南初賽',
                    back: 'Region',
                    itemTitle: '台南初賽',
                    pageUrl: 'https://ucampusapp.weebly.com/tryout_tainan.html'
                },{
                    title: '高雄初賽',
                    back: 'Region',
                    itemTitle: '高雄初賽',
                    pageUrl: 'https://ucampusapp.weebly.com/tryout_kaohsiung.html'
                }]
            },
            {
                section: '東部',
                data: [{
                    title: '宜蘭初賽',
                    back: 'Region',
                    itemTitle: '宜蘭初賽',
                    pageUrl: 'https://ucampusapp.weebly.com/tryout_yilan.html'
                },{
                    title: '花蓮初賽',
                    back: 'Region',
                    itemTitle: '花蓮初賽',
                    pageUrl: 'https://ucampusapp.weebly.com/tryout_hualien.html'
                }]
            },
            {
                section: '離島',
                data: [{
                    title: '金門初賽',
                    back: 'Region',
                    itemTitle: '金門初賽',
                    pageUrl: 'https://ucampusapp.weebly.com/tryout_kinmen.html'
                }]
            }
    ]
    if(this.state.loading){
 
        container = <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>loading</Text></View>

    }else{
        container = [];
        this.state.configObjs.map(
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
    }

        return(
        <View style={{flex: 1}}>
            <ScrollView style={styles.content}>
            { container }
            </ScrollView>
        </View>);
    }
}

export { Region };