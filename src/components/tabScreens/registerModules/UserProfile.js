import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, Modal, TouchableOpacity, TextInput, Alert } from 'react-native';
import { bindActionCreators } from 'redux';
import firebase from 'react-native-firebase';
import ModalSelector from 'react-native-modal-selector';
import { setAppStage, saveCurrentProfile } from '../../../actions/index';
import LLTextInput from '../activityModules/utilities/LLTextInput';
import RegItem from './RegItem';
import WeeblyWebView from '../activityModules/utilities/WeeblyWebView';

const identationLeft = 20;
const styles = {
    page: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    textInputHeader: {
        height: 60,
        width: '100%',
        backgroundColor: '#f2f2f2',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInputHeaderFont: {
        color: 'gray',
        fontSize: 16,
        fontWeight: 'bold'
    },
    textInputHeaderConfirm: {
        margin: 20,
        width: 120,
        height: 40,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#f2f2f2'
    },
    agreement: {
        width: '100%',
        height: 50,
        backgroundColor: '#f7f7f7',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    agreementRadioTrue: {
        height: 20,
        width: 20,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#2D82C6'
    },
    agreementRadioFalse: {
        height: 20,
        width: 20,
        borderRadius: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: '#2D82C6',
        backgroundColor: 'white'
    },
    appendix:{
        color: '#2D82C6',
        textDecorationLine: 'underline'
    }
}
const initSchoolCity = '請選擇學校縣市';
const initSchoolType = '請選擇學制';
const initSchoolLevel = '請選擇年級';
const initSchoolName = '請選擇學校名稱';
const initEmail = '請輸入電子郵件';
//const initClassCode = '請輸入班級代碼';
const initAdmission = '請輸入入場證';
const initName = '請輸入真實姓名';
class UserProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
            text: '', //name    
            schoolCity: initSchoolCity,
            schoolType: initSchoolType,
            schoolLevel: initSchoolLevel,
            schoolName: initSchoolName,
            email: '',
            admission: '',
            //classCode: '',
            emailModalVisible: false,
            admissionModalVisible: false,
            //classCodeModalVisible: false,
            serviceModalVisible: false,
            privacyModalVisible: false,
            agreement: null,
            admissionFirstTimeAlert: true
        }
        this.elementarySchools = require('../../../json/elementary_schools.json');
        this.juniorHighSchools = require('../../../json/junior_high_schools.json');
        this.seniorHighSchools = require('../../../json/senior_high_schools.json');
        this.setCurrentSchoolsList = this.setCurrentSchoolsList.bind(this);
        this.isFullFillment = this.isFullFillment.bind(this);
        this.setEmailModalVisible = this.setEmailModalVisible.bind(this);
        this.setAdmissionModalVisible = this.setAdmissionModalVisible.bind(this);
        //this.setClassCodeModalVisible = this.setClassCodeModalVisible.bind(this);
        this.setServiceModalVisible = this.setServiceModalVisible.bind(this);
        this.setPrivacyModalVisible = this.setPrivacyModalVisible.bind(this);
        this.setAgreement = this.setAgreement.bind(this);
        this.saveCurrentProfile = this.saveCurrentProfile.bind(this);
        this.getVerifyMessage = this.getVerifyMessage.bind(this);
        this.users = firebase.firestore().collection('users');
    }
    componentDidMount() {
        this.props.onRef(this)
      }
    componentWillUnmount() {
       this.props.onRef(null)
    }  
    setAgreement(agreement){
        this.setState({agreement: agreement});
    }
    setServiceModalVisible(visible){
        this.setState({serviceModalVisible: visible});
    }
    setPrivacyModalVisible(visible){
        this.setState({privacyModalVisible: visible});
    }
    setEmailModalVisible(visible) {
        this.setState({emailModalVisible: visible});
      }
    setAdmissionModalVisible(visible) {
        this.setState({admissionModalVisible: visible});
    }
    /*
    setClassCodeModalVisible(visible) {
       this.setState({classCodeModalVisible: visible});
    }*/
    setCurrentSchoolsList(schoolType, schoolCity){
        let currentSchools = [];
    
        switch(schoolType){
          case '國小':
            currentSchools = this.elementarySchools.schools.filter(
              (school)=>{
                //console.log((school.city == schoolCity), school.city, schoolCity)
                return school.city == schoolCity;
              }
            )
            .map(
              (school, index)=>{
                //Example entry: { key: 1, label: '一年級' },
                return { key: index, label: school.schoolName }
              }
            );
            break;
          case '國中':
            currentSchools = this.juniorHighSchools.schools.filter(
              (school)=>{
                return school.city === schoolCity;
              }
            )
            .map(
              (school, index)=>{
                //Example entry: { key: 1, label: '一年級' },
                return { key: index, label: school.schoolName }
              }
            );
            break;
          case '高中職':
            currentSchools = this.seniorHighSchools.schools.filter(
              (school)=>{
                return school.city === schoolCity;
              }
            )
            .map(
              (school, index)=>{
                //Example entry: { key: 1, label: '一年級' },
                return { key: index, label: school.schoolName }
              }
            );
            break;
          default:
            break;
        }
        this.setState({currentSchoolsList: currentSchools});
        //this.props.regSchoolsList(currentSchools);//save currentSchoolList to redux   
        return currentSchools;
    }
    //check if four entries are filled
    isFullFillment(){
        let hasCity = this.state.schoolCity;
        let hasName = this.state.schoolName;
        let hasType = this.state.schoolType;
        let hasLevel = this.state.schoolLevel;
        let hasAgreement = this.state.agreement;
    }

    getVerifyMessage(){     
        let errorMsg = '';
        let verifiedResult = true;

        if(this.state.text === ''){
            errorMsg += '請輸入姓名 \n';
            verifiedResult = false;
        }

        if(this.state.schoolCity === initSchoolCity){
            errorMsg += '請選擇學校縣市 \n';
            verifiedResult = false;
        }

        if(this.state.schoolType === initSchoolType){
            errorMsg += '請選擇學校類型 \n';
            verifiedResult = false;
        }

        if(this.state.schoolLevel === initSchoolLevel){
            errorMsg += '請選擇學校年級 \n';
            verifiedResult = false;
        }

        if(this.state.schoolLevel === initSchoolLevel){
            errorMsg += '請選擇學校年級 \n';
            verifiedResult = false;
        }

        if(this.state.agreement === null){
            errorMsg += '請選擇是否同意隱私權條款 \n';
            verifiedResult = false;
        }

        return ({
            verifiedResult,
            errorMsg
        });
        

    }
    //Save current user profile to redux store
    saveCurrentProfile(){
        let user = {
            name: this.state.text,
            schoolCity: this.state.schoolCity,
            schoolType: this.state.schoolType,
            schoolLevel: this.state.schoolLevel,
            schoolName: this.state.schoolName,
            email: this.state.email,
            admission: this.state.admission,
            //classCode: this.state.classCode,
            agreement: this.state.agreement,
            uid: this.props.signIn.user.uid,
            phoneNumber: this.props.signIn.user.phoneNumber
        };
        
        //check if the required fields of user profile have been completed
        let verifyMessage = this.getVerifyMessage();
        if (verifyMessage.verifiedResult){
            //over-write a doc 
            this.users.doc(this.props.signIn.user.uid).set({
                name: this.state.text,
                schoolCity: this.state.schoolCity,
                schoolType: this.state.schoolType,
                schoolLevel: this.state.schoolLevel,
                schoolName: this.state.schoolName,
                email: this.state.email,
                admission: this.state.admission,
                //classCode: this.state.classCode,
                uid: this.props.signIn.user.uid,
                phoneNumber: this.props.signIn.user.phoneNumber,
                funwordGroup: this.props.signIn.user.funwordGroup
            });

            //move to the next step
            this.props.saveCurrentProfile(user);
            this.props.setAppStage('Login');

        }else{
            Alert.alert(
                '個人資訊尚未完整填寫',
                verifyMessage.errorMsg,
                [
                {text: '確認', onPress: () => {}},
                ],
                { cancelable: false }
            );
        }

        

        

    }

    setSchoolType(schoolType){
        this.setState(schoolType);
        this.setState({schoolLevel: initSchoolLevel});//reset schoolLevel
        this.setState({schoolName: initSchoolName});//reset schoolName
        //check if completed
        this.isFullFillment();
        if(this.state.schoolCity != initSchoolCity){
        let schoolList = this.setCurrentSchoolsList(schoolType.schoolType, this.state.schoolCity);
        
        }else{
        }

        if(schoolType.schoolType === '國小'){
        this.setState(
            {'levelData':
            [
                { key: 0, section: true, label: '年級' },
                { key: 1, label: '一年級' },
                { key: 2, label: '二年級' },
                { key: 3, label: '三年級' },
                { key: 4, label: '四年級' },
                { key: 5, label: '五年級' },
                { key: 6, label: '六年級' }
            ]
        }
        );
        }
        if(schoolType.schoolType === '國中'){
        this.setState(
            {'levelData':
            [
                { key: 0, section: true, label: '年級' },
                { key: 1, label: '國七' },
                { key: 2, label: '國八' },
                { key: 3, label: '國九' }
            ]
        }
        );
        }
        if(schoolType.schoolType === '高中職'){
        this.setState(
            {'levelData':
            [
                { key: 0, section: true, label: '年級' },
                { key: 1, label: '一年級' },
                { key: 2, label: '二年級' },
                { key: 3, label: '三年級' }
            ]
        }
        );
        }
    }

    setSchoolLevel(schoolLevel){
        this.setState(schoolLevel);
        //check if completed
        this.isFullFillment();

    }

    setSchoolCity(schoolCity){
        
        this.setState(schoolCity);
        this.setState({schoolName: initSchoolName});

        if(this.state.schoolType != initSchoolType){
        this.setCurrentSchoolsList(this.state.schoolType, schoolCity.schoolCity);
        }else{
        }

        let reduceSchools = this.elementarySchools.schools.filter(
        (school)=>{
            return school.city === schoolCity.schoolCity;
        }
        );
        //this.props.regSchoolCity(schoolCity.schoolCity);
    }

    setSchoolName(schoolName){
        
        this.setState(schoolName);
        
    }

    fetchCity(){
        let index = 0;
        const data = [
            { key: index++, section: true, label: '縣市' },
            { key: index++, label: "新北市" },
            { key: index++, label: "臺北市" },
            { key: index++, label: "桃園市" },
            { key: index++, label: "臺中市" },
            { key: index++, label: "臺南市" },
            { key: index++, label: "高雄市" },
            { key: index++, label: "宜蘭縣" },
            { key: index++, label: "新竹縣" },
            { key: index++, label: "苗栗縣" },
            { key: index++, label: "彰化縣" },
            { key: index++, label: "南投縣" },
            { key: index++, label: "雲林縣" },
            { key: index++, label: "嘉義縣" },
            { key: index++, label: "屏東縣" },
            { key: index++, label: "臺東縣" },
            { key: index++, label: "花蓮縣" },
            { key: index++, label: "澎湖縣" },
            { key: index++, label: "基隆市" },
            { key: index++, label: "新竹市" },
            { key: index++, label: "嘉義市" },
            { key: index++, label: "金門縣" },
            { key: index++, label: "連江縣" }
        ];
        return data;
    }
    fetchSchoolType(){
        let index = 0;
        const data = [
            { key: index++, section: true, label: '學制' },
            { key: index++, label: '國小' },
            { key: index++, label: '國中' },
            { key: index++, label: '高中職' }
        ];
        return data;
    }
    fetchLevel(){
        let index = 0;
        const data = [
            { key: index++, section: true, label: '年級' },
            { key: index++, label: '一年級' },
            { key: index++, label: '二年級' },
            { key: index++, label: '三年級' }
        ];
        return data;
    }
    fetchSchool(){
        let index = 0;
        //TODO: save currentSchoolList to redux

        let data = this.state.currentSchoolsList;
        /*
        [
            { key: index++, section: true, label: '學校' },
            { key: index++, label: '立人國小' },
            { key: index++, label: '新興國中' },
            { key: index++, label: '台南一中' }
        ];
        */
        return data;
    }
    /*
    
                autoCapitalize={'none'}
    */
    render(){
        let index = 0;
        return (
            <ScrollView style={styles.page}>
            <View style={{height: 50, justifyContent: 'flex-end', padding: 5}}>
                <Text>
                學生姓名 ＊若要查詢聯合盃成績請務必填寫真實姓名
                </Text>
            </View>
            <View>
            <LLTextInput
                autoCorrect={false}
                underlineColorAndroid={'transparent'}
                style={{height: 50, width: '100%', backgroundColor: 'white'}}
                onChangeText={(text) => this.setState({text})}
                placeholder={initName}
                maxLength={10}
                onEndEditing={()=>{}}
                value={this.state.text}
            />
            </View>
            <View style={{height: 50, justifyContent: 'flex-end', padding: 5}}>
                <Text>
                學校資訊
                </Text>
            </View>

                <ModalSelector
                    data={this.fetchCity()}
                    style={styles.container}
                    initValue=""
                    cancelText="取消"
                    onChange={(option)=>{ this.setSchoolCity({schoolCity:option.label})}}>

                <RegItem must={true} fieldType={"學校縣市"} prompt={this.state.schoolCity}/>

                </ModalSelector>

                <ModalSelector
                    data={this.fetchSchoolType()}
                    style={styles.container}
                    initValue=""
                    cancelText="取消"
                    onChange={(option)=>{ this.setSchoolType({schoolType:option.label})}}>

                <RegItem must={true} fieldType={"學校類型"} prompt={this.state.schoolType}/>

                </ModalSelector>

                <ModalSelector
                    data={this.state.levelData}
                    style={styles.container}
                    initValue=""
                    cancelText="取消"
                    onChange={(option)=>{ this.setSchoolLevel({schoolLevel:option.label})}}>
                
                <RegItem must={true} fieldType={"學校年級"} prompt={this.state.schoolLevel}/>

                </ModalSelector>

                <ModalSelector
                    data={this.fetchSchool()}
                    style={styles.container}
                    initValue=""
                    cancelText="取消"
                    onChange={(option)=>{ this.setSchoolName({schoolName:option.label})}}>

                <RegItem must={true} fieldType={"學校名稱"} prompt={this.state.schoolName}/>

                </ModalSelector>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.emailModalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <View>
                        <View style={styles.textInputHeader}>
                            <Text style={styles.textInputHeaderFont}>{initEmail}</Text>
                        </View>
                        <View>        
                        <LLTextInput
                                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                                placeholder={initEmail}
                                underlineColorAndroid={'transparent'}
                                defaultValue={''}
                                autoCorrect={false}
                                autoCapitalize={'none'}
                                onChangeText={
                                    (email) => {
                                        this.setState({email});
                                    }
                                }
                                value={this.state.email}
                            />
                        <TouchableOpacity
                            onPress={() => {
                            this.setEmailModalVisible(!this.state.emailModalVisible);
                            }}>
                            <View style={styles.textInputHeaderConfirm}>
                                <Text style={styles.textInputHeaderFont}> 確定 </Text>
                            </View>
                        </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <TouchableOpacity
                            onPress={() => {
                            this.setEmailModalVisible(true);
                            }}>
                            <RegItem 
                                textInput={true} 
                                must={false} 
                                fieldType={"Email"} 
                                prompt={this.state.email}
                                promptText={initEmail}
                                />
                </TouchableOpacity>


                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.admissionModalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <View>
                        <View style={styles.textInputHeader}>
                            <Text style={styles.textInputHeaderFont}>{initAdmission}</Text>
                        </View>
                        <View>        
                        <LLTextInput
                                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                                placeholder={initAdmission}
                                underlineColorAndroid={'transparent'}
                                defaultValue={''}
                                autoCorrect={false}
                                autoCapitalize={'none'}
                                onChangeText={
                                    (admission) => {
                                        this.setState({admission});
                                    }
                                }
                                value={this.state.admission}
                            />
                        <TouchableOpacity
                            onPress={() => {
                               
                                this.setAdmissionModalVisible(!this.state.admissionModalVisible);
                                               
                            }}>
                            <View style={styles.textInputHeaderConfirm}>
                                <Text style={styles.textInputHeaderFont}> 確定 </Text>
                            </View>
                        </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                


                <View style={styles.agreement}>
                    <TouchableOpacity 
                    onPress={()=>{
                        this.setAgreement(!this.state.agreement);
                    }}
                    >
                        {this.state.agreement && <View style={styles.agreementRadioTrue}></View>}
                        {!this.state.agreement && <View style={styles.agreementRadioFalse}></View>}
                    </TouchableOpacity>
                    <Text>我已完全同意本</Text>
                    <TouchableOpacity 
                        onPress={()=>{
                            this.setServiceModalVisible(true);
                        }}>
                        <Text style={styles.appendix}>
                        服務條款</Text></TouchableOpacity>
                    <Text>及</Text>
                    <TouchableOpacity 
                        onPress={()=>{
                            this.setPrivacyModalVisible(true);
                        }}>
                        <Text style={styles.appendix}>
                        隱私權政策</Text></TouchableOpacity>
                    <Text>的所有約定</Text>
                </View>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.serviceModalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <View style={{flex: 1}}>
                        <View style={styles.textInputHeader}>
                            <Text style={styles.textInputHeaderFont}>服務條款</Text>
                        </View>
                        <View style={{flex: 1}}>        
                        <WeeblyWebView 
                            source={{uri: 'https://ucampusapp.weebly.com/serviceterms.html'}} 
                            startInLoadingState={true}/>
                            
                        <TouchableOpacity
                            onPress={() => {
                            this.setServiceModalVisible(!this.state.serviceModalVisible);
                            }}>
                            <View style={styles.textInputHeaderConfirm}>
                                <Text style={styles.textInputHeaderFont}> 確定 </Text>
                            </View>
                        </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.privacyModalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <View style={{flex: 1}}>
                        <View style={styles.textInputHeader}>
                            <Text style={styles.textInputHeaderFont}>隱私權政策</Text>
                        </View>
                        <View style={{flex: 1}}>        
                        <WeeblyWebView 
                            source={{uri: 'https://ucampusapp.weebly.com/privacy.html'}} 
                            startInLoadingState={true}/>
                        
                        <TouchableOpacity
                            onPress={() => {
                            this.setPrivacyModalVisible(!this.state.privacyModalVisible);
                            }}>
                            <View style={styles.textInputHeaderConfirm}>
                                <Text style={styles.textInputHeaderFont}> 確定 </Text>
                            </View>
                        </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            </ScrollView>
        )
    }

}

