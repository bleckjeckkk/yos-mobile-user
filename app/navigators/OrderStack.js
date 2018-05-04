import { StackNavigator } from 'react-navigation';
import Order  from '../components/Order/Order';
import OrderDetail  from '../components/OrderDetail/OrderDetail';
import Cart  from '../components/Cart/Cart';
import CartDetail  from '../components/CartDetail/CartDetail';

export default OrderStack = StackNavigator(
	{
		Order: { screen: Order },
		OrderDetail: { screen: OrderDetail },
		Cart: { screen: Cart },
		CartDetail: { screen: CartDetail }
	}
)