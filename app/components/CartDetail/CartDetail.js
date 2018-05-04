import React, { Component } from 'react';
import { AppRegistry, View, Text, StyleSheet, ListView  } from 'react-native';
import { List, ListItem, Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';

class CartDetail extends Component {
	constructor() {
		super();
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			cartDetails: ds,
		}
	}		

	static navigationOptions = {
		title: 'Cart Detail'
	}

	componentDidMount() {
		const {params} = this.props.navigation.state;
		const cartDetail = params ? params.cartDetail : null;
		this.setState({cartDetails: this.state.cartDetails.cloneWithRows(cartDetail)})
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
	return { }
}

export default connect(mapStateToProps)(CartDetail);

AppRegistry.registerComponent('CartDetail', () => CartDetail)