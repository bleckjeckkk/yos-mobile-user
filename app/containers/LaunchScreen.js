import React, { Component } from 'react'
import { 
  ScrollView, 
  Text, 
  Image, 
  View, 
  TextInput,
  Keyboard,
  Platform,
  StyleSheet,
  Button,
} from 'react-native'
//import LoginButton from '../../ignite/DevScreens/LoginButton.js'

import { Images } from '../Themes'

// Styles
import styles from './LaunchScreenStyles'

const viewPadding = 10;

export default class LaunchScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      //TODO: CHANGE THIS BACK
      username: 'Test',
      password: '',
    }
  }

  onChangeName(value){
    this.setState({
          username:value
    });
  }

  onChangePassword(value){
    this.setState({
          password:value
    });
  }
  
  onSubmit(){
    alert("Logged!\n"
    + "\nUsername: " + this.state.username
    + "\nPassword: " + this.state.password)
    this.props.navigation.navigate('Main')
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.logo} style={styles.logo} />
            <Text> Logo Here </Text>
          </View>
          <Text style={styles.sectionTitleLogin}> Welcome! </Text>
          <View style={styles.section} >
            <Text style={styles.sectionLogin}>User</Text>
            <TextInput 
              placeholder='username'
              style={styles.textInput}
              value={this.state.username}
              onChangeText={(value) => this.onChangeName(value)}
            />
            <Text style={styles.sectionLogin}>Password</Text>
            <TextInput 
              placeholder='password'
              style={styles.textInput}
              secureTextEntry = {true}
              onChangeText={(value) => this.onChangePassword(value)}
            />
          </View>
          <Button 
            title="Log-in"
            onPress={this.onSubmit.bind(this)}/>
        </ScrollView>
      </View>
    )
  }
}
