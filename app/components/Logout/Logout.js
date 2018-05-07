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
import { ActionCreators } from '../../actions';
import { connect } from 'react-redux';

import { Images } from '../../Themes';


const viewPadding = 10;

class Logout extends Component {
  constructor(props){
    super(props);
    this.state = {
      //TODO: CHANGE THIS BACK
      username: '',
      password: '',
    }
  }

  onSubmit(){
    this.props.resetAuthToken();
  }

  componentWillReceiveProps(){
    console.log("props");
    this.props.navigation.navigate('Login');    
  }

  render () {
    return (
      <View>
          <Button 
            title="Log-out"
            onPress={this.onSubmit.bind(this)}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
