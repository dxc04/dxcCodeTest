import React, {Component} from 'react';
import {YellowBox} from 'react-native';
import Login from './containers/Login';
import Account from './containers/Account';
import Weather from './containers/Weather';
import SInfo from 'react-native-sensitive-info';
import {createDrawerNavigator} from '@react-navigation/drawer';

YellowBox.ignoreWarnings(['Setting a timer']);

const Drawer = createDrawerNavigator();

class Router extends Component {
  state = {
    hasInitialized: false,
  };

  componentDidMount() {
    
    SInfo.getItem('accessToken', {}).then((accessToken: string) => {
      if (accessToken) {
        this.setState({
          hasInitialized: true,
        });
      } else {
        this.props.navigation.navigate('Login');
      }
    });
  }

  render() {
    return (
      <Drawer.Navigator initialRouteName="Login">
        {this.state.hasInitialized === false ? (
          <Drawer.Screen name="Login" component={Login} />
        ) : (
          <>
            <Drawer.Screen name="Account" component={Account} />
            <Drawer.Screen name="Weather" component={Weather} />
          </>
        )}
      </Drawer.Navigator>
    );
  }
}
export default Router;
