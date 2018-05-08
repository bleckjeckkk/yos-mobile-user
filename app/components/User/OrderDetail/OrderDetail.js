import React, { Component } from 'react';
import { AppRegistry, View, Text, StyleSheet, ListView  } from 'react-native';
import { List, ListItem, Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import api from '../../../../utilities/api';

class OrderDetail extends Component {
	constructor() {
		super();
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			cartDetails: ds,
		}
	}		

	static navigationOptions = {
		title: 'Order Detail'
	}

	componentDidMount() {
/*  		const {params} = this.props.navigation.state;
		const cartDetail = params ? params.cartDetail : null;
		this.setState({cartDetails: this.state.cartDetails.cloneWithRows(cartDetail)}) */
		const {params} = this.props.navigation.state;
		console.log(params);
		console.log(params.order.cart_id);
		api.fetchCartDetails(params.order,this.props.token)
		.then((response) => console.log(response));
	}

	renderRow(cartDetail, sectionId, rowId, hightlightRow) {
		return (
			<List>
				<ListView dataSource={cartDetail} renderRow={this.renderMenuRow.bind(this)}></ListView>
			</List>
		)
	}
	
	renderMenuRow(menu, sectionId, rowId, hightlightRow) {
		return (
			<View>
				<ListItem key={menu.id}  title={menu.name} />
			</View>
		)
	}
	
	render() {
		return(
			<List>
				<ListView dataSource={this.state.cartDetails} renderRow={this.renderRow.bind(this)}></ListView>
			</List>
		)
	}
}


function mapStateToProps(state) {
	return { token : state.Token }
}

export default connect(mapStateToProps)(OrderDetail);

AppRegistry.registerComponent('OrderDetail', () => OrderDetail)