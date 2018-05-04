import { TabNavigator, TabBarBottom } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

import HomeStack from './HomeStack';
import MenuStack from './MenuStack';
import OrderStack from './OrderStack';
import OrderSummaryStack from './OrderSummaryStack';

const routeConfiguration = {
	Home: { screen: props =>  <HomeStack {...props} /> },
	OrderSummary: { screen: OrderSummaryStack },
	Order: { screen: OrderStack },
	Menu: { screen: MenuStack },
}

export const TabNavigation = TabNavigator(routeConfiguration, {})

export default connect((state) => { return {} }, mapDispatchToProps)(TabNavigation);

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}
