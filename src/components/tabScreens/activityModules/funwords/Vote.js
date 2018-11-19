import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import ActionSheet from 'react-native-actionsheet';
import LLTextInput from '../utilities/LLTextInput';

import VoteItem from './VoteItem';
const { width, height } = Dimensions.get('window');
const styles = {
    posts: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap'
    },
    submit: {
      backgroundColor: '#f7f7f7',
      alignItems: 'center',
      marginTop: 20
    },
    notOpen: {
        display: 'flex',
        backgroundColor: 'white',
        alignItems: 'center',
        justification: 'center',
        marginTop: 20,
        width: width,
        height: height
      },
      notOpenText: {
        marginTop: height/2-50,
        alignItems: 'center',
        justification: 'center'
      },
    searchBarContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 20,
        margin: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    groupBar: {
        backgroundColor: 'white',
        width: '100%',
        height: 18,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchBar: {
        width: '85%',
        backgroundColor: 'white',
        height: 35,
        borderWidth: 0,
        borderStyle: 'solid',
        borderRadius: 5
    },
    searchBarIcon:{
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        height: 35
    },
    progressBarOverlay: {
        position: 'absolute',
        //opacity: 0.01,
        backgroundColor: 'transparent',
        width: '100%',
        height: '100%'
    },
    progressBar:{
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    voteFont: {
        fontSize: 25,
        color: '#35ad27',
        lineHeight: 30
    },
    voteNormalFont: {
        lineHeight: 30
    }
}
class Vote extends Component{
    constructor(props){
        super(props);
        //TODO: load this progress
        this.state = {
            progress: 0,
            loading: true,
            initVote: 0,
            todayVote: 0,
            searchTerms: '',
            searching: '',
            loading: true,
            startYet: null,
            configObjs: null,
            actionSheetIndex: -1
        }
        this.funword = firebase.firestore().collection('funword');
        this.votes = firebase.firestore().collection('votes');
        this.users = firebase.firestore().collection('users');
        
        this.onCollectionUpdate = this.onCollectionUpdate.bind(this);
        this.onVotesUpdate = this.onVotesUpdate.bind(this);
        this.autoAssignFunwordGroup = this.autoAssignFunwordGroup.bind(this);
        this.initVote = this.initVote.bind(this);
        this.filtering = this.filtering.bind(this);  
        this.searching = this.searching.bind(this);
        this.showActionSheet = this.showActionSheet.bind(this);
        this.orderByHotness = this.orderByHotness.bind(this);
        this.orderByTime = this.orderByTime.bind(this)
        this.orderInTime = this.orderInTime.bind(this);
        
    }
    componentDidMount() {
        this.unsubscribe = this.funword.onSnapshot(this.onCollectionUpdate);
        this.unsubscribeVote = this.votes.onSnapshot(this.onVotesUpdate);
    }
    componentWillMount(){

        fetch(('https://ucampus-89e65.firebaseapp.com/static/json/configs.json'), {
            method: 'GET'}).then((response) => {
              if (response.status === 200) {
                response.json().then(json => {
                                      this.setState(Object.assign({}, this.state, {'configObjs': json, 'loading': false}));
                                      let startDay = new Date(json.activities.funword.startDate);
                                        let today = new Date();
                                        let startYet = (today > startDay);//FIXME: for test, production's today should be less than startDay
                                        this.setState({startYet});
                                    });
              } else {
                //console.log(response.status);
              }
            })
            .catch((error) => {
              //console.log(error);
            });
    }
    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
        if (this.unsubscribeVote) this.unsubscribe();
        this.initVote();
    }

    initVote(){
           
    }

    orderByHotness(){

        //update this.state.work
        let funword = firebase.firestore().collection('funword').orderBy('');

    }

    orderByTime(){

        //update this.state.work
        let funword = firebase.firestore().collection('funword');

    }

    orderInTime(){

        //update this.state.work
        let funword = firebase.firestore().collection('funword');

    }

    searching(){
        this.setState({searching: this.state.searchTerms});
    }

    filtering(name, schoolName){
        //this.state.searchTerms
        //TODO: search term preprocessing
        //TIP: includes is case-sensitive..!
        if(this.state.searching==''){
            return true;
        }else{
            if(schoolName && name){
                let schoolSearch = schoolName.includes(this.state.searching);
                let nameSearch = name.includes(this.state.searching);
                this.setState({voteItemVisible: schoolSearch || nameSearch});
            }else{
                return this.setState({voteItemVisible: true});
            }
            
        }
        
    }
    showActionSheet(){
        this.ActionSheet.show();
    }

    onVotesUpdate(querySnapshot){
        const votes = [];
        let myVotes = 0;
        let todayVote = 0;
        querySnapshot.forEach((doc) => {
        const { date, target, dateStr, type, voter } = doc.data();
        votes.push({
            key: doc.id,
            doc, // DocumentSnapshot
            date,
            dateStr,
            type,
            target,
            voter
        });
        });
        this.setState({ 
            votes,
            loading: false
        }, ()=>{
            if(this.state.votes){
                let todayDate = new Date();
                let today = todayDate.getFullYear().toString() + '-' + (todayDate.getMonth()+1).toString()
                            + '-' + todayDate.getDate().toString();
                myVotes = 0;
                todayVote = 0;
                this.state.votes.filter((value)=>{
                    return(value.voter == this.props.signIn.user.uid);
                }).map(
                    (value)=>{
                        this.setState({todayVote: todayVote});
                        this.setState({today: today});
                        this.setState({dateStr: value.dateStr}); 
                        if(value.dateStr==today){
                            todayVote = todayVote + 1;
                            this.setState({todayVote: todayVote});
                        }                  
                        myVotes = myVotes + 1;
                        this.setState({progress: myVotes});
                        return value.voter + '  ' + this.props.signIn.user.uid + ' - ';
                    });
            }
        });
        
       
        

    }
    onCollectionUpdate(querySnapshot){
        const works = [];
        querySnapshot.forEach((doc) => {
            const { author, group, imageURL, title, draftStatus } = doc.data();
            let name = '';
            let schoolName = '';
            
            if(this.props.signIn.user.funwordGroup==null){

                if((draftStatus==='submitted') && (group === this.autoAssignFunwordGroup(this.props.signIn.user))){ //drafts are invisible to users// (group === this.autoAssignFunwordGroup(this.props.signIn.user))
                    this.users.where("uid", "==", author).get()
                                .then(querySnapshot => {
                                    querySnapshot.forEach(documentSnapshot => {
                                        name = documentSnapshot.data().name,
                                        schoolName = documentSnapshot.data().schoolName 
                                    });
                                }).then(
                                    ()=>{
                                        works.push({
                                            key: doc.id,
                                            id: doc.id,
                                            doc, // DocumentSnapshot
                                            author,
                                            name,
                                            schoolName,
                                            group,
                                            imageURL,
                                            title,
                                            draftStatus
                                        });
                                    }
                                ).then(
                                    ()=>{
                                        this.setState({ 
                                            works,
                                            loading: false,
                                    });
                                    }
                                );
                    
                } 

            }else{

                if((draftStatus==='submitted') && (group === this.props.signIn.user.funwordGroup)){ //drafts are invisible to users// (group === this.autoAssignFunwordGroup(this.props.signIn.user))
                    this.users.where("uid", "==", author).get()
                                .then(querySnapshot => {
                                    querySnapshot.forEach(documentSnapshot => {
                                        name = documentSnapshot.data().name,
                                        schoolName = documentSnapshot.data().schoolName 
                                    });
                                }).then(
                                    ()=>{
                                        works.push({
                                            key: doc.id,
                                            id: doc.id,
                                            doc, // DocumentSnapshot
                                            author,
                                            name,
                                            schoolName,
                                            group,
                                            imageURL,
                                            title,
                                            draftStatus
                                        });
                                    }
                                ).then(
                                    ()=>{
                                        this.setState({ 
                                            works,
                                            loading: false,
                                    });
                                    }
                                );
                    
                } 

            }
                 
        });
        
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
    /*
    <Text>{`每日限投5票，累計投滿14天可得大獎!`}</Text>
          <Text>{`今日已投`}</Text>
          <Text>{`${this.state.todayVote}`}</Text>
          <Text>{`票，共投`}</Text>
          <Text>{`${this.state.progress}`}</Text>
    <Text>{`票`}</Text>
    //-------------

    <TouchableOpacity 
                onPress={this.showActionSheet}>
                    <Text>{'click me!'}</Text>
                </TouchableOpacity>
                <Text>{this.state.actionSheetIndex}</Text>
    */
    render(){
        return(
            <View>
                
                <ActionSheet
                ref={o => this.ActionSheet = o}
                title={''}
                options={['熱門', '最新', '隨機', '取消']}
                cancelButtonIndex={3}
                onPress={(index) => { 
                    switch(index){
                        case 0:
                            this.orderByHotness();     
                            break;
                        case 1:
                            this.orderByTime();
                            break;
                        case 2:
                            this.orderInRandom();
                            break;
                        default:
                            this.orderByTime();
                            break;
                    }
                    }}
                />
                
            {this.state.startYet && <View style={styles.submit}>
            <View style={styles.progressBar}>
            <ProgressBarAnimated
                width={width*0.9}
                value={this.state.progress/7}
                backgroundColorOnComplete="#6CC644"
            />
            <View style={styles.progressBarOverlay}></View>
            <View style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', margin: 2}}>
            <Text style={styles.voteNormalFont}>{`每日限投5票，累計投滿14天可得大獎!`}</Text>
            <View style={{display: 'flex', flexDirection: 'row', alignSelf: 'flex-start'}}>
            <Text style={styles.voteNormalFont}>{`今日已投 `}</Text><Text style={styles.voteFont}>{`${this.state.todayVote}`}</Text><Text style={styles.voteNormalFont}>{` 票，共投 `}</Text>
            <Text style={styles.voteFont}>{`${this.state.progress}`}</Text><Text style={styles.voteNormalFont}>{` 票`}</Text>
            </View>
          </View>
          </View>
            <View style={styles.searchBarContainer}>
                
             <View style={styles.groupBar}>
                 <Text>{(this.props.signIn.user.funwordGroup)?this.props.signIn.user.funwordGroup:this.autoAssignFunwordGroup(this.props.signIn.user)}</Text>
             </View>   
                    
            </View>
                <ScrollView>
                <FlatList
                    style={{flex: 1, marginBottom: 130}}
                    contentContainerStyle={styles.posts}
                    data={this.state.works}
                    renderItem={({ item }) => {
                            //if(this.filtering(item.name, item.schoolName)){
                                return <VoteItem {...item} searchTerms={this.state.searching}/>; 
                           // }else{
                           //     return null;
                           // }
                                 
                        }}
                    />
                </ScrollView>

            </View>}
            {!this.state.startYet && <View style={styles.notOpen}>
            <View style={styles.notOpenText}>
            <Text> {(this.state.configObjs)?this.state.configObjs.activities.funword.prompt:'loading'} </Text>
            </View>
            </View>}
            </View>
            
            
        )
    }
}
/*
                <LLTextInput
                    style={styles.searchBar}
                    onChangeText={(searchTerms) => this.setState({searchTerms})}
                    value={this.state.searchTerms}
                    underlineColorAndroid={'transparent'}
                />
                <TouchableOpacity 
                    onPress={this.filtering}
                    style={styles.searchBarIcon}><Icon name={'search'} size={30} color={'gray'} /></TouchableOpacity>

*/

/*
<ScrollView contentContainerStyle={styles.posts}>
                {
                [1,2,3,4,5].map(
                (value, index)=>{return <VoteItem key={index}/>})}
</ScrollView>
*/


function mapStateToProps(state) {
    return {
        signIn: state.signIn
    };
  }
  
  //export default connect(mapStateToProps, mapDispatchToProps)(Poll);
  export default connect(mapStateToProps)(Vote);
