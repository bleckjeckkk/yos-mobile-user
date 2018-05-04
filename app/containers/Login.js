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
  AppRegistry,
} from 'react-native'
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { connect } from 'react-redux';

import { Images } from '../Themes'

// Styles
import styles from '../Themes/LoginStyles'

const viewPadding = 10;

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      //TODO: CHANGE THIS BACK
      username: '',
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
    this.props.getAuthToken(this.state);
  }

  componentWillReceiveProps(){
    console.log("props");
    this.props.navigation.navigate('Main');    
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.logo} style={styles.logo} />
            <Text> {JSON.stringify(this.props.token)} </Text>
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


function mapStateToProps(state) {
	return {
		token: state.Token,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
