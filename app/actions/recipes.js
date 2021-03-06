import {Alert} from 'react-native'
import * as types from './types';
import Api from '../lib/api';

const baseUrl = 'http://35.227.88.229:9000/api/v1/';

export function getCartID(token,user){
	return (dispatch,getState) => {
		return fetch(baseUrl+'create-cart-api/', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'authorization' : 'JWT ' + token,
			},
			body: JSON.stringify({
				userDetails: user
			})
		})
		.then((response) => response.json())
		.then((response) => {
			console.log(response.data);
			dispatch(setCartID({ id: response.data }));
		})
		.catch((error) => {
			console.log(error)
		})
	}
}

export function fetchMenuSchedules(token){
	return (dispatch,getState) => {
		return fetch(baseUrl+'menu-schedules-api/', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'authorization' : 'JWT ' + token,
			},
		})
		.then((response) => response.json())
		.catch((error) => {
			console.log(error)
		})
	}
}
//     "menu-schedule-details-api/"
export function fetchMenuScheduleDetails(token,menuID){
	return (dispatch,getState) => {
		// `${baseUrl}menu-schedule-details-api/${menuID}/`
		console.log(baseUrl+'menu-schedule-details-api/'+menuID);
		return fetch(baseUrl+'menu-schedule-details-api/'+menuID+"/", {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'authorization' : 'JWT ' + token,
			},
		})
		.then((response) => response.json())
		.catch((error) => {
			console.log(error)
		})
	}
}

export function fetchCartDetails(token,order) {
	return (dispatch,getState) => {
		return fetch(baseUrl+'cart-detail-api/'+order.cart+'/', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'authorization' : 'JWT ' + token,
			}
		})
		.then((response) => response.json())
		.catch((error) => {
			console.log(error)
		})
	}
}

export function addMenuItem(token,cart){
	console.log(JSON.stringify(cart))
	return (dispatch,getState) => {
		return fetch(baseUrl+'add-menu-to-cart-api/', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'authorization' : 'JWT ' + token,
			},
			body: JSON.stringify(cart)
		})
		.then((response) =>
			console.log(response))
		.catch((error) => {
			alert(error)
			console.log(error)
		})
	}
}

export function makeOrder(token,cart){
	console.log(JSON.stringify(cart))
	return (dispatch,getState) => {
		return fetch(baseUrl+'make-order-api/', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'authorization' : 'JWT ' + token,
			},
			body: JSON.stringify(cart)
		})
		.then((response) => console.log(response))
		.catch((error) => {
			alert(error)
			console.log(error)
		})
	}
}

export function fetchOrders(token, user) { 
	return (dispatch, getState) => {
		console.log("FETCH ORDERS");
		obj = {
			token : token,
			user : user,
		}
		return Api.post('order-api/', obj)
		.then((response) => {
			dispatch(setOrders({ orders: response }))
		})
		.catch((ex) => {
			console.log(ex);
		})
	}
}

export function resetOrders() { 
	return (dispatch, getState) => {
		dispatch(setOrders({ orders : {} }))
	}
}


export function getAuthToken(data) {
	console.log("LOGIN WAS PRESSED");
	return (dispatch, getState) => {
		dispatch(setFail({value : false}));
		return Api.post('api-token-auth/', data)
		.then((response) => {
			console.log("authenticated!\n" + response.token);
			dispatch(setUser({ user : response.user }));
			dispatch(setToken({ token : response.token }));
			dispatch(setAccepted({ value : true }));
			dispatch(setFail({ value : false }));
		})
		.catch((ex) => {
			Alert.alert('',"Incorrect login credentials!");
			dispatch(setAccepted({ value : false }));
			dispatch(setFail({ value : true }));
			console.log("!!!" + JSON.stringify(ex));
		})
	}
}

export function resetAuthToken() {
	return (dispatch, getState) => {
		return dispatch(resetToken());
	}
}

export function fetchEmployeeCarts(token,carts) {
	return (dispatch, getState) => {
		return Api.post('order-carts-api/', {token:token}, JSON.stringify({carts: carts}))
		.then((response) => {
			dispatch(setEmployeeCarts({ carts: response }))
		})
		.catch((ex) => {
			console.log(ex);
		})
	}
}

export function fetchCartDetailWithIds(cart_detail_ids) {
	return (dispatch, getState) => {
		return Api.post('cart-details-api/', JSON.stringify({cartDetailIds: cart_detail_ids}))
		.then((response) => {
			dispatch(setOrderSummaryDetail({ orderSummaryDetail: response }))
		})
		.catch((ex) => {
			console.log(ex);
		})
	}
}

export function completeOrderDetail(orderDetailId) {
	return (dispatch, getState) => {
		return Api.post('complete-cart-detail-api/', JSON.stringify({cart_detail_id: orderDetailId}))
		.then((response) => {
			console.log(response)
		})
		.catch((ex) => {
			console.log(ex);
		})	
	}
}

export function fetchOrdersSummary(token) { 
	return (dispatch, getState) => {
		return  Api.post('order-summary-report-api/', token)
		.then((response) => {
			dispatch(setOrdersSummary({ ordersSummary: response }))
		})
		.catch((ex) => {
			console.log(ex);
		})
	}
}


export function setToken( { token } ) {
	return {
		type: types.SET_TOKEN,
		token
	}
}

export function resetToken() {
	return {
		type: types.RESET_TOKEN
	}
}

export function setAccepted( { value } ) {
	return {
		type: types.SET_ACCEPTED,
		value
	}
}

export function setFail({value}) {
	return {
		type: types.SET_FAIL,
		value
	}
}

export function setUser( { user } ) {
	return {
		type: types.SET_USER,
		user
	}
}
export function resetUser() {
	return {
		type: types.RESET_USER
	}
}

export function setCartID( { id } ){
	return{
		type: types.SET_CART_ID,
		id
	}
}

export function setOrderSummaryDetail( { orderSummaryDetail } ) {
	return {
		type: types.SET_ORDER_SUMMARY_DETAIL,
		orderSummaryDetail
	}
}

export function setOrders( { orders } ) {
	return {
		type: types.SET_ORDERS,
		orders
	}
}

export function setOrdersSummary( { ordersSummary } ) {
	return {
		type: types.SET_ORDERS_SUMMARY,
		ordersSummary
	}
}

export function setEmployeeCarts( { carts } ) {
	return {
		type: types.SET_EMPLOYEE_CARTS,
		carts
	}
}

export function addRecipe() {
	return {
		type: types.ADD_RECIPE,
	}
}

export function setSearchedRecipes( { recipes } ) {
	return {
		type: types.SET_SEARCHED_RECIPES,
		recipes
	}
}