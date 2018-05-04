import { StackNavigator } from 'react-navigation';
import Home from '../containers/Home';

export default HomeStack = StackNavigator(
	{
		Home : { screen: Home },
	}
)