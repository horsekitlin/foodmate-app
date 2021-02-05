import React from 'react';
import isEmpty from 'lodash/isEmpty';
import {View, Text, StyleSheet } from 'react-native';
import logo from '~/assets/images/logo-whitout-underline.png';
import colors from '~/theme/color';
import Image from '~/components/Image';

const TitleTopBar = ({title}) => {
  return (
    <View>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const LogoTopBar = (props) => {
  return (
    <View>
      <Image
        source={logo}
        style={{width: 150, height: 25, resizeMode: 'contain'}}
      />
    </View>
  );
};

const TopBar = ({title}) => {
  return isEmpty(title) ? <LogoTopBar /> : <TitleTopBar title={title} />;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: colors.grey,
  }
})

export default TopBar;
