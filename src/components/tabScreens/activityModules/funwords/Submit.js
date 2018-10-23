import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TouchableHighlight, Dimensions, Image, Alert, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import ModalSelector from 'react-native-modal-selector';
import ImagePicker from 'react-native-image-crop-picker';
import firebase from 'react-native-firebase';
import ActionSheet from 'react-native-actionsheet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AutoHeightImage from 'react-native-auto-height-image';
import { saveCurrentProfile } from '../../../../actions/index';

const {height,width}=Dimensions.get('window');
const imageSize = width/3.5;
const itemSize = 70;
const headerFontColor = '#2D82C6';
const styles = {
    submit: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 5,
        alignItems: 'center'
    },
    image: {
        height: imageSize,
        width: imageSize,
        backgroundColor: 'gray',
        margin: 2,
        resizeMode: 'contain'
    },
    imageUploaded: {
        height: imageSize,
        width: imageSize,
        backgroundColor: 'white',
        margin: 5,
        resizeMode: 'contain'
    },
    imageGroup: {
        height: imageSize,
        width: width,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    imageLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    },
    imageGroupContainer: {
        height: imageSize * 1.5,
        width: width,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    SubmitFieldItem: {
        height: itemSize,
        width: width,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderWidth: 1,
        borderColor: '#F1F1F1'
    },
    SubmitFieldTitleFixedWidth: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: 80,
        height: '100%',
        paddingLeft: 8
    },
    SubmitFieldTitle: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16
    },
    SubmitFieldContentText: {
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 16,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    SubmitFieldContent: {
        flexDirection: 'row',
        width: width - 120,
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    SubmitButton: {
        width: 150,
        height: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2D82C6'
    },
    SubmitButtonCompleted: {
        width: 150,
        height: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray'
    },
    headerText: {
        fontSize: 18,
        color: headerFontColor
    },
    headerLeft: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'      
    },
    SubmitButtonText: {
        color: 'white'
    },
    cameraCircle: {
        width: imageSize,
        height: imageSize,
        borderWidth: 2,
        borderRadius: imageSize/2,
        borderColor: '#2D82C6',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5
    }
    
}

const data = [
    { key: 0, section: true, label: '題目' },
    { key: 1, label: '簾外雨潺潺，…(李煜《浪淘沙》)' },
    { key: 2, label: '君子學道則愛人，…(《論語．陽貨》)' },
    { key: 3, label: '每個人都是天才，…(愛因斯坦語錄)', accessibilityLabel: 'Tap here for cranberries' }
];

class SubmitFieldItem extends Component{
    constructor(props){
        super(props);   
    }
    render(){
        return(
        <TouchableOpacity 
            style={styles.SubmitFieldItem}
            onPress={()=>{
                this.props.clickHander();
            }}
        >
            <View style={styles.SubmitFieldTitleFixedWidth}>
                <Text style={styles.SubmitFieldTitle}>{this.props.SubmitFieldTitle}</Text>
            </View>
            <View style={styles.SubmitFieldContent}>
            <Text style={styles.SubmitFieldContentText}>{this.props.SubmitFieldContent}</Text>
            <Icon style={styles.Clickindicator} name={'angle-right'} size={30} color={'gray'} />
            </View>
        </TouchableOpacity>);
    }
}

