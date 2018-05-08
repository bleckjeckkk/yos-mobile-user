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
		}
	}		

	static navigationOptions = {
		title: 'Checkout',
		tabBarVisible : false,
	}

	componentDidMount() {
/* 		const {params} = this.props.navigation.state;
		const cartDetail = params ? params.cartDetail : null;
		this.setState({cartDetails: this.state.cartDetails.cloneWithRows(cartDetail)}) */
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
			<View style={{flex:1}}>
				<ScrollView style={{flex:1}}>
					<Text style={{fontSize : 32, marginLeft: 5, marginTop: 10}}>Order Details</Text>
					<List>
						<ListView dataSource={this.state.cartDetails} renderRow={this.renderRow.bind(this)}></ListView>
					</List>
					<Text style={{fontSize : 24, marginLeft: 5, marginTop: 10}}>Total: Php ???</Text>
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