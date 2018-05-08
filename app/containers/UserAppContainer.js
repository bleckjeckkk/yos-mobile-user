import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { StackNavigator, TabNavigator, TabBarBottom, addNavigationHelpers } from 'react-navigation';

import DashStack from '../navigators/UserStack';
import Cart from '../components/User/Cart/Cart';
import Checkout from '../components/User/Checkout/Checkout';
import UserStack from '../navigators/UserStack';

class AppContainer extends Component {
	constructor(props){
		super(props);
	}
	render() {
		const propsScreen = {...this.props}
		return (
			<UserStack screenProps={propsScreen}/>
		)
	}
}


function mapStateToProps(state) {
	return {
		token: state.Token,
		user : state.User,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
