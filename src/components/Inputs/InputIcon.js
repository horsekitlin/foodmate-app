import React from 'react';
import propTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import colors from '~/theme/color';

const InputIcon = ({ type, name, color, size, isError }) => {
  const inputColor = isError ? colors.error : color;

  return <Icon type={type} name={name} size={size} color={inputColor} />
}

InputIcon.propTypes = {
  size: propTypes.number,
  color: propTypes.string,
  type: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  isError: propTypes.bool.isRequired
}

InputIcon.defaultProps = {
  size: 30,
  color: colors.greyLighter
}

export default InputIcon;
