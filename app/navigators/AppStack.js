import Login from '../containers/Login';
import MainApp from '../containers/AppContainer';
import {StackNavigator} from 'react-navigation';

const StackNavigate = StackNavigator({
    Login: {screen: Login},
    Main : {screen: MainApp}
  },{
    initialRouteName : 'Login',
    headerMode : 'none',
  });

export default StackNavigate;
  