import React, { Component } from 'react';
import { View, Text, AppRegistry, ListView, TouchableHighlight, SectionList, ScrollView, Picker, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { List, ListItem, Button, Card, Header, Icon } from 'react-native-elements';
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
			data: [],
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
			<TouchableHighlight>
				<View>
					<ListItem
							key={cart.id} 
							title={<Text style={styles.titleCart}>{cart.menu.description}</Text>}
							hideChevron={true}
							subtitle={
								<View style={{
									paddingLeft : 5, 
									flexDirection : 'row', 
									alignItems: 'center', 
									justifyContent: 'space-between',
								}}>
									<View style={{flex: .75}}>
										<Text style={styles.info}>ID: {cart.id}</Text>
										<Text style={styles.info}>Cost: {cart.menu.credit_cost}</Text>
										<Text style={styles.info}>Serving Schedule: {cart.menu.serving_schedule_name}</Text>
										<Text style={styles.info}>Current Quantity: {cart.quantity}</Text>
									</View>
									<View style={{flex : .25}}>
										<Icon
											raised
											onPress={()=> {this.props.screenProps.addMenuItem(this.props.screenProps.token,cart)}}
											name='cart-plus'
											type='MaterialCommunityIcons'
										/>
										<Dropdown
											label="Quantity"
											data={
												[{value : 0},{value : 1},{value : 2},{value : 3},{value : 4},{value : 5},
													{value : 6},{value : 7},{value : 8},{value : 9},{value : 10}]
											}
											value = {cart.menu.quantity}
											onChangeText={(value) => this.quantityChanger(cart.id,value)}
										/>
									</View>
								</View>
							}
							/>
					<TextInput />
				</View>
			</TouchableHighlight>
		)
	}

	quantityChanger(itemID,value){
		this.setState({cartInput : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}) })
		newData = this.state.data.slice();
		console.log(newData);
		for(data in newData){
			console.log(newData[data].id + " = " + itemID);
			if(newData[data].id === itemID){
				console.log("found!");
				newData[data].quantity = value;
				break;
			}
		}
		this.setState({
			cartInput : this.state.cartInput.cloneWithRows(newData),
			data : newData,
		});

		alert(itemID);
		alert(value);
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
								cartInput : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
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
										quantity: "0",
									}
								})	
								ordersv.sort((a,b) => a.serving_schedule_id - b.serving_schedule_id)
								this.setState({
									cartInput : this.state.cartInput.cloneWithRows(ordersv),
									data : ordersv
								});
								console.log(ordersv);
							})				
						}}
					/>
					<List containerStyle={{marginBottom: 20}}>
						<ListView 
							dataSource={this.state.cartInput} 
							renderRow={this.renderRow.bind(this)}
						/>
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
const styles = StyleSheet.create({
	titleCart: {
	  fontWeight: 'bold',
	  fontSize: 20,
	},
	info : {
		fontSize: 16,
	}
})

export default connect(mapStateToProps)(Cart);

AppRegistry.registerComponent('Cart', () => Cart)