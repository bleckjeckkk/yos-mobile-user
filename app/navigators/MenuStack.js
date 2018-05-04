import { StackNavigator } from 'react-navigation';
import Menu from '../components/Menu/Menu';
import MenuDetail  from '../components/MenuDetail/MenuDetail';

export default MenuStack = StackNavigator(
	{
		Menu: { screen: Menu },
		MenuDetail: { screen: MenuDetail },
	}
)