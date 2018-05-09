import { StackNavigator } from 'react-navigation';
import Dashboard from '../components/User/Dashboard/Dashboard';
import Cart  from '../components/Cart/Cart';
import OrderDetail from '../components/OrderDetail/OrderDetail';
import Checkout  from '../components/User/Checkout/Checkout';

export default UserStack = StackNavigator(
	{
		Dashboard: { screen: Dashboard },
		Cart: { screen: Cart },
		OrderDetail : {screen : OrderDetail},
		Checkout: { screen: Checkout },
	},{
		initialRouteName : 'Dashboard',
		headerMode : 'screen',
	});

