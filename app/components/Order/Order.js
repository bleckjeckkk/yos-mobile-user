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
		}
	}

	static navigationOptions = {
		title: 'Order',
	};

	componentDidMount() {
		this.props.screenProps.fetchOrders(this.props.token, this.props.user).then(() => {
			return this.orders()
		}).then((orders) => {
			this.setState({orders: this.state.orders.cloneWithRows(orders)})
		})
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
							key={order.name} 
							title={order.value.user}
							avatar='https://www.designboom.com/wp-content/uploads/2016/07/patricia-piccinini-graham-transport-accident-commission-designboom-1800.jpg'/>
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
		user : state.User,
		token: state.Token,
	}
}
export default connect(mapStateToProps)(Order);

AppRegistry.registerComponent('Order', () => Order);