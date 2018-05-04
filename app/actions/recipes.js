import * as types from './types';
import Api from '../lib/api';

export function fetchMenus() {
	return (dispatch, getState) => {
		return Api.get('menu-api')
		.then((resp) => {
			dispatch(setSearchedRecipes({ recipes: resp }));
		})
		.catch((ex) => {
			console.log(ex);
		})
	}
}

export function fetchOrders() { 
	return (dispatch, getState) => {
		return  Api.get('order-api')
		.then((response) => {
			dispatch(setOrders({ orders: response }))
		})
		.catch((ex) => {
			console.log(ex);
		})
	}
}

export function fetchEmployeeCarts(carts) {
	return (dispatch, getState) => {
		return Api.post('order-carts-api/', JSON.stringify({carts: carts}))
		.then((response) => {
			dispatch(setEmployeeCarts({ carts: response }))
		})
		.catch((ex) => {
			console.log(ex);
		})
	}
}

export function fetchOrdersSummary() { 
	return (dispatch, getState) => {
		return  Api.get('order-summary-report-api')
		.then((response) => {
			dispatch(setOrdersSummary({ ordersSummary: response }))
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
			console.log(response)
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

export function setSearchedRecipes( { recipes } ) {
	return {
		type: types.SET_SEARCHED_RECIPES,
		recipes
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