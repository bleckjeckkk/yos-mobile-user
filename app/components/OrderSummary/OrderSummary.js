import React, { Component } from 'react';
import { AppRegistry, Platform, StyleSheet, Text, View, ListView, TouchableHighlight } from 'react-native';
import { List, ListItem, Button, Card } from 'react-native-elements';
import api from '../../../utilities/api';
import { connect } from 'react-redux';

class OrderSummary extends Component {
	constructor(prop) {
		super(prop);
	}
	
	static navigationOptions = {
		title: 'Order Summary'
	}

	componentDidMount() {
		this.props.screenProps.fetchOrdersSummary()
		.then(() => {
			return this.orders()
		}).then((orders) => {
			this.props.summaryDataSource.cloneWithRows(orders)
		})
	}

	orders() {
		return Object.keys(this.props.summaryDataSource).map(key => this.props.summaryDataSource[key]);
	}

	renderRow(order, sectionId, rowId, hightlightRow) {
		const { navigate } = this.props.navigation;
		return (
			<TouchableHighlight onPress={() => navigate('OrderSummaryDetail', {cart_detail_ids:order.value.cart_detail_ids})}>
				<View>
					<ListItem roundAvatar 
							  key={order.value.id} 
							  title={order.key} 
							  subtitle={order.value.quantity}
							  avatar='https://www.designboom.com/wp-content/uploads/2016/07/patricia-piccinini-graham-transport-accident-commission-designboom-1800.jpg'/>
				</View>
			</TouchableHighlight>
		)
	}

	render() {
		return (
			<List containerStyle={{marginBottom: 20}}>
				<ListView dataSource={this.props.summaryDataSource} renderRow={this.renderRow.bind(this)}/>
			</List>
		)
	}
}

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

function mapStateToProps(state) {
	return {
		summaryDataSource: ds.cloneWithRows(state.setOrdersSummary)
	}
}

export default connect(mapStateToProps)(OrderSummary);

AppRegistry.registerComponent('OrderSummary', () => OrderSummary);