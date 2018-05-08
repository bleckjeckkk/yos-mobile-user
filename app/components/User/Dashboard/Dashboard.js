import React, { Component } from 'react';
import { AppRegistry, Platform, StyleSheet, Text, View, ListView, TouchableHighlight, ScrollView } from 'react-native';
import { List, ListItem, Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';

class Dashboard extends Component {
	constructor() {
		super();
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			orders: ds,
		}
	}

	static navigationOptions = {
		title: 'Dashboard',
		//tabBarVisible : this.props.screenProps.user.is_Staff ? true : false,
		tabBarVisible : false,
		headerLeft: (
			<Button
				onPress={() => alert("Hamburger")}
				title="Ham"
			/>
		),
		headerRight: (
			<Button
			  onPress={() => this.props.navigation.popToTop() }
			  title="Log-out"
			/>
		),
	};

	componentDidMount() {
		this.props.screenProps.fetchOrders(this.props.screenProps.token, this.props.screenProps.user).then(() => {
			return this.orders()
		}).then((orders) => {
			console.log(orders);
			this.__serializeResponse(orders);
		})
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
									<Text>Total: {order.total_cost}</Text>
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
			<View style={{flex:1}}>
				<ScrollView style={{flex:1}}>
					<Text style={{fontSize : 32, marginLeft: 5, marginTop: 10}}>Recent Orders</Text>
					<List containerStyle={{marginBottom: 20}}>
						<ListView dataSource={this.state.orders} renderRow={this.renderRow.bind(this)}/>
					</List>
				</ScrollView>
				<ActionButton
					buttonColor="rgba(231,76,60,1)"
					onPress={() => { this.props.navigation.navigate('Cart') }}
				/>
			</View>
		);
	}
}

function mapStateToProps(state) {
	return {
		setOrders: state.setOrders,
	}
}
export default connect(mapStateToProps)(Dashboard);

AppRegistry.registerComponent('Dashboard', () => Dashboard);