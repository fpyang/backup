import React, { Component } from 'react';
import { View, Text, ScrollView, Modal, TouchableOpacity, TextInput, Alert } from 'react-native';
import firebase from 'react-native-firebase';
import ModalSelector from 'react-native-modal-selector';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signOut, saveCurrentProfile, setAppStage, setRegStage } from '../../actions/index';
import TitleBar from './tabDecorators/TitleBar';
import RegItem from './registerModules/RegItem';
import LLTextInput from './activityModules/utilities/LLTextInput';

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
    appendix:{
        color: '#2D82C6',
        textDecorationLine: 'underline'
    },
    phoneSpace: {
        display: 'flex',
        width: '100%',
        height: 60,
        backgroundColor: 'white',
        margin: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 8 
    },
    logoutSpace:{
        display: 'flex',
        width: '100%',
        height: 60,
        backgroundColor: 'white',
        margin: 2,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 8 
    },
    logout: {
        color: 'red'
    }
}

class SettingsScreen extends Component{
    constructor(props){
        super(props);
        this.elementarySchools = require('../../json/elementary_schools.json');
        this.juniorHighSchools = require('../../json/junior_high_schools.json');
        this.seniorHighSchools = require('../../json/senior_high_schools.json');
        this.state = {
            elementarySchools: null,
            juniorHighSchools: null,
            seniorHighSchools: null,
            loading: true,
            name: this.props.signIn.user.name, //name    
            schoolCity: this.props.signIn.user.schoolCity,
            schoolType: this.props.signIn.user.schoolType,
            schoolLevel: this.props.signIn.user.schoolLevel,
            schoolName: this.props.signIn.user.schoolName,
            email: this.props.signIn.user.email,
            admission: this.props.signIn.user.admission,
            //classCode: this.props.signIn.user.classCode,
            nameModalVisible: false,
            emailModalVisible: false,
            admissionModalVisible: false,
            //classCodeModalVisible: false,
            serviceModalVisible: false,
            agreement: '', //this.props.signIn.user.agreement
        }
        this.syncCurrentUserProfile = this.syncCurrentUserProfile.bind(this);
        this.setCurrentSchoolsList = this.setCurrentSchoolsList.bind(this);
        this.setCurrentSchoolType = this.setCurrentSchoolType.bind(this);
        this.setEmailModalVisible = this.setEmailModalVisible.bind(this);
        this.setAdmissionModalVisible = this.setAdmissionModalVisible.bind(this);
        //this.setClassCodeModalVisible = this.setClassCodeModalVisible.bind(this);
        this.setNameModalVisible = this.setNameModalVisible.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
        this.logout = this.logout.bind(this);
        this.users = firebase.firestore().collection('users');
        //this.syncCurrentUserProfile();
        //this.setSchoolType(this.state.schoolType);
    }
    componentWillMount(){

        fetch(('https://ucampus-89e65.firebaseapp.com/static/json/elementary_schools.json'), {
            method: 'GET'}).then((response) => {
              if (response.status === 200) {
                response.json().then(json => {
                                      this.setState(Object.assign({}, this.state, {'elementarySchools': json, 'loading': false}));
                                      
                                    });
              } else {
                //console.log(response.status);
              }
            })
            .catch((error) => {
              //console.log(error);
            });
        fetch(('https://ucampus-89e65.firebaseapp.com/static/json/senior_high_schools.json'), {
            method: 'GET'}).then((response) => {
                if (response.status === 200) {
                response.json().then(json => {
                                        this.setState(Object.assign({}, this.state, {'seniorHighSchools': json, 'loading': false}));
                                        
                                    });
                } else {
                //console.log(response.status);
                }
            })
            .catch((error) => {
                //console.log(error);
            });
        fetch(('https://ucampus-89e65.firebaseapp.com/static/json/junior_high_schools.json'), {
            method: 'GET'}).then((response) => {
                if (response.status === 200) {
                response.json().then(json => {
                                        this.setState(Object.assign({}, this.state, {'juniorHighSchools': json, 'loading': false}));
                                        
                                    });
                } else {
                //console.log(response.status);
                }
            })
            .catch((error) => {
                //console.log(error);
            });
    }
    componentDidMound(){
        //this.syncCurrentUserProfile();     
    }