/*
            <TouchableOpacity
                            onPress={() => {
                            
                            if(this.state.admissionFirstTimeAlert){
                                Alert.alert(
                                    '入場證號碼將與手機號碼綁定，\n每一支手機只能查詢一個成績。',
                                    '',
                                    [
                                    {text: '確認', onPress: () => {
                                        this.setState({admissionFirstTimeAlert: false});
                                        this.setAdmissionModalVisible(true);
                                        
                                    }},
                                    ],
                                    { cancelable: false }
                                );
                            }else{
                                this.setAdmissionModalVisible(true);
                            }  
                            }}>
                            <RegItem 
                                textInput={true} 
                                must={false} 
                                fieldType={"入場證"} 
                                prompt={this.state.admission}
                                promptText={initAdmission}
                                />
                </TouchableOpacity>
*/



/*

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.classCodeModalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <View>
                        <View style={styles.textInputHeader}>
                            <Text style={styles.textInputHeaderFont}>{initClassCode}</Text>
                        </View>
                        <View>        
                <LLTextInput
                                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                                placeholder={initClassCode}
                                defaultValue={''}
                                autoCorrect={false}
                                autoCapitalize={'none'}
                                underlineColorAndroid={'transparent'}
                                onChangeText={
                                    (classCode) => {
                                        this.setState({classCode});
                                    }
                                }
                                value={this.state.classCode}
                            />
                        <TouchableOpacity
                            onPress={() => {
                            this.setClassCodeModalVisible(!this.state.classCodeModalVisible);
                            }}>
                            <View style={styles.textInputHeaderConfirm}>
                                <Text style={styles.textInputHeaderFont}> 確定 </Text>
                            </View>
                        </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <TouchableOpacity
                            onPress={() => {
                            this.setClassCodeModalVisible(true);
                            }}>
                            <RegItem 
                                textInput={true} 
                                must={false} 
                                fieldType={"班級代碼"} 
                                prompt={this.state.classCode}
                                promptText={initClassCode}
                                />
                </TouchableOpacity>
*/


function mapDispatchToProps(dispatch) {

    return bindActionCreators({ setAppStage, saveCurrentProfile }, dispatch);
  }
  
  
function mapStateToProps(state) {
    return {
        signIn: state.signIn
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);