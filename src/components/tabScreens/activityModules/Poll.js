import React, { Component } from 'react';
import { Text, View, Button, TouchableHighlight, CameraRoll, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
//import { signIn } from '../../../actions/index';

class Poll extends Component{
    constructor(props){
        super(props);
        this.state={
            image: null,
            uploadedFile: null,
            err: '',
            upload: '',
            download: '',
            todo: '',
            todo1: 'none'
        }
        this.renderImage=this.renderImage.bind(this);
        this.uploadImageFromImagePicker = this.uploadImageFromImagePicker.bind(this);
        this.uploadImageFromCamera = this.uploadImageFromCamera.bind(this);
        this.todos = firebase.firestore().collection('todos');
        this.addTodo = this.addTodo.bind(this);
        this.onCollectionUpdate = this.onCollectionUpdate.bind(this);
    }
    componentDidMount() {
        this.unsubscribe2 = this.todos.onSnapshot(this.onCollectionUpdate);
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            this.setState({ user: user.toJSON() });
          } else {
            // User has been signed out, reset the state
            this.setState({
              user: null
            });
          }
        });
      }
    
    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
        if (this.unsubscribe2) this.unsubscribe2();
    }
    /*
        Reference: https://firebase.google.com/docs/firestore/manage-data/add-data
        The react-native-firebase mimics the 'Web' version API of above reference document.
        Check/Test if there are some functionalities not be realized yet!!
    */
    onCollectionUpdate = (querySnapshot) => {
        const todos = [];
        querySnapshot.forEach((doc) => {
        const { title, complete } = doc.data();
        todos.push({
            key: doc.id,
            doc, // DocumentSnapshot
            title,
            complete,
        });
        });
        this.setState({ 
        todos,
        loading: false,
    });
    }
    addTodo() {

        //add a doc to Cloud FireStore
        this.todos.add({
          title: 'todo' + Math.floor(Math.random() * 10).toString(),
          complete: false,
        });
        
        //over-write a doc 
        /*
        this.todos.doc('todo2' + Math.floor(Math.random() * 10).toString()).set({
            title: '~~' + Math.floor(Math.random() * 10).toString(),
            complete: false,
          });*/

        /*  //delete a doc by a given docPath
        this.todos.doc('6G4iNfLT3yHhHZUXwvTv').delete().then(function() {     
            this.setState({todo: 'deleted'});
        }).catch(function(error) {       
        });*/

        // Create a query against the collection
        /*this.todos.where("title", "==", "~~8").get().then(function(querySnapshot) {
            this.setState({todo1: 'ww'});
            if (querySnapshot.exists) {
                //this.setState({todo1: 'dd'});
                //console.log("Document data:", doc.data());
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                    this.setState({todo1: 'doc.data()'});
                });

            } else {
                // doc.data() will be undefined in this case
                //console.log("No such document!");
                this.setState({todo1: "No such document!"});
            }
        }).catch(function(error) {
            //console.log("Error getting document:", error);
            this.setState({todo1: error});
        });*/


        // Create a query against the collection
        this.todos.where("title", "==", "~~8").get()
          .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                this.setState({todo1: documentSnapshot.data().title});
            });
          });    

      }
    uploadImageFromCamera(){

    ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        compressImageMaxWidth: 640,
        compressImageMaxHeight: 480,
        compressImageQuality: 0.7,
        mediaType: 'photo'
    }).then(image => {
        console.log(image);
        this.setState({
        image: {uri: image.path, width: image.width, height: image.height}});
        //this.props.addImages(image);

    }).catch( reason => {
            console.log( 'onRejected function called: ', reason );
    });

    }

    uploadImageFromImagePicker(){

    ImagePicker.openPicker({
        multiple: false,
        compressImageMaxWidth: 640,
        compressImageMaxHeight: 480,
        compressImageQuality: 0.7,
        mediaType: 'photo'
    }).then(image => {
        console.log(image);
        this.setState({
        image: {uri: image.path, width: image.width, height: image.height}});

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
        /*
        firebase.storage()
        .ref('/bundle.txt')
        .downloadFile('/dog12345.txt')
        .then(downloadedFile => {
            //success
            this.setState({download: 'ya2'});
        })
        .catch(err => {
            //Error
            this.setState({err: err});
            this.setState({download: 'fail'});
        });
        */

    }).catch( reason => {
            console.log( 'onRejected function called: ', reason );
    });
    }

    renderImage(image) {
    return <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image} />
    }
    
    render() {
    return (
    <View>
        <Text>{JSON.stringify(this.props.signIn.user)}</Text>
        <TouchableOpacity onPress={this.uploadImageFromImagePicker}>
        <Text>uploadImageFromImagePicker</Text>
        
        </TouchableOpacity>

        <TouchableOpacity onPress={this.uploadImageFromCamera}>
        <Text>uploadImageFromCamera</Text>
        
        </TouchableOpacity>

        {this.state.image ? this.renderImage(this.state.image) : null}
        <Text>{this.state.image ? this.state.image.uri : ''}</Text>
        <Text>{this.state.uploadedFile ? JSON.stringify(this.state.uploadedFile) : ''}</Text>
        <Text>err:{JSON.stringify(this.state.err)}</Text>
        <Text>download:{this.state.download}</Text>
        <Text>upload:{this.state.upload}</Text>
        <Text>error:{JSON.stringify(this.state.error)}</Text>
        <Text>{this.state.todo1}</Text>
        <TouchableOpacity onPress={this.addTodo}><Text>todo + 1 </Text></TouchableOpacity>
        
        
     

        </View>
    );
    }
}

/*

        <FlatList
          data={this.state.todos}
          renderItem={({ item }) => <Todo {...item} />}
        />
*/


class Todo extends React.PureComponent {
    // toggle a todo as completed or not via update()
    toggleComplete() {
        this.props.doc.ref.update({
            complete: !this.props.complete,
        });
    }

    render() {
        return (
          <TouchableHighlight
            onPress={() => this.toggleComplete()}
          >
              <View style={{ flex: 1, height: 48, flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flex: 8 }}>
                      <Text>{this.props.title}</Text>
                  </View>
                  <View style={{ flex: 2 }}>
                      {this.props.complete && (
                          <Text>COMPLETE</Text>
                      )}
                  </View>
              </View>
          </TouchableHighlight>
        );
    }
}

/*
function mapDispatchToProps(dispatch) {

    return bindActionCreators({ signIn }, dispatch);
  }*/
  
  
function mapStateToProps(state) {
    return {
        signIn: state.signIn
    };
  }
  
  //export default connect(mapStateToProps, mapDispatchToProps)(Poll);
  export default connect(mapStateToProps)(Poll);