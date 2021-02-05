import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import isNull from 'lodash/isNull';
import isEmpty from 'lodash/isEmpty';
import RNPickerSelect from 'react-native-picker-select';
import { View, StyleSheet } from 'react-native';
import colors from '~/theme/color';
import ErrorMessage from './ErrorMessage';

const LeftIcon = ({ leftIcon }) => {
  if (isEmpty(leftIcon)) return <Fragment />;
  return <View style={styles.icon}>{leftIcon}</View>;
};

const SelectInput = ({
  value,
  items,
  leftIcon,
  errorMessage,
  onValueChange,
  containerStyle,
  placeholderText,
  ...props
}) => {
  const isError = !isEmpty(errorMessage);
  const [errorStyle, errorFormStyle] = isError
    ? [styles.errorStyle, { height: 70 }]
    : [{}, { height: 40 }];

  return (
    <Fragment>
      <View style={[styles.formBox, errorFormStyle]}>
        <View style={[styles.container, containerStyle, errorStyle]}>
          <LeftIcon leftIcon={leftIcon} />
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            placeholder={{
              label: placeholderText,
              value: null,
            }}
            value={value}
            items={items}
            Icon={() => null}
            onValueChange={onValueChange}
            textInputProps={{
              style: [
                styles.select,
                isNull(value) ? styles.placeholder : {}
              ],
            }}
            {...props}
          />
        </View>
        <ErrorMessage errorMessage={errorMessage} />
      </View>
    </Fragment>
  );
};

SelectInput.propTypes = {
  placeholderText: propTypes.string,
  leftIcon: propTypes.node,
  // value: propTypes.oneOfType(propTypes.string, propTypes.array, propTypes.oneOf([null, undefined])),
  items: propTypes.arrayOf(
    propTypes.shape({
      label: propTypes.string,
      // value: propTypes.oneOfType([
      //   propTypes.string,
      //   propTypes.number,
      //   propTypes.oneOf([null]),
      // ]),
    })
  ),
};

SelectInput.defaultProps = {
  placeholderText: '',
  value: null,
  items: [],
};

const styles = StyleSheet.create({
  formBox: {
    width: '100%',
    display: 'flex',
    marginTop: 16,
  },
  container: {
    borderBottomWidth: 1,
    paddingBottom: 8,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    borderColor: colors.greyLightest,
  },
  errorStyle: {
    paddingTop: 6,
    borderColor: colors.error,
  },
  icon: {
    paddingRight: 10,
    marginTop: -4,
  },
  select: {
    fontSize: 16,
  },
  placeholder: {
    color: colors.greyLight,
  },
});

export default SelectInput;
