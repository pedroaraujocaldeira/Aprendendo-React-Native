import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {localNotificationService} from '../../services';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import {View, Button, Text} from './styles';

export default class Notification extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Sample React Native Firebase V7</Text>
        <Button
          title="Press me"
          onPress={() => localNotificationService.cancelAllLocalNotifications()}
        />
      </View>
    );
  }
}
