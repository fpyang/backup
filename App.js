/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
//import { ApolloClient } from 'apollo-client';
//import { ApolloProvider } from 'react-apollo';
import reducer from './src/reducers';
import NavigationBar from './src/components/NavigationBar';
import UCampusContainer from './src/components/UCampusContainer';

/*
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
*/

/*
    <ApolloProvider store={store} client={client}>
       <NavigationBar/>
    </ApolloProvider>
*/

//const client = new ApolloClient();
const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const store = createStoreWithMiddleware(reducer);
export default class App extends Component{
  render() {  
    return (
      
      <Provider store={store}>
        <UCampusContainer/>
      </Provider> 
    
    );
  }
}

export { App, store }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
