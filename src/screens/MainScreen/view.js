import React, {useEffect} from 'react';
import {Navigation} from 'react-native-navigation';
import {StyleSheet, SafeAreaView} from 'react-native';
import noAuthNavigator from '~/navigation/noAuthNavigator';
import rootNavigator from '~/navigation/rootNavigator';
import colors from '~/theme/color';
import Text from '~/components/Text';
import Image from '~/components/Image';
import Donut from '~/assets/images/actor-dounut.png';

const MainScreen = ({isAuth, isInitialed, handleInitialApp}) => {
  useEffect(() => {
    handleInitialApp();
  }, []);

  useEffect(() => {
    if (isInitialed) {
      isAuth ? rootNavigator() : noAuthNavigator();
    }
  }, [isInitialed, isAuth]);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={Donut}
        style={{width: 50, height: 50, resizeMode: 'contain', marginBottom: 20}}
      />
      <Text style={styles.typography}>Loading</Text>
    </SafeAreaView>
  );
};

export default MainScreen;

Navigation.setDefaultOptions({
  typography: {color: '#222', fontWeight: 'bold'},
  topBar: {
    title: {
      color: 'white',
      component: {
        name: 'TopBar',
        aligment: 'center',
      },
    },
    backButton: {
      color: colors.grey,
      icon: require('assets/icons/back_button.png'),
    },
  },
  bottomTab: {
    fontSize: 14,
    selectedFontSize: 14,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
});
