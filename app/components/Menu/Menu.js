import React, { Component } from 'react';
import { AppRegistry, Platform, StyleSheet, Text, View, ListView, TouchableHighlight } from 'react-native';
import { List, ListItem, Button, Card } from 'react-native-elements';
import api from '../../../utilities/api'

export default class Menu extends Component {
	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			menuDataSource: ds,
		}
	}

	static navigationOptions = {
		title: 'Menu',
	};

	componentDidMount() {
		api.fetchMenus().then((response) => {
			this.setState({menuDataSource: this.state.menuDataSource.cloneWithRows(response)})
		})
	}
	
	renderRow(menu, sectionId, rowId, hightlightRow) {
		const { navigate } = this.props.navigation;		
		return (
			<TouchableHighlight onPress={() => navigate('MenuDetail', {menu:menu})}>
				<View>
					<ListItem roundAvatar 
							key={menu.id} 
							title={menu.name} 
							avatar='https://www.designboom.com/wp-content/uploads/2016/07/patricia-piccinini-graham-transport-accident-commission-designboom-1800.jpg'/>
				</View>
			</TouchableHighlight>
		)
	}

	onLogout(){
		//TODO: de-authenticate
		alert("Logout");
		//TODO: logout
	}

	render() {
		return (
			<View>
				<List containerStyle={{marginBottom: 20}}>
					<ListView dataSource={this.state.menuDataSource} renderRow={this.renderRow.bind(this)}/>
				</List>
				<Text>Token: {this.props.screenProps.token} </Text>
				<Button 
					title="Log Out"
					onPress={this.onLogout.bind(this)}/>
			</View>
		);
	}
}

AppRegistry.registerComponent('Menu', () => Menu);