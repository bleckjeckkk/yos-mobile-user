import React, { Component } from 'react';
import { AppRegistry, View, Text, StyleSheet, ListView, TouchableHighlight } from 'react-native';
import { List, ListItem, Button, Card } from 'react-native-elements';
import api from '../../../utilities/api'
import { connect } from 'react-redux';

class OrderSummaryDetails extends Component {
	constructor() {
		super();
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			orderSummaryDetailDataSource: ds,
		}
	}

	static navigationOptions = {
		title: 'Order Summary Details'
	}

	componentDidMount() {
		const {params} = this.props.navigation.state;
		const cart_detail_ids = params ? params.cart_detail_ids : null;
		this.props.screenProps.fetchCartDetailWithIds(cart_detail_ids).then(() => {
			return this.orders()
		}).then((orders) => {
			this.setState({orderSummaryDetailDataSource: this.state.orderSummaryDetailDataSource.cloneWithRows(orders)})
		})
	}

	orders() {
		return Object.keys(this.props.setOrderSummaryDetail).map((key) => {
			return this.props.setOrderSummaryDetail[key]
		});
	}

	completeDetail(orderDetail) {
		const navprops = this.props.screenProps;
		const {params} = this.props.navigation.state;
		const cart_detail_ids = params ? params.cart_detail_ids : null;
		
		navprops.completeOrderDetail(orderDetail.values[0].id).then(() => {
			navprops.fetchOrdersSummary()
		})
	}

	// ordersSummaryMapping(response) {
	// 	console.log("orderSummaryMapping")
	// 	console.log(response)
	// 	return Object.keys(response).map(key => response[key]);
	// }

	renderRow(orderDetail, sectionId, rowId, hightlightRow) {
		return (
			<Card title={orderDetail.key}>
				<View style={styles.card_action_button}>
					<Text>Menu: {orderDetail.values[0].menu.name}</Text>
					<Text>Quantiy: {orderDetail.values[0].quantity}</Text>
					<Text>Schedule: {orderDetail.values[0].menu.serving_schedule_name}</Text>
					<Button buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}} 
							raised 
							title='Complete'
							onPress= { this.completeDetail.bind(this, orderDetail) }/>					
				</View>
			</Card>
		)
	}

	render() {
		return(
			<List>
				<ListView style={styles.listContainer} dataSource={this.state.orderSummaryDetailDataSource} renderRow={this.renderRow.bind(this)}></ListView>
			</List>
		)
	}
}


function mapStateToProps(state) {
	return {
		summaryDataSource: state.setOrdersSummary,
		setOrderSummaryDetail: state.setOrderSummaryDetail,
	}
}
export default connect(mapStateToProps)(OrderSummaryDetails);

const styles = StyleSheet.create({
	total_cost: {
		margin: 10
	},
	card_action_button: {
		margin: 10
	},
	listContainer: {
		marginBottom:20
	}
})

AppRegistry.registerComponent('OrderSummaryDetails', () => OrderSummaryDetails)