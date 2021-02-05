import React from 'react';
import propTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ScrollContainer = ({children, containerStyle, ...props}) => {
  return (
    <View style={[styles.root, containerStyle]}>
      <KeyboardAwareScrollView {...props} style={styles.layout} containerStyle={styles.container}>
        {children}
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
  },
  layout: {
    flex: 1,
    width: '100%',
    display: 'flex',
  }
});

ScrollContainer.propTypes = {
  containerStyle: propTypes.object,
}

ScrollContainer.defaultProps = {
  containerStyle: {}
}

export default ScrollContainer;