const initTitle='請選擇你所投稿的題目';
class Submit extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedTitle: initTitle,
            agreement: null,
            image: null,
            uploadedFile: null,
            submitted: false,
            docid: null,
            draftStatus: null,
            initAgreement: -1,
            documentId: null,
            value3Index: null,
            modalVisible: false

        }
        this.onTitleClickHandler = this.onTitleClickHandler.bind(this);
        this.onGroupClickHandler = this.onGroupClickHandler.bind(this);
        this.showActionSheet = this.showActionSheet.bind(this);
        this.renderImage=this.renderImage.bind(this);
        this.renderImageCamera=this.renderImageCamera.bind(this);
        this.uploadImageFromImagePicker = this.uploadImageFromImagePicker.bind(this);
        this.uploadImageFromCamera = this.uploadImageFromCamera.bind(this);
        this.submitWork = this.submitWork.bind(this);
        this.checkCompleteness = this.checkCompleteness.bind(this);
        this.autoAssignFunwordGroup = this.autoAssignFunwordGroup.bind(this);
        this.funword = firebase.firestore().collection('funword');
        this.users = firebase.firestore().collection('users');
        this.haveSubmited = this.haveSubmited.bind(this);
        this.renderSubmittedPage = this.renderSubmittedPage.bind(this);
        this.renderDraftPage = this.renderDraftPage.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
        this.renderBigImage = this.renderBigImage.bind(this);

        this.haveSubmited();    
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    showActionSheet(){
        this.ActionSheet.show();
    }
    onTitleClickHandler(){
    }
    onGroupClickHandler(){
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    uploadImageFromCamera(){

        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: false,
            compressImageMaxWidth: 640,
            compressImageMaxHeight: 640,
            compressImageQuality: 0.9,
            mediaType: 'photo'
        }).then(image => {
            this.setState({
            image: {uri: image.path, width: image.width, height: image.height}});
            //this.props.addImages(image);
    
        }).catch( reason => {
                //console.log( 'onRejected function called: ', reason );
        });
    
        }
    
    uploadImageFromImagePicker(){
    
        ImagePicker.openPicker({
            multiple: false,
            cropping: false,
            compressImageMaxWidth: 640,
            compressImageMaxHeight: 640,
            compressImageQuality: 0.9,
            mediaType: 'photo'
        }).then(image => {
            this.setState({
            image: {uri: image.path, width: image.width, height: image.height}});
    /*
            firebase.storage()
            .ref('/1234.jpg')
            .putFile(image.path.replace('file:/',''))
            .then(uploadedFile => {
                //success
                this.setState({upload: 'ya'});
                this.setState({uploadedFile: uploadedFile});
            })
            .catch(err => {
                //Error
                this.setState({error: err});
                this.setState({upload: 'fail'});
            });
            
    */
        }).catch( reason => {
                //console.log( 'onRejected function called: ', reason );
        });
        }
    
    renderImage(image) {
        return <Image style={styles.imageUploaded} source={image} />
    }

    renderImageCamera(){
        return(<View style={styles.cameraCircle}>
            <Icon
            name="camera" size={30}
            backgroundColor='transparent'
            color={'#2D82C6'}
            />
        </View>);
        /*return(
            <Icon
            name="camera" size={30}
            backgroundColor='transparent'
            color={'#2D82C6'}
            />);*/
    }

    renderBigImage(image) {
        return <AutoHeightImage width={width} source={image} />
    }

    checkCompleteness(){
        let pass = true;
        let errMsg = '';
        //this.state.selectedTitle
        if (this.state.selectedTitle===initTitle){
            pass = false;
            errMsg += '＊請選擇投稿題目\n';
        }
        //this.state.agreement
        if(this.state.agreement==null){
            pass = false;
            errMsg += '＊請選擇是否同意參加木蘭草原盃\n';
        }
        //this.state.image
        if(this.state.image==null){
            pass = false;
            errMsg += '＊請上傳你的稿件照片\n';
        }
        return {
            pass, errMsg
        };
    }
    haveSubmited(){
       // Create a query against the collection
       // Create a query against the collection
       this.funword.where("author", "==", this.props.signIn.user.uid).get()
       .then(querySnapshot => {
         if(querySnapshot.size === 0){
            this.setState({draftStatus: 'notSubmitYet'}); 
         }else{
            querySnapshot.forEach(documentSnapshot => {
                this.setState({docid: documentSnapshot.id});
                this.setState({image: {uri: documentSnapshot.data().imageURL}})
                this.setState({draftStatus: documentSnapshot.data().draftStatus});
                this.setState({submitted: true});
                this.setState({autoGroup: documentSnapshot.data().group});
                this.setState({agreement: documentSnapshot.data().agreement});
                this.setState({initAgreement: documentSnapshot.data().agreement?0:1})
                this.setState({selectedTitle: documentSnapshot.data().title});
            });
         }
         
       });
    }

    submitWork(){
        // this.state.docid
        if(this.state.draftStatus == 'notSubmitYet'){
            let verifyResult = this.checkCompleteness();
            if(verifyResult.pass){
                //sending the work to server
                Alert.alert(
                    '你是否確定要投稿',
                    '一但確定投稿，即無法再更改。\n作品可儲存為草稿。',
                    [
                    {text: '儲存草稿', onPress: () => {
                        this.setState({draftStatus: 'draft'});
                        firebase.storage()
                        .ref(`/user/${this.props.signIn.user.uid}/funword/submit.jpg`)
                        .putFile(this.state.image.uri.replace('file:/',''))
                        .then(uploadedFile => {
                            //success
                            this.setState({uploadedFile: uploadedFile});
                            //upload data to server, over-write a doc 
                            //add a doc to Cloud FireStore
                            this.funword.add({
                                author: this.props.signIn.user.uid,
                                title: this.state.selectedTitle,
                                group: this.autoAssignFunwordGroup(this.props.signIn.user),
                                agreement: this.state.agreement,
                                imageURL: uploadedFile.downloadURL,
                                draftStatus: 'draft'
                            }).then((value)=>{
                                //this.haveSubmited();
                                
                                this.setState({submitted: true});
                                this.setState({draftStatus: 'draft'});
                                this.setState({initAgreement: this.state.agreement?0:1});
                            });                
                        })
                        .catch(err => {
                            //Error
                            this.setState({error: err});
                        });
                    }},
                    {text: '確定投稿', onPress: () => {
                        this.setState({draftStatus: 'submitted'});
                        firebase.storage()
                            .ref(`/user/${this.props.signIn.user.uid}/funword/submit.jpg`)
                            .putFile(this.state.image.uri.replace('file:/',''))
                            .then(uploadedFile => {
                                //success
                                this.setState({uploadedFile: uploadedFile});
                                //upload data to server, over-write a doc 
                                //add a doc to Cloud FireStore
                                this.funword.add({
                                    author: this.props.signIn.user.uid,
                                    title: this.state.selectedTitle,
                                    group: this.autoAssignFunwordGroup(this.props.signIn.user),
                                    agreement: this.state.agreement,
                                    imageURL: uploadedFile.downloadURL,
                                    draftStatus: 'submitted'
                                }).then((value)=>{
                                    //this.haveSubmited();
                                    let submittedGroup = this.autoAssignFunwordGroup(this.props.signIn.user);
                                    let user = {...this.props.signIn.user, funwordGroup: submittedGroup} 
                                    //over-write a doc 
                                    this.users.doc(this.props.signIn.user.uid).set(
                                        user
                                    );


                                    this.setState({submitted: true});  
                                    
                                    //move to the next step
                                    this.props.saveCurrentProfile(user);        
                                });                    
                            })
                            .catch(err => {
                                //Error
                                this.setState({error: err});
                            });
                    }},
                    ],
                    { cancelable: false }
                );
            }else{
                Alert.alert(
                    '個人資訊尚未完整填寫',
                    verifyResult.errMsg,
                    [
                    {text: '確認', onPress: () => {}},
                    ],
                    { cancelable: false }
                );
            }
        }

        if(this.state.draftStatus == 'draft'){
            /*
                this.setState({docid: querySnapshot.data().id});
                this.setState({image: {uri: documentSnapshot.data().imageURL}})
                this.setState({draftStatus: documentSnapshot.data().draftStatus});
                this.setState({submitted: true});
                this.setState({agreement: documentSnapshot.data().agreement});
                this.setState({initAgreement: documentSnapshot.data().agreement?0:1})
                this.setState({selectedTitle: documentSnapshot.data().title});
            */
           
          Alert.alert(
            '你是否確定要投稿',
            '一但確定投稿，即無法再更改。\n作品可儲存為草稿。',
            [
            {text: '儲存草稿', onPress: () => {
                this.setState({draftStatus: 'draft'});
                firebase.storage()
                        .ref(`/user/${this.props.signIn.user.uid}/funword/submit.jpg`)
                        .putFile(this.state.image.uri.replace('file:/',''))
                        .then(uploadedFile => {
                            //success
                            this.setState({uploadedFile: uploadedFile});
                this.funword.doc(this.state.docid).set({
                    title: this.state.selectedTitle,
                    agreement: this.state.agreement,
                    author: this.props.signIn.user.uid,
                    draftStatus: 'draft',
                    group: this.state.autoGroup,
                    imageURL: uploadedFile.downloadURL   
                  }).then(
                      ()=>{this.setState({submitted: true});}
                  );
                })
                .catch(err => {
                    //Error
                    this.setState({error: err});
                });
            }},
            {text: '確定投稿', onPress: () => {
                this.setState({draftStatus: 'submitted'});
                if(this.state.image.uri.includes('submit.jpg')&&(this.state.image.uri.includes('https'))){
                    this.funword.doc(this.state.docid).set({
                        title: this.state.selectedTitle,
                        agreement: this.state.agreement,
                        author: this.props.signIn.user.uid,
                        draftStatus: 'submitted',
                        group: this.state.autoGroup,
                        imageURL: this.state.image.uri  
                      }).then(
                          ()=>{
                              //this.haveSubmited();
                              if(this.props.signIn.user.funwordGroup==null){
                                let submittedGroup = this.autoAssignFunwordGroup(this.props.signIn.user);
                                let user = {...this.props.signIn.user, funwordGroup: submittedGroup} 
                                 //over-write a doc 
                                 this.users.doc(this.props.signIn.user.uid).set(
                                     user
                                 );
      
                                 this.setState({submitted: true});  
                                 //move to the next step
                               this.props.saveCurrentProfile(user); 
                              }
                                                      
                        }
                      );
                }else{
                    firebase.storage()
                    .ref(`/user/${this.props.signIn.user.uid}/funword/submit.jpg`)
                    .putFile(this.state.image.uri.replace('file:/',''))
                    .then(uploadedFile => {
                        //success
                        this.setState({uploadedFile: uploadedFile});
            this.funword.doc(this.state.docid).set({
                title: this.state.selectedTitle,
                agreement: this.state.agreement,
                author: this.props.signIn.user.uid,
                draftStatus: 'submitted',
                group: this.state.autoGroup,
                imageURL: uploadedFile.downloadURL  
              }).then(
                  ()=>{
                      //this.haveSubmited();
                      if(this.props.signIn.user.funwordGroup==null){
                        let submittedGroup = this.autoAssignFunwordGroup(this.props.signIn.user);
                        let user = {...this.props.signIn.user, funwordGroup: submittedGroup} 
                         //over-write a doc 
                         this.users.doc(this.props.signIn.user.uid).set(
                             user
                         );

                         this.setState({submitted: true});  
                         //move to the next step
                       this.props.saveCurrentProfile(user); 
                      }
                                              
                }
              );
            })
            .catch(err => {
                //Error
                this.setState({error: err});
            });
                }
                
            }},
            ],
            { cancelable: false }
            );
        }

        
        
    }
    autoAssignFunwordGroup(user){

        let schoolType = user.schoolType;
        let schoolLevel = user.schoolLevel;
    
        //國小 國中 高中職
        //一年級 二年級 三年級 四年級 五年級 六年級 國七 國八 國九
    
        /*
        1. 國小中年級組: 國小三年級 國小四年級
        2. 國小高年級組: 五年級 六年級
        3. 國中組: 國中
        4. 高中職組: 高中職
        */
    
        if(schoolType === '國中'){
            return '國中組';
        }
        if(schoolType === '高中職'){
          return '高中職組';
        }
        if(schoolType === '國小'){
            if((schoolLevel === '三年級')||(schoolLevel === '四年級')){
              return'國小中年級組';
            }
            if((schoolLevel === '五年級')||(schoolLevel === '六年級')){
              return '國小高年級組';
            }
            if((schoolLevel === '一年級')||(schoolLevel === '二年級')){
              return '國小低年級組'; //FIXME: 低年級要排除在外, 不顯示這活動
            }
        }
    }


    renderSubmittedPage(){
        let radio_props=[
            {label: '同意 ', value: true },
            {label: '不同意', value: false }
        ];
        
       return(
            <View style={{flex: 1}}>
            <ScrollView contentContainerStyle={styles.submit}>
            <TouchableOpacity 
            style={styles.imageGroupContainer}
            onPress={()=>{this.setModalVisible(true)}}
            >
                <View style={styles.imageGroup}>
                {this.state.image ? this.renderImage(this.state.image) : this.renderImageCamera()}
                    <Text style={styles.imageLabel}></Text>
                </View>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    alert('Modal has been closed.');
                }}>
                <View style={{marginTop: 22}}>
                    <View>
                    <TouchableHighlight
                        onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                        }}>
                        <View style={styles.headerLeft}>
                            <Icon 
                            name="angle-left" 
                            size={30} 
                            style={{marginRight: 5, marginLeft: 5}}
                            color={headerFontColor}>
                            </Icon>
                            <Text style={styles.headerText}>返回</Text>
                        </View>
                    </TouchableHighlight>
                    <ScrollView style={{marginTop: 10}}>
                    {this.state.image ? this.renderBigImage(this.state.image) : <View style={styles.image}></View>}
                    </ScrollView>
                    
                    </View>
                </View>
            </Modal>

            <View style={styles.SubmitFieldItem}>
                <View style={styles.SubmitFieldTitleFixedWidth}>
                    <Text style={styles.SubmitFieldTitle}>{'題目'}</Text>
                </View>
                <View style={styles.SubmitFieldContent}>
                <Text style={styles.SubmitFieldContentText}>{this.state.selectedTitle}</Text>
                <Icon style={styles.Clickindicator} name={'angle-right'} size={30} color={'white'} />
                </View>
            </View>

            <View style={styles.SubmitFieldItem}>
                <View style={styles.SubmitFieldTitleFixedWidth}>
                    <Text style={styles.SubmitFieldTitle}>{'參賽組別'}</Text>
                </View>
                <View style={styles.SubmitFieldContent}>
                <Text style={styles.SubmitFieldContentText}>{this.props.signIn.user.funwordGroup}</Text>
                <Icon style={styles.Clickindicator} name={'angle-right'} size={30} color={'white'} />
                </View>
            </View>
            
            <View style={{alignSelf:'flex-start', marginLeft: 15 }}>
            <Text>       
                {'\n我同意主辦單位將我的作品同步送件參加武漢木蘭草原盃比賽\n＊木蘭草原盃為大陸武漢地區辦理的書法(軟.硬筆)賽事\n'}
            </Text>
            </View>
            {(this.state.initAgreement!=-1)?
               //(this.state.draftStatus != 'notSubmitYet')?
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', alignSelf:'flex-start', marginLeft: 15 }}>
                <RadioButton>
                <RadioButtonInput
                    obj={{label: '同意', value: 0}}
                    index={0}
                    isSelected={this.state.initAgreement==0}
                    disabled={true}
                    buttonInnerColor={'#EEE'}
                    buttonOuterColor={'#EEE'}
                    buttonSize={10}
                    buttonOuterSize={15}

                    onPress={()=>{}}
                />
                <RadioButtonLabel
                    obj={{label: '同意', value: 0}}
                    disabled={true}
                    onPress={()=>{}}
                />
                
                <RadioButtonInput
                    obj={{label: '不同意', value: 1}}
                    index={1}
                    isSelected={this.state.initAgreement==1}
                    disabled={true}
                    buttonInnerColor={'#EEE'}
                    buttonOuterColor={'#EEE'}
                    buttonSize={10}
                    buttonOuterSize={15}
                    onPress={()=>{}}
                />
                <RadioButtonLabel
                    obj={{label: '不同意', value: 1}}
                    disabled={true}
                    onPress={()=>{}}
                />
                
                </RadioButton></View>: 
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', alignSelf:'flex-start', marginLeft: 15 }}>
            
            <RadioButton>
            <RadioButtonInput
                obj={{label: '同意', value: 0}}
                index={0}
                isSelected={this.state.agreement==true}
                disabled={true}
                buttonInnerColor={'#EEE'}
                buttonOuterColor={'#EEE'}
                buttonSize={10}
                buttonOuterSize={15}

                onPress={()=>{}}
            />
            <RadioButtonLabel
                obj={{label: '同意', value: 0}}
                disabled={true}
                onPress={()=>{}}
            />
            
            <RadioButtonInput
                obj={{label: '不同意', value: 1}}
                index={1}
                isSelected={this.state.agreement==false}
                disabled={true}
                buttonInnerColor={'#EEE'}
                buttonOuterColor={'#EEE'}
                buttonSize={10}
                buttonOuterSize={15}
                onPress={()=>{}}
            />
            <RadioButtonLabel
                obj={{label: '不同意', value: 1}}
                disabled={true}
                onPress={()=>{}}
            />
            
            </RadioButton></View>}
            
            <View style={styles.SubmitButtonCompleted}>
                <Text style={styles.SubmitButtonText}>已完成投稿</Text>
            </View>
            
        </ScrollView>
        </View>
       );
    }

    renderDraftPage(){
        return(<ScrollView contentContainerStyle={styles.submit}>
            <TouchableOpacity 
            style={styles.imageGroupContainer}
            onPress={this.showActionSheet}
            >
                <View style={styles.imageGroup}>
                {this.state.image ? this.renderImage(this.state.image) : this.renderImageCamera()}
                    <Text style={styles.imageLabel}>{'上傳作品'}</Text>
                </View>
            </TouchableOpacity>
            <ModalSelector
                data={data}
                initValue=""
                supportedOrientations={['portrait']}
                accessible={true}
                cancelText={'取消'}
                scrollViewAccessibilityLabel={'Scrollable options'}
                cancelButtonAccessibilityLabel={'Cancel Button'}
                onChange={(option)=>{ this.setState({selectedTitle:option.label})}}>
                <SubmitFieldItem 
                    SubmitFieldTitle={'題目'}
                    clickHandler={this.onTitleClickHandler}
                    SubmitFieldContent={this.state.selectedTitle}
                    SubmitFieldPlaceholder={'選擇投稿題目'}
                    />
            </ModalSelector>
                <SubmitFieldItem 
                    SubmitFieldTitle={'參賽組別'}
                    clickHander={this.onGroupClickHandler}
                    SubmitFieldContent={(this.props.signIn.user.funwordGroup)?this.props.signIn.user.funwordGroup:this.autoAssignFunwordGroup(this.props.signIn.user)}
                    SubmitFieldPlaceholder={'auto-fill'}
                    />
            <View style={{alignSelf:'flex-start', marginLeft: 15 }}>
            <Text>       
                {'\n我同意主辦單位將我的作品同步送件參加武漢木蘭草原盃比賽\n＊木蘭草原盃為大陸武漢地區辦理的書法(軟.硬筆)賽事\n'}
            </Text>
            </View>

                {(this.state.agreement!=null)&&(this.state.initAgreement!=-1)?
                //<Text>{(this.state.agreement===true)?0:1}</Text>:<Text>{(this.state.agreement===true)?0+'ww':1+'ww'}</Text>
            //(this.state.draftStatus != 'notSubmitYet')?
                <RadioForm
                style={{ flexDirection: 'row', alignItems: 'flex-start', alignSelf:'flex-start', marginLeft: 15 }}
                radio_props={this.radio_props}
                initial={(this.state.agreement===true)?0:1}
                buttonSize={10}
                buttonOuterSize={15}
                labelColor={'gray'}
                onPress={(agreement) => {this.setState({agreement:agreement})}}
                />:
                <RadioForm
                style={{ flexDirection: 'row', alignItems: 'flex-start', alignSelf:'flex-start', marginLeft: 15 }}
                radio_props={this.radio_props}
                initial={(this.state.agreement===true)?0:1}
                buttonSize={10}
                buttonOuterSize={15}
                labelColor={'gray'}
                onPress={(agreement) => {this.setState({agreement:agreement})}}
                />}

            <TouchableOpacity 
                style={styles.SubmitButton}
                onPress={this.submitWork}>
                <Text style={styles.SubmitButtonText}>{'投稿'}</Text>
            </TouchableOpacity>

            <ActionSheet
                ref={o => this.ActionSheet = o}
                title={'上傳你的作品'}
                options={['拍照上傳', '相簿選擇', '取消']}
                cancelButtonIndex={2}
                onPress={(index) => { 
                    switch(index){
                        case 0:
                            this.uploadImageFromCamera();      
                            break;
                        case 1:
                            this.uploadImageFromImagePicker();  
                            break;
                        default:
                            break;
                    }
                    }}
                />
            
        </ScrollView>);
    }

    render(){
        this.radio_props=[
            {label: '同意 ', value: true },
            {label: '不同意', value: false }
        ];
        
        return(
            <View style={{flex: 1}}>
            {(this.state.draftStatus==='submitted')&&(this.renderSubmittedPage())}
            {(this.state.draftStatus===null)&&(<View 
            style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}><Text>資料擷取中...</Text></View>)}
            {(this.state.draftStatus=='draft')&&(this.renderDraftPage())}
            {(this.state.draftStatus=='notSubmitYet')&&(<ScrollView contentContainerStyle={styles.submit}>
                <TouchableOpacity 
                style={styles.imageGroupContainer}
                onPress={this.showActionSheet}
                >
                    <View style={styles.imageGroup}>
                    {this.state.image ? this.renderImage(this.state.image) : this.renderImageCamera()}
                        <Text style={styles.imageLabel}>{'上傳作品'}</Text>
                    </View>
                </TouchableOpacity>
                
                <ModalSelector
                    data={data}
                    initValue=""
                    supportedOrientations={['portrait']}
                    accessible={true}
                    cancelText={'取消'}
                    scrollViewAccessibilityLabel={'Scrollable options'}
                    cancelButtonAccessibilityLabel={'Cancel Button'}
                    onChange={(option)=>{ this.setState({selectedTitle:option.label})}}>
                    <SubmitFieldItem 
                        SubmitFieldTitle={'題目'}
                        clickHandler={this.onTitleClickHandler}
                        SubmitFieldContent={this.state.selectedTitle}
                        SubmitFieldPlaceholder={'選擇投稿題目'}
                        />
                </ModalSelector>
                <SubmitFieldItem 
                    SubmitFieldTitle={'參賽組別'}
                    clickHander={this.onGroupClickHandler}
                    SubmitFieldContent={(this.props.signIn.user.funwordGroup)?this.props.signIn.user.funwordGroup:this.autoAssignFunwordGroup(this.props.signIn.user)}
                    SubmitFieldPlaceholder={'auto-fill'}
                    />
                <View style={{alignSelf:'flex-start', marginLeft: 15 }}>
                <Text>       
                    {'\n我同意主辦單位將我的作品同步送件參加武漢木蘭草原盃比賽\n＊木蘭草原盃為大陸武漢地區辦理的書法(軟.硬筆)賽事\n'}
                </Text>
                
                </View>
                <RadioForm
                    style={{ flexDirection: 'row', alignItems: 'flex-start', alignSelf:'flex-start', marginLeft: 15 }}
                    radio_props={this.radio_props}
                    initial={this.state.initAgreement}
                    buttonSize={10}
                    buttonOuterSize={15}
                    labelColor={'gray'}
                    onPress={(agreement) => {this.setState({agreement:agreement})}}
                    />

                <TouchableOpacity 
                    style={styles.SubmitButton}
                    onPress={this.submitWork}>
                    <Text style={styles.SubmitButtonText}>投稿</Text>
                </TouchableOpacity>

                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={'上傳你的作品'}
                    options={['拍照上傳', '相簿選擇', '取消']}
                    cancelButtonIndex={2}
                    onPress={(index) => { 
                        switch(index){
                            case 0:
                                this.uploadImageFromCamera();     
                                break;
                            case 1:
                                this.uploadImageFromImagePicker();
                                break;
                            default:
                                break;
                        }
                        }}
                    />
                
            </ScrollView>)}
            </View>
        )
        
    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({ saveCurrentProfile }, dispatch);
  }
  
  
function mapStateToProps(state) {
    return {
        signIn: state.signIn
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Submit);

