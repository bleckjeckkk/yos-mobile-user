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
/* 			for(item in response){
				console.log(response[item]);
			} */
		})
	}

	renderRow(menu, sectionId, rowId, hightlightRow) {
		var itemCost = menu.quantity * menu.menu.credit_cost;
		this.setState({ 
			totalAmount: this.state.totalAmount + itemCost
		});
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
						onPress={() => this.props.navigation.popToTop() }
						backgroundColor='#236EFF'
					/>
				</ScrollView>
			</View>
		)
	}
}


function mapStateToProps(state) {
	return { }
}

export default connect(mapStateToProps)(CartDetail);

AppRegistry.registerComponent('CartDetail', () => CartDetail)