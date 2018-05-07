import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { StackNavigator, TabNavigator, TabBarBottom, addNavigationHelpers } from 'react-navigation';

import DashStack from '../navigators/UserStack';

const routeConfiguration = {
	Dashboard: { screen: DashStack },
}

const tabNavigationConfiguration = {
	tabBarPosition: 'bottom',
	swipeEnabled: false,
}

const TabNavigation = TabNavigator(routeConfiguration, tabNavigationConfiguration)

class AppContainer extends Component {
	constructor(props){
		super(props);
	}
	render() {
		const propsScreen = {...this.props}
		return (
			<TabNavigation screenProps={propsScreen}/>
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
