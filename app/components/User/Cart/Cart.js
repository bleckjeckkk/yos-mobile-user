import React, { Component } from 'react';
import { View, Text, AppRegistry, ListView, TouchableHighlight, SectionList, ScrollView, Picker, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { List, ListItem, Button, Card, Header } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import api from '../../../../utilities/api';
import { Dropdown } from 'react-native-material-dropdown'
import { fetchMenuDetails } from '../../../actions/recipes';

class Cart extends Component {
	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			menuDates: [],
			selectedDate: 'date',
			cartInput: ds ,
			dateID : 'ID',
		}
	}

	static navigationOptions = {
		title: 'Order',
		tabBarVisible : false,
	}

	componentDidMount() {
		this.props.screenProps.fetchMenus(this.props.screenProps.token)
		.then((response) => {
			console.log(response);
			var newDates = [];
			newDates = Object.keys(response).map((key) =>{
				return { 
					value : response[key].date,
					id : response[key].id,
				}
			})
			this.setState({menuDates : newDates});
		})
	}

	renderRow(cart, sectionId, rowId, hightlightRow) {
		return (
			<TouchableHighlight onPress={()=> {this.props.screenProps.addMenuItem(this.props.screenProps.token,cart)}}>
				<View>
					<ListItem roundAvatar 
							key={cart.id} 
							title={cart.menu.description}
							avatar='https://www.designboom.com/wp-content/uploads/2016/07/patricia-piccinini-graham-transport-accident-commission-designboom-1800.jpg'
							subtitle={
								<View style={{paddingLeft : 5}}>
									<Text>Cost: {cart.menu.credit_cost}</Text>
									<Text>Serving Schedule: {cart.menu.serving_schedule_name}</Text>
								</View>
							}
							/>
					<TextInput />
				</View>
			</TouchableHighlight>
		)
	}

	renderHeader(headerItem) {
		return <Header placement='left' centerComponent={{text: headerItem.section.title, style: { color: '#fff' } }}
					   outerContainerStyles={{ backgroundColor: '#3D6DCC' }}/>
	}

	render() {
		var ordersv = [];
		return(
			<View style={{flex:1}}>
				<ScrollView style={{flex:1}}>
					<Button 
						title="Checkout"
						onPress={() => this.props.navigation.navigate('Checkout')}
						backgroundColor='#236EFF'
					/>
					
					<Dropdown
						label="Menu Set Schedule"
						data={this.state.menuDates}
						
						onChangeText={(value,index) => {
							this.setState({ 
								selectedDate : value,
								dateID : this.state.menuDates[index].id,
							});	
							this.props.screenProps.fetchMenuScheduleDetails(this.props.screenProps.token,this.state.menuDates[index].id)
							.then((response) => {
								var cart_id = this.props.cartID;
								Object.keys(response).map(function(key){
									ordersv[key] = {
										cut_off_time: response[key].cut_off_time,
										id: response[key].id,
										is_active: response[key].is_active,
										is_deleted: response[key].is_deleted,
										menu: response[key].menu,
										menu_set_schedule_id: response[key].menu_set_schedule_id,
										serving_schedule_id: response[key].serving_schedule_id,
										cart: cart_id,
										quantity: 0
									}
								})	
								this.setState({cartInput : this.state.cartInput.cloneWithRows(ordersv)});
							})				
						}}
					/>
					<Text>CartID: {this.props.cartID}</Text>
					<Text>Selected: {this.state.selectedDate}</Text>
					<Text>MenuDateID: {this.state.dateID}</Text>
					<List containerStyle={{marginBottom: 20}}>
					<ListView dataSource={this.state.cartInput} renderRow={this.renderRow.bind(this)}/>
					</List>
				</ScrollView>
			</View>
		)
	}
}

function mapStateToProps(state) {
	return {
		setEmployeeCarts: state.setEmployeeCarts,
		token : state.Token,
		cartID : state.CartID,
	}
}

export default connect(mapStateToProps)(Cart);

AppRegistry.registerComponent('Cart', () => Cart)