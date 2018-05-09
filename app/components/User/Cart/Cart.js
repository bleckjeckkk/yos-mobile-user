import React, { Component } from 'react';
import { View, Text, AppRegistry, ListView, TouchableHighlight, SectionList, ScrollView, Picker } from 'react-native';
import { connect } from 'react-redux';
import { List, ListItem, Button, Card, Header } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import api from '../../../../utilities/api';
import { Dropdown } from 'react-native-material-dropdown'
import { fetchMenuDetails } from '../../../actions/recipes';

class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			menuDates: [],
			selectedDate: 'date',
			dateID : 'ID',
		}
	}

	static navigationOptions = {
		title: 'Order',
		tabBarVisible : false,
	}

	componentDidMount() {
		this.props.screenProps.fetchMenus(this.props.screenProps.token)
		.then((response) => {
			console.log(response);
			var newDates = [];
			newDates = Object.keys(response).map((key) =>{
				return { 
					value : response[key].date,
					id : response[key].id,
				}
			})
			console.log("outside loop");
			console.log(newDates);
			this.setState({menuDates : newDates});
		})
	}
	carts() {
		return Object.keys(this.props.setEmployeeCarts).map((key) => {
				return this.props.setEmployeeCarts[key]
			}
		);
	}

	renderSectionItem(item) {
		// Todo: Add onPress functions
		const swipeoutBtns = [
			{ text: 'Cancel', backgroundColor: 'red'},
			{ text: 'Complete', backgroundColor: 'green'}
		]
		
		return( 
			<Swipeout left={swipeoutBtns}>
				<View style={{backgroundColor: 'white', padding: 20}}>
					<Text>{item.item.menus[0].name} </Text>
					<Text>{item.item.menus[0].description}</Text>
				</View>
			</Swipeout>
		)
	}

	renderHeader(headerItem) {
		return <Header placement='left' centerComponent={{text: headerItem.section.title, style: { color: '#fff' } }}
					   outerContainerStyles={{ backgroundColor: '#3D6DCC' }}/>
	}

	render() {
		return(
			<View style={{flex:1}}>
				<ScrollView style={{flex:1}}>
					<Button 
						title="Checkout"
						onPress={() => this.props.navigation.navigate('Checkout')}
						backgroundColor='#236EFF'
					/>
					<Dropdown
						label="Menu Set Schedule"
						data={this.state.menuDates}
						
						onChangeText={(value,index) => {
							this.setState({ 
								selectedDate : value,
								dateID : this.state.menuDates[index].id,
							});	
							this.props.screenProps.fetchMenuScheduleDetails(this.props.screenProps.token,this.state.menuDates[index].id)
							.then((response) => console.log(response))				
						}}
					/>
					<Text>CartID: {this.props.cartID}</Text>
					<Text>Selected: {this.state.selectedDate}</Text>
					<Text>MenuDateID: {this.state.dateID}</Text>
				</ScrollView>
			</View>
		)
	}
}

function mapStateToProps(state) {
	return {
		setEmployeeCarts: state.setEmployeeCarts,
		token : state.Token,
		cartID : state.CartID,
	}
}

export default connect(mapStateToProps)(Cart);

AppRegistry.registerComponent('Cart', () => Cart)