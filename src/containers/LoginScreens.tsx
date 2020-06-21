import React, {Component} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Login from './Login';

const Drawer = createDrawerNavigator();

class LoginScreens extends Component {
  render() {
    return (
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="Login" component={Login} />
      </Drawer.Navigator>
    );
  }
}

export default LoginScreens;
