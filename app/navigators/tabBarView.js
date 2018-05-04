import React from 'react'
import { addNavigationHelpers } from 'react-navigation'
import { TabNavigation } from './tabbar'
import { connect } from 'react-redux'

class TabBarNavigation extends React.Component {

  render(){
    const { dispatch, navigationState } = this.props
    return (
      <TabNavigation
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: navigationState,
          })
        }
      />
    )
  }
}

function mapStateToProps(state)  {
	return {
  		navigationState: state.TabNavigation,
  	}
}

export default connect(mapStateToProps)(TabBarNavigation)