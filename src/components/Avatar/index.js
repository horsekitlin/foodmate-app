import React from 'react';
import { Avatar as BaseAvatar } from 'react-native-elements';

const Avatar = props => (
  <BaseAvatar
    placeholderStyle={{ backgroundColor: 'transparent' }}
    {...props}
  />
);

export default Avatar;
