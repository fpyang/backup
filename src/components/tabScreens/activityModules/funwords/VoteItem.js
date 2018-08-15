import React, { Component } from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity, Alert } from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';

const { height, width } = Dimensions.get('window');
const cardWidth = width/2-12;
const styles = {
    card: {
        backgroundColor: 'white',
        flexDirection: 'column',
        width: cardWidth,
        height: cardWidth*2+20,
        alignItems: 'center',
        margin: 3
    },
    image: {
        backgroundColor: 'white',
        width: cardWidth,
        height: cardWidth 
    },
    metadata: {
        width: '100%',
        padding: 10
    },
    title: {
    },
    name: {
        marginTop: 5
    },
    school: {
        marginTop: 5
    },
    votes: {
        margin: 5
    },
    voteButton: {
        width: '50%',
        height: 36,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        margin: 10
    },
    haveVoted: {
        backgroundColor: '#35ad27',
        borderColor: '#35ad27',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    notVotedYet: {
        backgroundColor: 'white',
        borderColor: '#35ad27',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    haveVotedFont: {
        color: 'white',
    },
    notVotedYetFont: {
        color: '#35ad27',
    }
}
class VoteItem extends Component{
    constructor(props){
        super(props);
        this.getUpdatedAuthorData = this.getUpdatedAuthorData.bind(this);
        this.vote = this.vote.bind(this);
        this.users = firebase.firestore().collection('users');
        this.funword = firebase.firestore().collection('funword');
        this.votes = firebase.firestore().collection('votes');
        this.onCollectionUpdate = this.onCollectionUpdate.bind(this);
        this.initVote = this.initVote.bind(this);
        
        this.state = {
            name: '',
            schoolName: '',
            voteLock: false,
            todayVoted: false,
            todayTotalVote: 0,
            todayVote: 0,
            voteItemVisible: true
        }
    }
    componentWillMount(){
        this.getUpdatedAuthorData();
        this.unsubscribe2 = this.votes.onSnapshot(this.onCollectionUpdate);
        this.initVote();
    }
    
    componentWillUnmount() {
        if (this.unsubscribe2) this.unsubscribe2();
    }
    onCollectionUpdate = (querySnapshot) => {
        const votes = [];
        querySnapshot.forEach((doc) => {
        const { date, target, type, voter } = doc.data();
        votes.push({
            key: doc.id,
            doc, // DocumentSnapshot
            date,
            type,
            target,
            voter
        });
        });
        this.setState({ 
            votes,
            loading: false,
        });
    }
   
    initVote(){
        let todayDate = new Date();
         let today = todayDate.getFullYear().toString() + '-' + (todayDate.getMonth()+1).toString()
                     + '-' + todayDate.getDate().toString();
         let todayVote = 0;
         let todayTotalVote = 0;
         let todayExistingVoteId = '';
         //check today's vote status
         this.votes.where("voter", "==", this.props.signIn.user.uid)//.where("dateStr", "==", today)..where("target", "==", this.props.id)
         .get()
         .then(querySnapshot => {
           querySnapshot.forEach(documentSnapshot => {
               if(documentSnapshot.data().dateStr==today){
                if(documentSnapshot.data().target ==this.props.id){
                    todayVote = todayVote + 1;
                    todayExistingVoteId = documentSnapshot.id; //the id of current document's vote
                 } 
                 todayTotalVote = todayTotalVote + 1; //for checking vote quota per day
               } 
               this.setState({todayVote});
               this.setState({todayTotalVote});  
           });
         })
    }
    getUpdatedAuthorData(){
        // Create a query against the collection
        this.users.where("uid", "==", this.props.author).get()
          .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                this.setState({
                    name: documentSnapshot.data().name,
                    schoolName: documentSnapshot.data().schoolName
                });
            });
          });
    }
    vote(){
         let todayDate = new Date();
         let today = todayDate.getFullYear().toString() + '-' + (todayDate.getMonth()+1).toString()
                     + '-' + todayDate.getDate().toString();
         let todayVote = 0;
         let todayTotalVote = 0;
         let todayExistingVoteId = '';
         //check today's vote status
         this.votes.where("voter", "==", this.props.signIn.user.uid)//.where("dateStr", "==", today)..where("target", "==", this.props.id)
         .get()
         .then(querySnapshot => {
           querySnapshot.forEach(documentSnapshot => {
            if(documentSnapshot.data().dateStr==today){
                if(documentSnapshot.data().target ==this.props.id){
                    todayVote = todayVote + 1;
                    todayExistingVoteId = documentSnapshot.id; //the id of current document's vote
                 } 
                 todayTotalVote = todayTotalVote + 1; //for checking vote quota per day
               } 
               this.setState({todayVote});
               this.setState({todayTotalVote});      
           });
         }).then(
            ()=>{
                    //vote or unvote to server
                    if(todayVote == 0){
                        if(todayTotalVote>4){

                            Alert.alert(
                                '恭喜達成今日任務~',
                                '已投滿今日上限五票，明天繼續努力!',
                                [
                                {text: '確認', onPress: () => {}},
                                ],
                                { cancelable: false }
                            );
                            

                        }else{
                            //vote
                            this.setState({voteLock: true});
                            this.setState({todayVoted: false});
                            Alert.alert(
                                '今日投票狀況統計',
                                `恭喜你剛剛投下寶貴的一票，還剩下${5-this.state.todayTotalVote-1}票`,
                                [
                                {text: '確認', onPress: () => {}},
                                ],
                                { cancelable: false }
                            );
                            this.setState({todayVote: 1});
                            this.votes.add({
                                type: 'funword',
                                target: this.props.id,
                                voter: this.props.signIn.user.uid,
                                dateStr: today,
                                date: todayDate
                            }).then(
                                //()=>this.setState({todayVoted: false})
                            );   
                        }                                   
                    }
                    if(todayVote == 1){
                        //unvote
                        this.setState({voteLock: true});
                        this.setState({todayVoted: true});
                        Alert.alert(
                            '今日投票狀況統計',
                            `你剛剛收回一票，，還剩下${5-this.state.todayTotalVote+1}票`,
                            [
                            {text: '確認', onPress: () => {}},
                            ],
                            { cancelable: false }
                        );
                        this.setState({todayVote: 0});
                        this.votes.doc(todayExistingVoteId).delete().then(function() {     
                                //release vote lock
                                this.setState({voteLock: false});
                            }).catch(function(error) {       
                            });                                 
                    }
                    if(todayVote > 1){
                        //exception... log this error
                        this.votes.doc(todayExistingVoteId).delete().then(function() {     
                            //release vote lock
                            this.setState({voteLock: false});
                            //this.setState({todayVote: 1});
                        }).catch(function(error) {       
                        });
                    }
                }
         );
         

        /*
        this.funword.doc(`${this.props.id}/vote/`).set({
            title: '~~' + Math.floor(Math.random() * 10).toString(),
            complete: false,
          });*/

    }
    //TODO: responsive to determine the # of cards in a row
    //Test the threshold for smallest size of a card
    render(){
            return(
                <View>
                {this.state.voteItemVisible && <View style={styles.card}>           
                <Image style={{width: cardWidth, height: cardWidth, resizeMode: 'contain'}} source={{uri: this.props.imageURL}} />
                <View style={styles.metadata}>
                <View style={styles.title}>
                    <Text>{this.props.title}</Text>
                </View>
                <View style={styles.name}>
                    <Text>{this.state.name}</Text>
                </View>
                <View style={styles.school}>
                    <Text>{this.state.schoolName}</Text>
                </View>
                </View>
                <View style={styles.votes}>
                    <Text> {this.state.votes?this.state.votes.filter((value)=>{
                        return(value.target == this.props.id);
                    }).length.toString()+'票': '計算中...'}  </Text>
                </View>

                <TouchableOpacity 
                    
                    style={[styles.voteButton, (this.state.todayVote)?styles.haveVoted:styles.notVotedYet]}
                    onPress={this.vote}
                >
                    <Text style={(this.state.todayVote)?styles.haveVotedFont:styles.notVotedYetFont}>投票</Text>
                    
                </TouchableOpacity>
            </View>}
            </View>
                
            );
        
    }
}

function mapStateToProps(state) {
    return {
        signIn: state.signIn
    };
  }
  
  //export default connect(mapStateToProps, mapDispatchToProps)(Poll);
  export default connect(mapStateToProps)(VoteItem);

