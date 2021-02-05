import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '~/theme/color';

const ViewContainer = ({ children, style, ...props }) => {
  return <View {...props} style={[styles.container, style]}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: colors.white
  }
});

export default ViewContainer;
