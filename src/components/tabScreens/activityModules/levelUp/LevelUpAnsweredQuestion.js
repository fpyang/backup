import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { bindActionCreators } from 'redux';
import { setLevelUpHamburgerState } from '../../../../actions/index';
import LevelUpQuestionItem from './LevelUpQuestionItem';

const identationLeft = 20;
const styles = {
    page: {
        display: 'flex',
        flex: 1
    },
    scoreBar: {

    },
    article: {
        textAlign: 'justify'
    },
    contentArea: {
        backgroundColor: 'white'
    },
    statisticsBar: {
        height: 56,
        width: '100%',
        backgroundColor: '#F1F1F1',
        display: 'flex',
        alignItems: 'flex-start',
        paddingLeft: identationLeft,
        justifyContent: 'center'
    },
    statisticsText: {
        fontWeight: 'bold',
        color: 'gray'
    },
    questionTitleArea: {
       margin: identationLeft
    },
    questionTitle: {
       fontWeight: 'bold'
    },
    questionContentArea: {
        marginLeft: identationLeft,
        marginRight: identationLeft,
        marginBottom: identationLeft
    },
    questionContent: {

    },
    questionItem: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    questionSubmit: {
        width: 150,
        height: 50,
        borderRadius: 20,
        backgroundColor: '#2D82C6',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

    },
    questionSubmitText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    questionSubmitArea: {

        height: 150,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
        
    }
}
const ansN = 3;
const rightN = 0;
const mockAnsweredData = [
    {
        question: '下列何者不是Android P的使用者可能有的用戶體驗？',
        options: ['在相同的使用模式下，充電次數較原本Android系統增加。',
        '追劇時間過長，系統會自動提醒。',    
        '調整音量時，不必一定要按實體音量鍵。',
        '可以更輕鬆快速的拍攝眼前美景。'],
        correctAnswer: 1,
        userAnswer: 2,
        answered: true
    },
    {
        question: '星星的孩子會有以下哪些情況,所以需要大家的體諒與關心?(1)懂的察言觀色(2)口語表達不清楚(3)很容易有安全感(4)害怕與陌生人接觸(5)對自己的習慣相當堅持',
        options: ['(1)(2)(3)', '(1)(2)(4)', '(2)(4)(5)', '(3)(4)(5)'],
        correctAnswer: 2,
        userAnswer: 2,
        answered: true
    },
    {
        question: '下列何者不是本文的寫作目的',
        options: ['A','B','C','D'],
        correctAnswer: 3,
        userAnswer: 0,
        answered: true
    }
];
const mockUnansweredData = [
    {
        question: '本文稱小光是星星的孩子, 是因為小光患有:',
        options: ['恐慌症','強迫症','自閉症','憂鬱症'],
        correctAnswer: 1,
        userAnswer: 2,
        answered: false
    },
    {
        question: '星星的孩子會有以下哪些情況,所以需要大家的體諒與關心?(1)懂的察言觀色(2)口語表達不清楚(3)很容易有安全感(4)害怕與陌生人接觸(5)對自己的習慣相當堅持',
        options: ['(1)(2)(3)', '(1)(2)(4)', '(2)(4)(5)', '(3)(4)(5)'],
        correctAnswer: 2,
        userAnswer: 2,
        answered: false
    },
    {
        question: '下列何者不是本文的寫作目的',
        options: ['A','B','C','D'],
        correctAnswer: 3,
        userAnswer: 0,
        answered: false
    }
];
class LevelUpAnsweredQuestion extends Component{
    constructor(props){
        super(props);
        this.state = {
            active: false
        }
    }
    render(){
        return (
            <View style={styles.page}>
                <View style={styles.statisticsBar}>
                <Text style={styles.statisticsText}> 題數: {ansN} {'  '} 答對: {rightN} </Text>
                </View>
                <ScrollView style={styles.contentArea}>
                
                <View style={styles.questionTitleArea}>
                    <Text style={styles.questionTitle}>挑戰AI極限 Google要玩什麼</Text>
                </View>

                <View style={styles.questionContentArea}>

                    <Text style={styles.article} >  Google本月8日到10日在加州山景城的海岸線圓形劇場舉辦一年一度的Google I/O開發者大會，吸引來自全球7000多名開發人員共襄盛舉，今年主題強調人工智慧（Artificial Intelligence，簡稱AI）扮演的關鍵角色，以及挑戰AI極限以解決現實生活的大小問題，包括大家熟知的電子郵件、地圖、新作業系統Android P公開測試和醫療應用等，其中又以Google Assistant（智慧語音助理）新增的Duplex模擬真人對話能力最引人注目。讓我們來看看本屆Google I/O部份亮點：

{"\n"}{"\n"}Google Duplex 幫你打電話{"\n"}{"\n"}

Google執行長皮伽（Sundar Pichai）在大會中播出智慧語音助理打電話給髮廊預約剪髮和致電餐廳訂位的影片顯示，智慧語音助理與店員交談過程中應對如流，店員幾乎沒有察覺到在與AI溝通，智慧語音助理的精湛表現讓外界大為驚嘆。

Google Assistant在第一通電話中表明希望在特定日期的兩個小時區間內預約剪髮，當店員告知必須了解顧客要剪哪種髮型才能預估服務時間時，Google 智慧語音助理回答：「女性的髮型」；雙方經過一番時間上的協調，雙方約好了剪髮時間。在這通電話中，Google替智慧語音助理增添了人們日常生活中的自然語調、語助詞和停頓。例如，當店員說，「好的，請給我一秒鐘」；Google智慧語音助理回答，「嗯嗯」。

在第二通電話中，Google智慧語音助理打電話到餐廳預約，接電話的店員有著很重的口音，也問了許多隨機的相關問題，但Google智慧語音助理得以應答如流甚至提問更多問題，並在思考時發出「呃」（Uhhh）的聲音，激似真人思考應答，最後完成預約。

AI語音助理與真人交談並完成指令早已不是新鮮事，但與蘋果（Apple）的Siri、亞馬遜（Amazon）的Echo，以及LINE的熊大等智慧喇叭AI溝通實在「卡卡」，這類AI咬字清晰、發音精準，卻顯得虛假而不真實。此外，絕大多數AI語音助理無法與人連續對話，需多次喚醒重啟對談。

Duplex之所以讓人驚艷，是因為它的流暢語調與擬人的思考及說話模式，讓對話另一頭未察覺自己是在跟AI對話。這是因為Google Duplex做到連續對談，加入「嗯」、「呃」等語助詞和停頓，用以彰顯AI理解對話內容，並透過語料庫主動提出問題。為增加談話內容的多元性，Google智慧語音助理現在有6種全新聲音可選擇，預計年底前會在全球80個國家上線。

{"\n"}{"\n"}智慧寫信 快速編寫電郵 {"\n"}{"\n"}

Google去年推出電子郵件（Gmail）智慧回覆功能，幫助使用者快速地回覆郵件，如今則推出由AI驅動的新功能智慧寫信（Smart Compose），幫助使用者更快速地編寫電郵。例如，智慧寫信會根據使用者輸入的字，建議完整的句子，讓使用者點擊「Tab」選用，但使用者也可以不採納這項在後台運作的功能，依照自己習慣的方式撰寫郵件。

{"\n"}{"\n"}Google地圖 相機導航不迷路{"\n"}{"\n"}

Google地圖協助人們以最短的時間或路程抵達目的地，但部分使用者往往搞不清楚地圖上的藍點指向何方。路癡的心聲，Google終於聽見了！Google此次在地圖中加入相機導航「視覺定位服務」（VPS）功能，協助使用者透過相機導航。相機會顯示使用者的位置，並透過Google地圖的街景圖資料庫比對分析，使用者的手機螢幕上就會跳出箭頭，標明使用者要去的方向，如此一來就不用再依賴藍色小點了！

此外，未來幾個月更將推出更加個人化的「探索」功能，推薦使用者所在地附近的「饕客的口袋名單」餐廳和活動，追蹤使用者去過和待挖掘的新餐廳。當使用者點選餐廳時，Google會透過「機器學習」（machine learning）技術，根據對店家的了解和評價，以及使用者透過Google地圖選擇的飲食偏好及地點，計算出「相符程度」數據，即時提供宛如「個人專屬美食專家」的建議。

{"\n"}{"\n"}Android P公測 三大亮點{"\n"}{"\n"}

Google全新作業系統「Android P beta」版有三大亮點，分別是內建AI學習技術、介面簡化更好上手，並讓使用者感受並掌控數位科技帶來的好處。

Android P結合DeepMind深度學習技術，分析使用者最常用的應用程式（App）和服務分配供電量，有效延長電池續航力，並根據裝置所在的環境及用戶喜好來調整螢幕亮度。此外，Google逐漸注意到人們手機成癮的問題，推出「應用程式儀表板」（App dashboard），提醒使用者已在某個App上停留的時間，並透過「應用程式計時器」（App timer）提醒使用者放下手機。

在使用者介面優化的部分，Android P加入了手勢動作和上滑瀏覽功能，並讓使用者可以更快速的拍照、編輯螢幕截圖、調整音量和切換App等。

{"\n"}{"\n"}眼部醫療圖像 也可預測心臟病{"\n"}{"\n"}

在醫療應用方面，Google官方部落格指出，Google兩年前研發出利用眼部醫療圖像，檢測糖尿病視網膜病變病徵的神經網絡。如今，相同的圖像可用來預測心臟病發或中風風險的深度學習模型，未來將與醫學界密切合作以了解此研究的潛力。

此外，Google透過AI模型分析匿名化的健康紀錄資訊，分析並預測未來可能發生的醫療事件機率，提醒病患留意。AI還解決了身障人士日常生活的資訊接收問題，推出「Looking to Listen」技術，透過AI深度學習分析一段影片中的影像、聲音及說話者的臉部表情，辨識是誰在說話，同時在螢幕上顯示字幕，或由觀眾指定影片中特定人臉，就能「聽見並看到」該角色的說話內容，協助聽障人士收看影音，或用以學習外語聽讀能力。
                    </Text>
                
                </View>

                <View style={styles.questionItem}>

                   {mockAnsweredData.map(
                       function(question, index){
                           return <LevelUpQuestionItem key={index} {...question}></LevelUpQuestionItem>
                       }
                   )}

                
                </View>
                <View style={styles.questionSubmitArea}>
                    <TouchableOpacity style={styles.questionSubmit}
                    onPress={
                        ()=>{
                            Alert.alert(
                                '答案不對喔, 請再接再厲',
                                '',
                                [
                                  {text: '確定', onPress: () => {}},
                                ],
                                { cancelable: false }
                              )
                        }
                    }>
                    <Text style={styles.questionSubmitText}>作答</Text>
                    </TouchableOpacity>
                </View>

                </ScrollView>
            </View>
        )
    }

}


function mapDispatchToProps(dispatch) {

    return bindActionCreators({ setLevelUpHamburgerState }, dispatch);
  }
  
  
function mapStateToProps(state) {
    return {
        writingContext: state.writingContext
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(LevelUpAnsweredQuestion);