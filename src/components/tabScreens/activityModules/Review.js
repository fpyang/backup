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
        let container = [];
        let commonTitle = '題目回顧';
        let configObjs=[
            [
            {
                section: '國小中年級(第十屆聯合盃作文大賽-初賽題目)',
                data: [

                    {
                        title: '台北',
                        back: 'Review',
                        itemTitle: '台北',
                        pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/01/1.pdf')
                    },
                    {
                        title: '宜蘭',
                        back: 'Review',
                        itemTitle: '宜蘭',
                        pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/02/1.pdf')
                    },
                    {
                        title: '花蓮',
                        back: 'Review',
                        itemTitle: '花蓮',
                        pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/03/1.pdf')
                    },
                    {
                        title: '新北',
                        back: 'Review',
                        itemTitle: '新北',
                        pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/04/1.pdf')
                    },
                    {
                        title: '桃園',
                        back: 'Review',
                        itemTitle: '桃園',
                        pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/05/1.pdf')
                    },
                    {
                        title: '新竹',
                        back: 'Review',
                        itemTitle: '新竹',
                        pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/06/1.pdf')
                    },
                    {
                        title: '台中',
                        back: 'Review',
                        itemTitle: '台中',
                        pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/07/1.pdf')
                    },
                    {
                        title: '南投',
                        back: 'Review',
                        itemTitle: '南投',
                        pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/08/1.pdf')
                    },
                    {
                        title: '雲林',
                        back: 'Review',
                        itemTitle: '雲林',
                        pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/09/1.pdf')
                    },
                    {
                        title: '嘉義',
                        back: 'Review',
                        itemTitle: '嘉義',
                        pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/10/1.pdf')
                    },{
                        title: '台南',
                        back: 'Review',
                        itemTitle: '台南',
                        pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/11/1.pdf')
                    },
                    {
                        title: '高雄',
                        back: 'Review',
                        itemTitle: '高雄',
                        pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/12/1.pdf')
                    },
                    {
                        title: '金門',
                        back: 'Review',
                        itemTitle: '金門',
                        pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/13/1.pdf')
                    }

                ]
            },
            {
                section: '國小中年級(第十屆聯合盃作文大賽-決賽題目)',
                data: [{
                    title: commonTitle,
                    back: 'Review',
                    itemTitle: '決賽',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/final/1.pdf')
                }]
            }
    ],
    [
        {
            section: '國小高年級(第十屆聯合盃作文大賽-初賽題目)',
            data: [
                {
                    title: '台北',
                    back: 'Review',
                    itemTitle: '台北',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/01/2.pdf')
                },
                {
                    title: '宜蘭',
                    back: 'Review',
                    itemTitle: '宜蘭',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/02/2.pdf')
                },
                {
                    title: '花蓮',
                    back: 'Review',
                    itemTitle: '花蓮',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/03/2.pdf')
                },
                {
                    title: '新北',
                    back: 'Review',
                    itemTitle: '新北',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/04/2.pdf')
                },
                {
                    title: '桃園',
                    back: 'Review',
                    itemTitle: '桃園',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/05/2.pdf')
                },
                {
                    title: '新竹',
                    back: 'Review',
                    itemTitle: '新竹',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/06/2.pdf')
                },
                {
                    title: '台中',
                    back: 'Review',
                    itemTitle: '台中',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/07/2.pdf')
                },
                {
                    title: '南投',
                    back: 'Review',
                    itemTitle: '南投',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/08/2.pdf')
                },
                {
                    title: '雲林',
                    back: 'Review',
                    itemTitle: '雲林',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/09/2.pdf')
                },
                {
                    title: '嘉義',
                    back: 'Review',
                    itemTitle: '嘉義',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/10/2.pdf')
                },{
                    title: '台南',
                    back: 'Review',
                    itemTitle: '台南',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/11/2.pdf')
                },
                {
                    title: '高雄',
                    back: 'Review',
                    itemTitle: '高雄',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/12/2.pdf')
                },
                {
                    title: '金門',
                    back: 'Review',
                    itemTitle: '金門',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/13/2.pdf')
                }
            ]
        },
        {
            section: '國小高年級(第十屆聯合盃作文大賽-決賽題目)',
            data: [{
                title: commonTitle,
                back: 'Review',
                itemTitle: '決賽',
                pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/final/2.pdf')
            }]
        }
    ],
    [
        {
            section: '國七(第十屆聯合盃作文大賽-初賽題目)',
            data: [
                {
                    title: '台北',
                    back: 'Review',
                    itemTitle: '台北',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/01/3.pdf')
                },
                {
                    title: '宜蘭',
                    back: 'Review',
                    itemTitle: '宜蘭',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/02/3.pdf')
                },
                {
                    title: '花蓮',
                    back: 'Review',
                    itemTitle: '花蓮',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/03/3.pdf')
                },
                {
                    title: '新北',
                    back: 'Review',
                    itemTitle: '新北',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/04/3.pdf')
                },
                {
                    title: '桃園',
                    back: 'Review',
                    itemTitle: '桃園',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/05/3.pdf')
                },
                {
                    title: '新竹',
                    back: 'Review',
                    itemTitle: '新竹',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/06/3.pdf')
                },
                {
                    title: '台中',
                    back: 'Review',
                    itemTitle: '台中',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/07/3.pdf')
                },
                {
                    title: '南投',
                    back: 'Review',
                    itemTitle: '南投',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/08/3.pdf')
                },
                {
                    title: '雲林',
                    back: 'Review',
                    itemTitle: '雲林',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/09/3.pdf')
                },
                {
                    title: '嘉義',
                    back: 'Review',
                    itemTitle: '嘉義',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/10/3.pdf')
                },{
                    title: '台南',
                    back: 'Review',
                    itemTitle: '台南',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/11/3.pdf')
                },
                {
                    title: '高雄',
                    back: 'Review',
                    itemTitle: '高雄',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/12/3.pdf')
                },
                {
                    title: '金門',
                    back: 'Review',
                    itemTitle: '金門',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/13/3.pdf')
                }
            ]
        },
        {
            section: '國七(第十屆聯合盃作文大賽-決賽題目)',
            data: [{
                title: commonTitle,
                back: 'Review',
                itemTitle: '決賽',
                pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/final/3.pdf')
            }]
        }
    ],
    [
        {
            section: '國八(第十屆聯合盃作文大賽-初賽題目)',
            data: [
                {
                    title: '台北',
                    back: 'Review',
                    itemTitle: '台北',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/01/4.pdf')
                },
                {
                    title: '宜蘭',
                    back: 'Review',
                    itemTitle: '宜蘭',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/02/4.pdf')
                },
                {
                    title: '花蓮',
                    back: 'Review',
                    itemTitle: '花蓮',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/03/4.pdf')
                },
                {
                    title: '新北',
                    back: 'Review',
                    itemTitle: '新北',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/04/4.pdf')
                },
                {
                    title: '桃園',
                    back: 'Review',
                    itemTitle: '桃園',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/05/4.pdf')
                },
                {
                    title: '新竹',
                    back: 'Review',
                    itemTitle: '新竹',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/06/4.pdf')
                },
                {
                    title: '台中',
                    back: 'Review',
                    itemTitle: '台中',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/07/4.pdf')
                },
                {
                    title: '南投',
                    back: 'Review',
                    itemTitle: '南投',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/08/4.pdf')
                },
                {
                    title: '雲林',
                    back: 'Review',
                    itemTitle: '雲林',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/09/4.pdf')
                },
                {
                    title: '嘉義',
                    back: 'Review',
                    itemTitle: '嘉義',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/10/4.pdf')
                },{
                    title: '台南',
                    back: 'Review',
                    itemTitle: '台南',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/11/4.pdf')
                },
                {
                    title: '高雄',
                    back: 'Review',
                    itemTitle: '高雄',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/12/4.pdf')
                },
                {
                    title: '金門',
                    back: 'Review',
                    itemTitle: '金門',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/13/4.pdf')
                }
            ]
        },
        {
            section: '國八(第十屆聯合盃作文大賽-決賽題目)',
            data: [{
                title: commonTitle,
                back: 'Review',
                itemTitle: '決賽',
                pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/final/4.pdf')
            }]
        }
    ],
    [
        {
            section: '國九(第十屆聯合盃作文大賽-初賽題目)',
            data: [
                {
                    title: '台北',
                    back: 'Review',
                    itemTitle: '台北',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/01/5.pdf')
                },
                {
                    title: '宜蘭',
                    back: 'Review',
                    itemTitle: '宜蘭',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/02/5.pdf')
                },
                {
                    title: '花蓮',
                    back: 'Review',
                    itemTitle: '花蓮',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/03/5.pdf')
                },
                {
                    title: '新北',
                    back: 'Review',
                    itemTitle: '新北',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/04/5.pdf')
                },
                {
                    title: '桃園',
                    back: 'Review',
                    itemTitle: '桃園',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/05/5.pdf')
                },
                {
                    title: '新竹',
                    back: 'Review',
                    itemTitle: '新竹',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/06/5.pdf')
                },
                {
                    title: '台中',
                    back: 'Review',
                    itemTitle: '台中',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/07/5.pdf')
                },
                {
                    title: '南投',
                    back: 'Review',
                    itemTitle: '南投',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/08/5.pdf')
                },
                {
                    title: '雲林',
                    back: 'Review',
                    itemTitle: '雲林',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/09/5.pdf')
                },
                {
                    title: '嘉義',
                    back: 'Review',
                    itemTitle: '嘉義',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/10/5.pdf')
                },{
                    title: '台南',
                    back: 'Review',
                    itemTitle: '台南',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/11/5.pdf')
                },
                {
                    title: '高雄',
                    back: 'Review',
                    itemTitle: '高雄',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/12/5.pdf')
                },
                {
                    title: '金門',
                    back: 'Review',
                    itemTitle: '金門',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/13/5.pdf')
                }
        ]
        },
        {
            section: '國九(第十屆聯合盃作文大賽-決賽題目)',
            data: [{
                title: commonTitle,
                back: 'Review',
                itemTitle: '決賽',
                pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/final/5.pdf')
            }]
        }
    ],
    [
        {
            section: '高中(第十屆聯合盃作文大賽-初賽題目)',
            data: [

                {
                    title: '台北',
                    back: 'Review',
                    itemTitle: '台北',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/01/6.pdf')
                },
                {
                    title: '宜蘭',
                    back: 'Review',
                    itemTitle: '宜蘭',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/02/6.pdf')
                },
                {
                    title: '花蓮',
                    back: 'Review',
                    itemTitle: '花蓮',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/03/6.pdf')
                },
                {
                    title: '新北',
                    back: 'Review',
                    itemTitle: '新北',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/04/6.pdf')
                },
                {
                    title: '桃園',
                    back: 'Review',
                    itemTitle: '桃園',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/05/6.pdf')
                },
                {
                    title: '新竹',
                    back: 'Review',
                    itemTitle: '新竹',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/06/6.pdf')
                },
                {
                    title: '台中',
                    back: 'Review',
                    itemTitle: '台中',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/07/6.pdf')
                },
                {
                    title: '南投',
                    back: 'Review',
                    itemTitle: '南投',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/08/6.pdf')
                },
                {
                    title: '雲林',
                    back: 'Review',
                    itemTitle: '雲林',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/09/6.pdf')
                },
                {
                    title: '嘉義',
                    back: 'Review',
                    itemTitle: '嘉義',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/10/6.pdf')
                },{
                    title: '台南',
                    back: 'Review',
                    itemTitle: '台南',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/11/6.pdf')
                },
                {
                    title: '高雄',
                    back: 'Review',
                    itemTitle: '高雄',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/12/6.pdf')
                },
                {
                    title: '金門',
                    back: 'Review',
                    itemTitle: '金門',
                    pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/init/13/6.pdf')
                }

            ]
        },
        {
            section: '高中(第十屆聯合盃作文大賽-決賽題目)',
            data: [{
                title: commonTitle,
                back: 'Review',
                itemTitle: '台南市決賽',
                pageUrl: this.adaptiveUri('https://educoco.udn.com/edm/w2018/final/6.pdf')
            }]
        }
    ]
    ]

    configObjs[Number(this.props.selectedLevel.awardLevel)-1].map(
        (configObj, index)=>{
            container.push(<View style={styles.sectionStyle} key={'section'+index}>
                <Text style={styles.sectionText}>{configObj.section}</Text></View>);
            configObj.data.map(
              (configObjData, index)=>{
                  container.push(<ListItem {...this.props} {...configObjData} notWeebly={true} key={configObj.section+index}/>);
              }
          )
        }
    )

        if("awardLevel" in this.props.selectedLevel){
            //pass
        }else{
            
        }
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

function mapDispatchToProps(dispatch) {

    return bindActionCreators({ selectLevel }, dispatch);
  }
  
  
function mapStateToProps(state) {
    return {
        selectedLevel: state.awardLevel
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Review);

  