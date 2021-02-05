import React, { useContext } from 'react';
import isEmpty from 'lodash/isEmpty';
import { StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { ThemeContext, Divider, Icon } from 'react-native-elements';
import Text from '../Text';

const Selector = ({
  label,
  errorMessage,
  containerStyle,
  disabled,
  ...props
}) => {
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);

  const titleColorKey = disabled ? 'disabled' : 'grey';
  const inputColor = disabled ? theme.colors.greyLight : theme.colors.secondary;
  const pickerStyles = {
    inputIOS: {
      color: inputColor,
      paddingTop: theme.spacing.small,
      paddingLeft: theme.spacing.empty,
      paddingRight: theme.spacing.big,
      paddingHorizontal: theme.spacing.small,
      paddingBottom: theme.spacing.small,
      fontSize: theme.Text.h4Style.fontSize,
    },
    inputAndroid: {
      color: inputColor,
      fontSize: theme.Text.h4Style.fontSize,
      paddingLeft: theme.spacing.empty,
      paddingRight: theme.spacing.big,
    },
    placeholder: {
      color: theme.colors.greyLight,
      paddingLeft: theme.spacing.empty,
    },
    underline: { borderTopWidth: 0 },
  };

  const hasError = !isEmpty(errorMessage);

  const dividerStyle = hasError
    ? styles.errorDividerStyle
    : styles.dividerStyle;

  return (
    <Fragment>
      <View style={[styles.container]}>
        <Text h6 color={titleColorKey} fontWeight='medium'>
          {label}
        </Text>
        <Divider style={dividerStyle} />
        <Text
          h6
          color='error'
          isVisible={hasError}
          style={styles.errorMessageStyle}>
          {errorMessage}
        </Text>
      </View>
      <RNPickerSelect
        hideDoneBar
        useNativeAndroidPickerStyle={false}
        style={pickerStyles}
        disabled={disabled}
        Icon={() => (
          <Icon
            name='keyboard-arrow-down'
            color={theme.colors.greyLighter}
            containerStyle={styles.chevron}
          />
        )}
        {...props}
      /></Fragment>
  );
};

const getStyles = theme => {
  return StyleSheet.create({
    container: {
      backgroundColor: '#000',
      position: 'relative',
      height: 180,
      marginTop: theme.spacing.smallest,
      marginBottom: theme.spacing.smallest,
    },
    errorMessageStyle: {
      marginLeft: theme.spacing.small,
      marginTop: theme.spacing.smallest,
    },
    errorDividerStyle: {
      backgroundColor: theme.colors.error,
      height: 1.2,
    },
    dividerStyle: { backgroundColor: theme.colors.greyLighter },
    chevron: { paddingTop: 10 },
  });
};

Selector.propTypes = {
  ...RNPickerSelect.propTypes,
};

Selector.defaultProps = {
  placeholder: { label: '请选择...', value: null },
  containerStyle: {},
};

export default Selector;