    /*
    onCollectionUpdate = (querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
            if(doc.uid == this.signIn.user.uid){
                const { classCode, admission, email, schoolName, schoolLevel, schoolType, schoolCity, name } = doc.data();
                users.push({
                    key: doc.id,
                    doc, // DocumentSnapshot
                    classCode, admission, email, schoolName, schoolLevel, schoolType, schoolCity, name
                });
            }
        
        });
        this.setState({ 
            user: users[0],
            loading: false,
        });
    }
    */

    setNameModalVisible(visible) {
        this.setState({nameModalVisible: visible});
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

    syncCurrentUserProfile(fun){
        
        this.setState({
            name: this.props.signIn.user.name,
            schoolCity: this.props.signIn.user.schoolCity,
            schoolType: this.props.signIn.user.schoolType,
            schoolLevel: this.props.signIn.user.schoolLevel,
            schoolName: this.props.signIn.user.schoolName,
            email: this.props.signIn.user.email,
            phoneNumber: this.props.signIn.user.phoneNumber
        }, ()=>{ fun()
            
            
            /*
            this.users.where("uid", "==", this.props.signIn.user.uid).get()
            .then(querySnapshot => {
                 querySnapshot.forEach(documentSnapshot => {
                     //this.setSchoolCity(documentSnapshot.data().schoolCity);
                     //this.setSchoolType(documentSnapshot.data().schoolType);
                     this.setCurrentSchoolsList(
                        documentSnapshot.data().schoolType,
                        documentSnapshot.data().schoolCity
                     );
                     this.setCurrentSchoolType(documentSnapshot.data().schoolType);
                     this.setState({testit: documentSnapshot.data()});
                     this.setState({
                        name: documentSnapshot.data().name,
                        schoolCity: documentSnapshot.data().schoolCity,
                        schoolType: documentSnapshot.data().schoolType,
                        schoolLevel: documentSnapshot.data().schoolLevel,
                        schoolName: documentSnapshot.data().schoolName,
                        email: documentSnapshot.data().email,
                        admission: documentSnapshot.data().admission,
                        classCode: documentSnapshot.data().classCode,
                        agreement: documentSnapshot.data().agreement,
                        uid: documentSnapshot.data().uid,
                        phoneNumber: documentSnapshot.data().phoneNumber
                    });
                 });
               
            }); */
        });
        
    }

    setCurrentSchoolsList(schoolType, schoolCity){
        let currentSchools = [];
    
        switch(schoolType){
          case '國小':
            currentSchools = this.state.elementarySchools.schools.filter(
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
            currentSchools = this.state.juniorHighSchools.schools.filter(
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
            currentSchools = this.state.seniorHighSchools.schools.filter(
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

    setCurrentSchoolType(schoolType){
        if(schoolType === '國小'){
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
            if(schoolType === '國中'){
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
            if(schoolType === '高中職'){
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

    setSchoolType(schoolType){
        this.setState({schoolLevel: '', schoolName: ''}, 
        ()=>{this.setState(schoolType, ()=>{this.updateProfile()})}
    );//reset schoolLevel
        
        
        Alert.alert(
            '小提醒',
            '更改學校類型後，請一併更改學校名稱與學校年級，才能有效更新個人資料。',
            [
            {text: '確認', onPress: () => {
                
            }},
            ],
            { cancelable: false }
        );
        //check if completed
        //this.isFullFillment();
        let schoolList = this.setCurrentSchoolsList(schoolType.schoolType, this.state.schoolCity);
        

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
        this.setState(schoolLevel, ()=>{this.updateProfile()});
        //check if completed
        //this.isFullFillment();

    }

    setSchoolCity(schoolCity){
        this.setState({schoolName: ''}, ()=>{this.setState(schoolCity, ()=>{this.updateProfile()})});
        Alert.alert(
            '小提醒',
            '更改學校縣市後，請一併更改學校名稱，才能有效更新個人資料。',
            [
                
            {text: '確認', onPress: () => {
                
            }},
            ],
            { cancelable: false }
        );
        

        this.setCurrentSchoolsList(this.state.schoolType, schoolCity.schoolCity);
      
        let reduceSchools = this.state.elementarySchools.schools.filter(
        (school)=>{
            return school.city === schoolCity.schoolCity;
        }
        );
        //this.props.regSchoolCity(schoolCity.schoolCity);
    }

    setSchoolName(schoolName){
        
        this.setState(schoolName, ()=>{this.updateProfile()});
        
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
    <LLTextInput
                underlineColorAndroid={'transparent'}
                style={{height: 50, width: '100%', backgroundColor: 'white'}}
                onChangeText={(text) => this.setState({text})}
                underlineColorAndroid='rgba(0,0,0,0)'
                autoCorrect={false}
                autoCapitalize={'none'}
                placeholder={''}
                maxLength={10}
                value={'' + this.state.text}
            />
    */
    updateProfile(){
        /*
        Alert.alert(
            '。',
            `${this.state.text + this.state.schoolCity + this.state.schoolLevel + this.state.schoolName
            + this.state.admission + this.state.classCode + this.state.email + this.state.schoolType}`,
            [
            {text: '確認', onPress: () => {
                
            }},
            ],
            { cancelable: false }
        );
        */

       let user = {
        name: this.state.name,
        schoolCity: this.state.schoolCity,
        schoolType: this.state.schoolType,
        schoolLevel: this.state.schoolLevel,
        schoolName: this.state.schoolName,
        email: this.state.email,
        admission: this.state.admission,
        //classCode: this.state.classCode,
        agreement: this.props.signIn.user.agreement,
        uid: this.props.signIn.user.uid,
        phoneNumber: this.props.signIn.user.phoneNumber,
        funwordGroup: this.props.signIn.user.funwordGroup
    };

    this.props.saveCurrentProfile(user);

       

       let errorMsg = '';
       let alertDialog = false;
       if(this.state.schoolLevel == ''){
        errorMsg = errorMsg + '請選擇學校年級\n';
        alertDialog = true;
       }
       if(this.state.schoolName == ''){
        errorMsg = errorMsg + '請選擇學校名稱\n';  
        alertDialog = true; 
       }   
       if(alertDialog){
        /*Alert.alert(
            '資料缺漏',
            errorMsg,
            [
            {text: '確認', onPress: () => {
                
            }},
            ],
            { cancelable: false }
        );*/
       }else{
           //Update here

          
    
        //over-write a doc 
        this.users.doc(this.props.signIn.user.uid).set({
            name: this.state.name,
            schoolCity: this.state.schoolCity,
            schoolType: this.state.schoolType,
            schoolLevel: this.state.schoolLevel,
            schoolName: this.state.schoolName,
            email: this.state.email,
            admission: this.state.admission,
            //classCode: this.state.classCode,
            agreement: this.props.signIn.user.agreement,
            uid: this.props.signIn.user.uid,
            phoneNumber: this.props.signIn.user.phoneNumber,
            funwordGroup: this.props.signIn.user.funwordGroup
        });

        //move to the next step
        

            
        }
    }
    logout(){
        this.props.signOut();
        //this.props.setRegStage('Phone');
        //this.props.setAppStage('Registering');
        
    }
    render(){
        let index = 0;
                return (
                    <View style={{flex: 1}}>
                    <TitleBar title={'設定'}/>
                    {
                        <ScrollView style={styles.page}>
                        
                        <View style={{height: 50, justifyContent: 'flex-end', padding: 5}}>
                            <Text>
                            學生姓名 ＊請務必填寫真實姓名及學校以利未來個人學習歷程紀錄與查詢 
                            </Text>
                           
                        </View>
                        
                        <Modal
                                animationType="slide"
                                transparent={false}
                                visible={this.state.nameModalVisible}
                                onRequestClose={() => {
                                    //alert('Modal has been closed.');
                                }}>
                                <View>
                                    <View style={styles.textInputHeader}>
                                        <Text style={styles.textInputHeaderFont}>{'姓名'}</Text>
                                    </View>
                                    <View>        
                                    <LLTextInput
                                            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                                            placeholder={''}
                                            underlineColorAndroid={'transparent'}
                                            defaultValue={''}
                                            autoCorrect={false}
                                            autoCapitalize={'none'}
                                            onChangeText={
                                                (text) => {
                                                    this.setState({name: text});
                                                }
                                            }
                                            value={'' + this.state.name}
                                        />
                                    <TouchableOpacity
                                        onPress={() => {
                                        this.setNameModalVisible(!this.state.nameModalVisible);
                                        if(this.state.name!=this.props.signIn.user.name){
                                            Alert.alert(
                                                '你確定要更改姓名?',
                                                '',
                                                [
                                                {text: '取消', onPress: () => {
                                                    this.setState({name: this.props.signIn.user.name});
                                                }, style: 'cancel'},
                                                {text: '確認', onPress: () => {
                                                    this.updateProfile();   
                                                }},
                                                ],
                                                { cancelable: false }
                                            );
                                        }
                                        
                                        
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
                                            this.syncCurrentUserProfile(()=>{this.setNameModalVisible(true)});                                
                                        }}>
                                        <RegItem 
                                            textInput={true} 
                                            must={false} 
                                            fieldType={"姓名"} 
                                            prompt={this.props.signIn.user.name}
                                            promptText={""}
                                            />
                            </TouchableOpacity>
            
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
                                onModalOpen={
                                
                                    ()=>{
                                        /*if(this.props.signIn.user.name == ''){
                                            this.syncCurrentUserProfile(()=>{});
                                        }*/
                                    }
                                }
                                onChange={(option)=>{ 
                                    if(this.props.signIn.user.schoolCity == this.state.schoolCity){
                                        //do nothing
                                    }else{
                                        this.setSchoolCity({schoolCity:option.label}, ()=>{});
                                    }    
                                    
                                }}>
            
                            <RegItem must={false} fieldType={"學校縣市"} prompt={this.props.signIn.user.schoolCity}/>
            
                            </ModalSelector>
            
                            <ModalSelector
                                data={this.fetchSchoolType()}
                                style={styles.container}
                                initValue=""
                                cancelText="取消"
                                onModalOpen={
                                    ()=>{
                                        
                                        /*
                                        if(this.props.signIn.user.name == ''){
                                            this.syncCurrentUserProfile(()=>{});
                                        }*/
                                    }
                                }
                                onChange={(option)=>{ 
                                    this.setSchoolType({schoolType:option.label}, ()=>{
                                        Alert.alert(
                                            '你確定要更改學校縣市?',
                                            '',
                                            [
                                            {text: '確認', onPress: () => {
                                                this.updateProfile();   
                                            }},
                                            ],
                                            { cancelable: false }
                                        );
                                    });
                                }}>
            
                            <RegItem must={false} fieldType={"學校類型"} prompt={this.props.signIn.user.schoolType}/>
            
                            </ModalSelector>
            
                            <ModalSelector
                                data={this.state.levelData}
                                style={styles.container}
                                initValue=""
                                cancelText="取消"
                                onModalOpen={
                                    
                                    ()=>{
                                        this.setCurrentSchoolType(this.props.signIn.user.schoolType);
                                        /*
                                        if(this.props.signIn.user.schoolCity == ''){
                                            this.syncCurrentUserProfile(()=>{});
                                        }*/
                                    }
                                }
                                onChange={(option)=>{ 
                                    
                                        this.setSchoolLevel({schoolLevel:option.label});
                                     
                                    
                                    }}>
                            
                            <RegItem must={false} fieldType={"學校年級"} prompt={this.props.signIn.user.schoolLevel}/>
            
                            </ModalSelector>
            
                            <ModalSelector
                                data={this.fetchSchool()}
                                style={styles.container}
                                initValue=""
                                cancelText="取消"
                                onModalOpen={
                                    
                                    ()=>{
                                        this.setCurrentSchoolsList(this.props.signIn.user.schoolType, this.props.signIn.user.schoolCity);
                                        /*
                                        if(this.props.signIn.user.name == ''){
                                            this.syncCurrentUserProfile(()=>{});
                                        }*/
                                    }
                                }
                                onChange={(option)=>{ 
                                    this.setSchoolName({schoolName:option.label});
                                }}>
            
                            <RegItem must={false} fieldType={"學校名稱"} prompt={this.props.signIn.user.schoolName}/>
            
                            </ModalSelector>
            
                            <Modal
                                animationType="slide"
                                transparent={false}
                                visible={this.state.emailModalVisible}
                                onRequestClose={() => {
                                    //alert('Modal has been closed.');
                                }}>
                                <View>
                                    <View style={styles.textInputHeader}>
                                        <Text style={styles.textInputHeaderFont}>{'電子郵件'}</Text>
                                    </View>
                                    <View>        
                                    <LLTextInput
                                            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                                            placeholder={''}
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
                                        Alert.alert(
                                            '你確定要更改 email?',
                                            '',
                                            [
                                            {text: '取消', onPress: () => {
                                                    this.setState({email: this.props.signIn.user.email});
                                                }, style: 'cancel'},
                                            {text: '確認', onPress: () => {
                                                this.updateProfile();   
                                            }},
                                            ],
                                            { cancelable: false }
                                        );
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
                                            prompt={this.props.signIn.user.email}
                                            promptText={''}
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
                                        <Text style={styles.textInputHeaderFont}>{'入場證'}</Text>
                                    </View>
                                    <View>        
                                    <LLTextInput
                                            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                                            placeholder={''}
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
                                            Alert.alert(
                                                '你確定要更改入場證號碼?',
                                                '',
                                                [
                                                {text: '取消', onPress: () => {
                                                        this.setState({admission: this.props.signIn.user.admission});
                                                    }, style: 'cancel'},   
                                                {text: '確認', onPress: () => {
                                                    this.updateProfile();   
                                                }},
                                                ],
                                                { cancelable: false }
                                            ); 
                                                       
                                        }}>
                                        <View style={styles.textInputHeaderConfirm}>
                                            <Text style={styles.textInputHeaderFont}> 確定 </Text>
                                        </View>
                                    </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                            
                            
            
                            
                           
            
                            <View style={{height: 50, justifyContent: 'flex-end', padding: 5}}>
                            <Text>
                            手機號碼
                            </Text>
                            </View>
                            <View style={styles.phoneSpace}>
                                <Text>{this.props.signIn.user.phoneNumber}</Text>
                            </View>
            
                            <View style={{height: 50, justifyContent: 'flex-end', padding: 5}}>
                            <Text>
                            </Text>
                            </View>
                            <TouchableOpacity 
                            style={styles.logoutSpace}
                            onPress={this.logout}
                            >
                                <Text style={styles.logout}>{'登出'}</Text>
                            </TouchableOpacity>
            
                        </ScrollView>
                    }
                    
                    </View>
                );     
                
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
                                            prompt={this.props.signIn.user.admission}
                                            promptText={''}
                                            />
                            </TouchableOpacity>
                */

        
    }
}
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
                                        <Text style={styles.textInputHeaderFont}>{'班級代碼'}</Text>
                                    </View>
                                    <View>        
                                    <LLTextInput
                                            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                                            placeholder={''}
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
                                        this.updateProfile();
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
                                            prompt={this.props.signIn.user.classCode}
                                            promptText={''}
                                            />
                            </TouchableOpacity>

*/

function mapDispatchToProps(dispatch) {

    return bindActionCreators({ signOut, saveCurrentProfile, setAppStage, setRegStage }, dispatch);
  }
  
  
function mapStateToProps(state) {
    return {
        signIn: state.signIn
    };
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);