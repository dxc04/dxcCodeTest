import React, {Component} from 'react';
import {YellowBox} from 'react-native';
import SInfo from 'react-native-sensitive-info';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LoginScreens from './containers/LoginScreens';
import HomeScreens from './containers/HomeScreens';

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
        this.props.navigation.navigate('LoginScreens');
      }
    });
  }

  render() {
    return (
      <Drawer.Navigator initialRouteName="LoginScreens">

          <Drawer.Screen key="LogScreens" name="LoginScreens" component={LoginScreens} />

          <Drawer.Screen key="HomeScreens" name="HomeScreens" component={HomeScreens} />

      </Drawer.Navigator>
    );
  }
}
export default Router;
