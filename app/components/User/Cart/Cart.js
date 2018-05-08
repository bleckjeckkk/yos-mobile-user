import React, { Component } from 'react';
import { View, Text, AppRegistry, ListView, TouchableHighlight, SectionList, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { List, ListItem, Button, Card, Header } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import api from '../../../../utilities/api';

class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			carts: []
		}
	}

	static navigationOptions = {
		title: 'Order',
		tabBarVisible : false,
	}

	componentDidMount() {
/* 		const {params} = this.props.navigation.state;
		const order = params ? params.order : null;
		this.props.screenProps.fetchEmployeeCarts(order.value.cart_ids)
		.then(() => this.carts())
		.then((response) => {
			this.setState({carts: response});
		}) */
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
					/>
					<SectionList renderItem={this.renderSectionItem}
								renderSectionHeader={this.renderHeader}
								sections={this.state.carts}
								keyExtractor={(item) => item.date}/>
				</ScrollView>
			</View>
		)
	}
}

function mapStateToProps(state) {
	return {
		setEmployeeCarts: state.setEmployeeCarts,
		token : state.Token
	}
}

export default connect(mapStateToProps)(Cart);

AppRegistry.registerComponent('Cart', () => Cart)