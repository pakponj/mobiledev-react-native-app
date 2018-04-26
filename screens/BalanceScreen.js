import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import {List, ListItem} from "react-native-elements"
import firebase from 'firebase';

class BalanceScreen extends Component {
  static navigationOptions = {
    title: "Balance",
    header: null
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      refreshing: false,
      error: null
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers() {
    let self = this
    firebase.database().ref('/users/').once('value').then(function(snapshot) {
      let users = []
      let userString = ''
      snapshot.forEach(function(child) {
        console.log(child.val().userDetails)
        users.push(child.val().userDetails)
      })
      self.setState({users})
    });
  }
  
  render() {
    return (
      <List containerStyle={{borderTopWidth: 0, borderBottomWidth: 0}}>
        <FlatList
        data = {this.state.users}
        renderItem = {
          ({item}) => (
            <ListItem
            roundAvatar
            title={`${item.displayName}`}
            subtitle={item.email}
            containerStyle={{borderBottomWidth: 0}}
            />
          )}
          keyExtractor = {item => item.email}
      />
      </List>
    );
  }
}
export default BalanceScreen;