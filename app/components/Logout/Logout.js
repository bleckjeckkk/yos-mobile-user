import React from 'react';
import { Button } from 'react-native';
import { withNavigation } from 'react-navigation';

class MyBackButton extends React.Component {
  render() {
    return <Button title="Logout" onPress={() => { this.props.navigation.popToTop() }} />;
  }
}

// withNavigation returns a component that wraps MyBackButton and passes in the
// navigation prop
export default withNavigation(MyBackButton);
