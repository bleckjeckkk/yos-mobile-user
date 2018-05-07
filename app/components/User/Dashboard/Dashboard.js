import React, { Component } from 'react';
import { AppRegistry, Platform, StyleSheet, Text, View, ListView, TouchableHighlight } from 'react-native';
import { List, ListItem, Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';

class Order extends Component {
	constructor() {
		super();
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			orders: ds,
			isAdmin : 'false',
		}
	}

	static navigationOptions = {
		title: 'Dashboard',
		//tabBarVisible : this.props.screenProps.user.is_Staff ? true : false,
		tabBarVisible : false,
	};

	componentDidMount() {
		this.props.screenProps.fetchOrders(this.props.screenProps.token, this.props.screenProps.user).then(() => {
			return this.orders()
		}).then((orders) => {
			console.log(orders);
			this.__serializeResponse(orders);
		})
		if(this.props.screenProps.user.is_Staff){
			this.setState({ isAdmin : true})
		}
	}

	__serializeResponse(response){
		//this.$.progress.disabled = true;
		let result = Object.keys(response).map(function(key){
			console.log(response[key]["value"]);
			return {
				value : response[key]["value"]
			}
		})
		this.setState({orders : this.state.orders.cloneWithRows(result[0].value.data)});
	}

	orders() {
		return Object.keys(this.props.setOrders).map((key) => {
				return this.props.setOrders[key]
			}
		);
	}
	
	renderRow(order, sectionId, rowId, hightlightRow) {
		const { navigate } = this.props.navigation;		
		return (
			<TouchableHighlight onPress={() => navigate('Cart', {order:order})}>
				<View>
					<ListItem roundAvatar 
							key={order.transaction_id} 
							title={order.created_on}
							avatar='https://www.designboom.com/wp-content/uploads/2016/07/patricia-piccinini-graham-transport-accident-commission-designboom-1800.jpg'
							subtitle={
								<View style={{paddingLeft : 5}}>
									<Text>Payment Method: {order.payment_method}</Text>
									<Text>Paid: {JSON.stringify(order.paid)}</Text>
								</View>
							}
							/>
				</View>
			</TouchableHighlight>
		)
	}

	render() {
		return (
			<List containerStyle={{marginBottom: 20}}>
				<ListView dataSource={this.state.orders} renderRow={this.renderRow.bind(this)}/>
			</List>
		);
	}
}

function mapStateToProps(state) {
	return {
		setOrders: state.setOrders,
	}
}
export default connect(mapStateToProps)(Order);

AppRegistry.registerComponent('Order', () => Order);