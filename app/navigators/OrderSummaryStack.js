import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import OrderSummary  from '../components/OrderSummary/OrderSummary';
import OrderSummaryDetail  from '../components/OrderSummaryDetail/OrderSummaryDetail';

export default OrderSummaryStack = StackNavigator(
	{
		OrderSummary : { screen: OrderSummary },
		OrderSummaryDetail : { screen: OrderSummaryDetail }
	}
)
