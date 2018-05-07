import { StackNavigator } from 'react-navigation';
import Dashboard from '../components/user/Dashboard/Dashboard';
import Cart  from '../components/user/Cart/Cart';
import Checkout  from '../components/user/Checkout/Checkout';

export default DashboardStack = StackNavigator(
	{
		Dashboard: { screen: Dashboard },
		Cart: { screen: Cart },
		Checkout: { screen: Checkout }
	}
)