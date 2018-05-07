import Login from '../components/Login/Login';
import MainApp from '../containers/AppContainer';
import UserApp from '../containers/UserAppContainer';
import {StackNavigator} from 'react-navigation';
import Logout from '../components/Logout/Logout';

const StackNavigate = StackNavigator({
    Login: {screen: Login},
    AdminMain : {screen: MainApp},
    UserMain : {screen: UserApp},
    Logout: {screen: Logout},
  },{
    initialRouteName : 'Login',
    headerMode : 'none',
  });

export default StackNavigate;
  