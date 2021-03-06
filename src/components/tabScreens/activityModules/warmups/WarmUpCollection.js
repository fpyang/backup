import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentWritingContext } from '../../../../actions/index';
import WorkItem from '../utilities/WorkItem';
const styles = {
    page: {
        flex: 1,
        display: 'flex',
        backgroundColor: 'white'
    }
}
class WarmUpCollection extends Component{
    constructor(props){
        super(props);
        this.warmupCollection = firebase.firestore().collection('aiwriting/'.concat(this.props.signIn.user.uid)
        .concat('/collection')).orderBy('endTime', 'desc');
        this.onWarmupCollectionUpdate = this.onWarmupCollectionUpdate.bind(this);
        this.state = {
            warmUps: []
        }
    }
    componentDidMount() {
        this.unsubscribe = this.warmupCollection.onSnapshot(this.onWarmupCollectionUpdate);
        
    }
    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
        
    }
    onWarmupCollectionUpdate(querySnapshot){
        const warmUps = [];
        querySnapshot.forEach((doc) => {
            const { content, startTime, endTime, title, type, score } = doc.data();
            let questionTitle = title;
            let initText = content;
                warmUps.push({
                    key: doc.id,
                    id: doc.id,
                    doc, // DocumentSnapshot
                    content,
                    initText,
                    startTime,
                    endTime,
                    title,
                    questionTitle,
                    type,
                    score: score.S,
                    scoreDetail: score
                });
                
        });
        this.setState({ 
            warmUps,
            loading: false,
        });
    }
    render(){
        let workData = [
            {
                type: 'draft',
                startDate: new Date(),
                endDate: new Date(),
                title: '我想當老師'

            },
            {
                type: 'masterpiece',
                startDate: new Date(),
                endDate: new Date(),
                title: '我想當太空人',
                score: 6

            }
        ]
        return(<ScrollView style={styles.page}>
            {(this.state.warmUps.length===0)&&<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: 50}}>
                <Text>尚未有作品產出</Text>
            </View>}
            {(this.state.warmUps.length>0)&&this.state.warmUps.map(
                    (value, index)=>{  
                            return(<WorkItem key={index} {...value} {...this.props} back='WarmUpCollection'/>);
                    }
                )}
            </ScrollView>
        )
    }
}


function mapDispatchToProps(dispatch) {

    return bindActionCreators({ setCurrentWritingContext }, dispatch);
  }
  
  
function mapStateToProps(state) {
    return {
        signIn: state.signIn
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(WarmUpCollection);