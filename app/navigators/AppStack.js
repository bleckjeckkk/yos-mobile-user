import Login from '../components/Login/Login';
import MainApp from '../containers/AppContainer';
import {StackNavigator} from 'react-navigation';
import Logout from '../components/Logout/Logout';

const StackNavigate = StackNavigator({
    Login: {screen: Login},
    Main : {screen: MainApp},
    Logout: {screen: Logout},
  },{
    initialRouteName : 'Login',
    headerMode : 'none',
  });

export default StackNavigate;
  