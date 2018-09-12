import React, { Component } from 'react';
import { ScrollView, View, Text, Platform } from 'react-native';
import TitleBar from '../tabDecorators/TitleBar';
import LevelSelector from './utilities/LevelSelector';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectLevel } from '../../../actions/index';
import ListItem from './utilities/ListItem';


const grayBackground = '#F1F1F1';
const styles = {
    content: {
        flex: 1,
        backgroundColor: grayBackground
    },
    levels: {
        flex: 1.2,
        backgroundColor: grayBackground
    },
    regions: {
        flex: 4,
        backgroundColor: '#F1F1F1'
    },
    sectionStyle: {
        height: 36,
        padding: 7,
        justifyContent: 'center'
    },
    sectionText: {
        fontWeight: 'bold',
        color: 'gray'
    }
}
class Review extends Component{
    constructor(props){
        super(props);
        this.adaptiveUri = this.adaptiveUri.bind(this);
        
        this.state={
            loading: true
        }
    }
    componentWillMount(){

        fetch(('https://ucampus-89e65.firebaseapp.com/static/json/review.json'), {
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
        let container = null;
        if(this.state.configObjs){
            container = [];
            this.state.configObjs[Number(this.props.selectedLevel.awardLevel)-1].map(
                (configObj, index)=>{
                    container.push(<View style={styles.sectionStyle} key={'section'+index}>
                        <Text style={styles.sectionText}>{configObj.section}</Text></View>);
                    configObj.data.map(
                      (configObjData, index)=>{
                          container.push(<ListItem {...this.props} {...configObjData} notWeebly={true} isPdf={true} key={configObj.section+index}/>);
                      }
                  )
                }
            )
            /*let index = 0;
            for(configObj in this.state.configObjs[Number(this.props.selectedLevel.awardLevel)-1]){
                index++;
                container.push(<View style={styles.sectionStyle} key={'section'+index}>
                      <Text style={styles.sectionText}>{configObj.section}</Text></View>);
                  for(configObjData in configObj){
                      index++;
                      container.push(<ListItem {...this.props} {...configObjData} notWeebly={true} isPdf={true} key={configObj.section+index}/>); 
              }         
          }*/
        }
            
    /*
    configObjs[Number(this.props.selectedLevel.awardLevel)-1].map(
        (configObj, index)=>{
            container.push(<View style={styles.sectionStyle} key={'section'+index}>
                <Text style={styles.sectionText}>{configObj.section}</Text></View>);
            configObj.data.map(
              (configObjData, index)=>{
                  container.push(<ListItem {...this.props} {...configObjData} notWeebly={true} isPdf={true} key={configObj.section+index}/>);
              }
          )
        }
    )*/

        if("awardLevel" in this.props.selectedLevel){
            //pass
        }else{
            
        }
        if(this.state.loading){
            return((this.state.configObjs)?<Text>{JSON.stringify(this.state.configObjs)}</Text>:<Text>{''}</Text>)
        }else{
                return(
                    <View style={{flex: 1}}>
                        <View style={styles.content}>
                            <View style={styles.levels}>
                            <LevelSelector />
                            </View>
                            
                            <View style={styles.regions}>   
                            <ScrollView>               
                            { container }
                            </ScrollView>
                            </View>
                            
                        </View>
                        
                    </View>);
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(Review);

  