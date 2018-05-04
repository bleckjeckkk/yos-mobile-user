import React, { Component } from 'react';
import ReactNative from 'react-native';
const { 
	ScrollView,
	View,
	TextInput,
	Image,
	Text, 
	TouchableHighLight,
	StyleSheet,
	ListView,
} = ReactNative;
import {  List, ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';

class Home extends Component {
	constructor() {
		super();
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			recipes: ds,
		}
	}

	renderRow(menu, sectionId, rowId, hightlightRow) {
		return (
			<View>
				<ListItem roundAvatar 
						key={menu.id} 
						title={menu.name} 
						avatar='https://www.designboom.com/wp-content/uploads/2016/07/patricia-piccinini-graham-transport-accident-commission-designboom-1800.jpg'/>
			</View>
		)
	}

	searchPressed() {
		this.props.screenProps.fetchMenus().then(() => {
			return this.recipes()
		}).then((recipes) => {
			this.setState({recipes: this.state.recipes.cloneWithRows(recipes)})
		})
	}

	recipes() {
		return Object.keys(this.props.searchedRecipes).map(key => this.props.searchedRecipes[key]);
	}

	render() {
		return (
			<View style={{ marginTop: 20}}>
				<View>
					<Text>{this.props.recipeCounter}</Text>
					<Button title='Fetch Recipes' onPress={() => this.searchPressed()}/>	
				</View>
				<List containerStyle={{marginBottom: 20}}>
					<ListView dataSource={this.state.recipes} renderRow={this.renderRow.bind(this)}/>
				</List>
			</View>
		)
	}
}

function mapStateToProps(state) {
	return {
		searchedRecipes: state.searchedRecipes,
		recipeCounter: state.recipeCount
	}
}

export default connect(mapStateToProps)(Home);
