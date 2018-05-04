import { StackNavigator } from 'react-navigation';
import CartDetail from '../components/CartDetail/CartDetail';
import Cart from '../components/Cart/Cart';

export default CartStack = StackNavigator(
	{
		Cart: { screen: Cart },
		CartDetail: { screen: CartDetail },
	}
)