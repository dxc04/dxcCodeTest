import React, {Component} from 'react';
import {View, Button, ActivityIndicator, Alert} from 'react-native';
import {AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_SCOPE, AUTH0_AUDIENCE} from 'react-native-dotenv';
import Auth0 from 'react-native-auth0';
import {getUniqueId} from 'react-native-device-info';
import SInfo from 'react-native-sensitive-info';
import RNRestart from 'react-native-restart';
import HomeScreens from './HomeScreens';

const auth0 = new Auth0({
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENT_ID,
});

class Login extends Component {
  static navigationOptions = {
    title: 'Login',
  };

  state = {
    hasInitialized: false,
  };

  componentDidMount() {
    SInfo.getItem('accessToken', {}).then((accessToken: string) => {
      if (accessToken) {
        this.loginUser(accessToken, this.refreshAccessToken);
      } else {
        this.setState({
          hasInitialized: true,
        });
      }
    });
  }

  render() {
    const {hasInitialized} = this.state;
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#05a5d1" animating={!hasInitialized} />
          <View style={styles.main}>
            {hasInitialized && <Button title="Login" color="#0064e1" onPress={this.login} />}
          </View>
        </View>
      </View>
    );
  }

  refreshAccessToken = () => {
    SInfo.getItem('refreshToken', {}).then((refreshToken: string) => {
      auth0.auth
        .refreshToken({refreshToken: refreshToken})
        .then((newAccessToken: string) => {
          SInfo.setItem('accessToken', newAccessToken);
          RNRestart.Restart(); // restart so componentDidMount fires again with the new access token
        })
        .catch(() => {
          this.setState({
            hasInitialized: true,
          });
          Alert.alert('Cannot refresh access token. Please login again.');
        });
    });
  };

  loginUser = (accessToken: string, errorCallback: any) => {
    auth0.auth
      .userInfo({token: accessToken})
      .then(async (userData: any) => {
        try {
          const currentUser = await userData;
          this.currentUser = currentUser;
          this.goToHomePage({id: userData.sub, currentUser: this.currentUser});
        } catch (e) {
          console.log('error: ', e);
        }
      })
      .catch(errorCallback);
  };

  login = async () => {
    try {
      const {accessToken, refreshToken} = await auth0.webAuth.authorize({
        scope: AUTH0_SCOPE,
        audience: AUTH0_AUDIENCE,
        device: getUniqueId(),
        prompt: 'login',
      });

      this.loginUser(accessToken);

      SInfo.setItem('accessToken', accessToken, {});
      SInfo.setItem('refreshToken', refreshToken, {});
    } catch (auth0LoginError) {
      console.log('error logging in: ', auth0LoginError);
    }
  };

  logoutUser = async () => {
    SInfo.deleteItem('accessToken', {});
    SInfo.deleteItem('refreshToken', {});
    try {
      await this.props.route.params.auth0.webAuth.clearSession();
    } catch (clearSessionError) {
      console.log('error clearing session: ', clearSessionError);
    }
    Alert.alert('Logged out', 'You are now logged out');
    this.props.navigation.navigate('Login');
  };

  goToHomePage = ({id, currentUser}) => {
    this.props.navigation.navigate('HomeScreens', {
      screen: 'Account',
      params: {id, currentUser, auth0},
    });
  };
}

export default Login;

const styles = {
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFF',
  },
};
