import React, {Component} from 'react';
import {StyleSheet, Text, Button, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export default class Account extends Component {
  // @todo: move this to store
  state = {
    latitude: 0,
    longtitude: 0,
    error: null,
    showLocation: false,
  };

  async componentDidMount() {
    Geolocation.getCurrentPosition(
      (position: any) => {
        this.setState(() => ({
          latitude: position.coords.latitude,
          longtitude: position.coords.longtitude,
        }));
      },
      (error: any) => {
        this.setState(() => ({
          error: error.message,
        }));
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 100000,
      },
    );
  }

  render() {
    console.log(this.props.route)
    const loggedUser = typeof this.props.route.params !== 'undefined' ? this.props.route.params.currentUser : {};

    return (
      <View style={styles.container}>
        <Text>Hello {loggedUser.nickname}</Text>
        <Text>User: {loggedUser.name}</Text>
        <Text>Github Link: https://github.com/{loggedUser.nickname}</Text>
        {this.state.showLocation ? (
          <Text>
            Lat Long: ({this.state.latitude}, {this.state.longtitude})
          </Text>
        ) : null}
        {<Button onPress={() => this.setState({ showLocation: true })} title="Show my location" />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
