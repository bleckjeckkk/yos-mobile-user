import React from 'react';
import { Button } from 'react-native';
import { withNavigation, NavigationActions } from 'react-navigation';

class Logout extends React.Component {
  render() {
    return <Button title="Logout" onPress={() => { this.props.navigation.dispatch(new NavigationActions.reset({
      index: 0,
      key: null,
      actions: [
          NavigationActions.navigate({ routeName: 'Login' }),
      ]
    })) }} />;
  }
}

// withNavigation returns a component that wraps MyBackButton and passes in the
// navigation prop
export default withNavigation(Logout);

/* this.props.navigation.dispatch(new NavigationActions.reset({
  index: 1,
  actions: [
      NavigationActions.navigate({ routeName: 'HomeTabs' }),
      NavigationActions.navigate({ routeName: 'FeedbackForm'})
  ]
})); */
