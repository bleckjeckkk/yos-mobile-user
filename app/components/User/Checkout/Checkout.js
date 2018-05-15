import React, { Component } from 'react';
import { AppRegistry, View, Text, StyleSheet, ListView, ScrollView  } from 'react-native';
import { List, ListItem, Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';

class CartDetail extends Component {
	constructor() {
		super();
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			cartDetails: ds,
			totalAmount: 0,
		}
	}		

	static navigationOptions = {
		title: 'Checkout',
		tabBarVisible : false,
	}

	componentDidMount() {
 		const {params} = this.props.navigation.state;
		const cartDetail = params ? params.cartDetail : null;
		console.log(cartDetail)
		//this.setState({cartDetails: this.state.cartDetails.cloneWithRows(cartDetail)})
		this.props.screenProps.fetchCartDetails(this.props.screenProps.token,cartDetail[0])
		.then((response) => {
			this.setState({
				cartDetails: this.state.cartDetails.cloneWithRows(response)
			})
 			for(item in response){
				menuItem = response[item];
				console.log("================================");
				console.log(menuItem.menu.name);
				console.log("Quantity: " + menuItem.quantity);
				console.log("Cost: " + menuItem.menu.credit_cost);
				this.setState({ totalAmount : this.state.totalAmount + (menuItem.quantity * menuItem.menu.credit_cost)}) 
			}
		})
	}

	renderRow(menu, sectionId, rowId, hightlightRow) {
		return (
			<View>
				<ListItem 
					key={menu.id}
					title={menu.menu.name}
					subtitle={
						<View>
							<Text>Php {menu.menu.credit_cost}</Text>
							<Text>Quantity: {menu.quantity}</Text>
						</View>
					}/>
			</View>
		)
	}

	onPress()	{
		const {params} = this.props.navigation.state;
		const cartDetail = params ? params.cartDetail : null;
		var cart = {
			cart: cartDetail[0].cart,
			payment_method: "Salary Deduction",
			total_cost: 0,
			user: this.props.user.id,
		}
		alert(cartDetail[0].cart)
		this.props.screenProps.makeOrder(this.props.token,cart)
		this.props.navigation.popToTop()
	}
	
	render() {
		return(
			<View style={{flex:1}}>
				<ScrollView style={{flex:1}}>
					<Text style={{fontSize : 32, marginLeft: 5, marginTop: 10}}>Order Details</Text>
					<List>
						<ListView dataSource={this.state.cartDetails} renderRow={this.renderRow.bind(this)}></ListView>
					</List>
					<Text style={{fontSize : 24, marginLeft: 5, marginTop: 10}}>Total: Php {this.state.totalAmount}</Text>
					<Button
						raised
						title="Confirm"
						onPress={this.onPress.bind(this)}
						backgroundColor='#236EFF'
					/>
				</ScrollView>
			</View>
		)
	}
}


function mapStateToProps(state) {
	return { 
		token : state.Token,
		cartID : state.CartID,
		user: state.User
	}
}

export default connect(mapStateToProps)(CartDetail);

AppRegistry.registerComponent('CartDetail', () => CartDetail)