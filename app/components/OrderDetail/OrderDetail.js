import React, { Component } from 'react';
import { AppRegistry, View, Text, StyleSheet, ListView, TouchableHighlight } from 'react-native';
import { List, ListItem, Button, Card } from 'react-native-elements';
import api from '../../../utilities/api';
import styles from '../../Themes/LoginStyles';

export default class MenuDetail extends Component {
	constructor() {
		super();
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			cartDetailDataSource: ds,
		}
	}

	static navigationOptions = {
		title: 'Order Detail'
	}

	componentDidMount() {
		const {params} = this.props.navigation.state;
		const order = params ? params.order : null;
		api.fetchOrderCarts(order.cart_id).then((response) => {
			this.setState({cartDetailDataSource: this.state.cartDetailDataSource.cloneWithRows(response)})
		})
	}

	renderRow(orderDetail, sectionId, rowId, hightlightRow) {
		return (
			<Card>						
				<View style={styles.card_action_button}>
					<Text>Menu: {orderDetail.date}</Text>
					{/* <Text>Quantiy: {orderDetail.quantity}</Text>
					<Text>Price: {orderDetail.menu.credit_cost}</Text> */}
					<Button raised title='Complete' />					
				</View>
			</Card>
		)
	}

	render() {
		const {params} = this.props.navigation.state;
		const order = params ? params.order : null;
		return(
			<View style={styles.mainContainer}>
				<List>
					<ListView dataSource={this.state.cartDetailDataSource} renderRow={this.renderRow.bind(this)}></ListView>
					<Text style={styles.sectionText}>Total Cost: {order.total_cost}</Text>
				</List>
			</View>
		)
	}
}

AppRegistry.registerComponent('MenuDetail', () => MenuDetail)