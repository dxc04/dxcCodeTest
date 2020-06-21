import React, {Component} from 'react';
import {View, Button, Alert} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Account from './Account';
import Weather from './Weather';
import {useRoute} from '@react-navigation/native';
import SInfo from 'react-native-sensitive-info';
import RNRestart from 'react-native-restart';

function Logout({navigation}) {
  const route = useRoute();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        onPress={async () => {
          SInfo.deleteItem('accessToken', {});
          SInfo.deleteItem('refreshToken', {});
          try {
            if (route.params && route.params.auth0) {
              await route.params.auth0.webAuth.clearSession();
            }
          } catch (clearSessionError) {
            console.log('error clearing session: ', clearSessionError);
          }
          Alert.alert('Logged out', 'You are now logged out');
          RNRestart.Restart();
        }}
        title="Logout"
      />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default class HomeScreens extends Component {

  render() {
    console.log(this.props.route);
    return (
      <Drawer.Navigator initialRouteName="Account">
        <Drawer.Screen name="Account" component={Account} />
        <Drawer.Screen name="Weather" component={Weather} />
        <Drawer.Screen name="Logout" component={Logout} />
      </Drawer.Navigator>
    );
  }
}
