import React, { Component } from 'react';
import { AppRegistry, Platform, StyleSheet, Text, View, ListView, TouchableHighlight, ScrollView } from 'react-native';
import { List, ListItem, Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';
import Logout from '../../Logout/Logout';
import styles from '../../../Themes/LoginStyles';

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
		//tabBarVisible : false,
		headerRight: (
			<Logout />
		),
	};

	loadOrders(){
		this.props.screenProps.resetOrders()
		this.props.screenProps.fetchOrders(this.props.screenProps.token, this.props.screenProps.user).then(() => {
			return this.orders()
		}).then((orders) => {
			console.log(orders);
			this.__serializeResponse(orders);
		})
		alert("loadOrders");
	}

	componentDidMount() {
		this.loadOrders();
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
			<ListItem roundAvatar 
					key={order.transaction_id} 
					title={<Text style={{ padding: 5, fontSize : 17 , fontWeight : 'bold'}}>{order.created_on}</Text>}
					avatar='https://www.designboom.com/wp-content/uploads/2016/07/patricia-piccinini-graham-transport-accident-commission-designboom-1800.jpg'
					subtitle={
						<View style={{paddingLeft : 5}}>
							<Text>Payment Method: {order.payment_method}</Text>
							<Text>Total: Php <Text style={{fontWeight : 'bold'}}> {order.total_cost}</Text></Text>
						</View>
					}
			/>
		)
	}

	render() {
		return (
			<View style={[styles.mainContainer,{flex:1}]}>
				<ScrollView style={{flex:1}}>
					<Text style={{fontSize : 32, marginLeft: 5, marginTop: 10}}>Recent Orders</Text>
					<List containerStyle={{marginBottom: 20}}>
						<ListView dataSource={this.state.orders} renderRow={this.renderRow.bind(this)}/>
					</List>
				</ScrollView>
				<ActionButton
					buttonColor="#236EFF"
					onPress={() => { 
						console.log(this.props.screenProps.token);
						console.log(this.props.screenProps.user);
						this.props.screenProps.getCartID(this.props.screenProps.token,this.props.screenProps.user);
						this.props.navigation.navigate('Cart'); 
					}}
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