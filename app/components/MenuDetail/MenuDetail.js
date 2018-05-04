import React, { Component } from 'react';
import { AppRegistry, View, Text, StyleSheet, ListView, TouchableHighlight } from 'react-native';
import { List, ListItem, Button, Card } from 'react-native-elements';

export default class MenuDetail extends Component {

	static navigationOptions = {
		title: 'Menu Detail'
	}
	
	render() {
		const {params} = this.props.navigation.state;
		const menu = params ? params.menu : null;
		return(
			<Card title={menu.name}>
				<View>
					<Text>Cost: {menu.credit_cost}</Text>
					<Text>Description: {menu.description}</Text>
					<Text>Schedule: {menu.serving_schedule.name}</Text>
					<Text>Category: {menu.menu_category.name}</Text>
					<Text>Set: {menu.menu_set.name}</Text>
				</View>
			</Card>
		)
	}
}

AppRegistry.registerComponent('MenuDetail', () => MenuDetail)