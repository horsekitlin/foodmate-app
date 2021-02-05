import React from 'react';
import Image from '~/components/Image';

const styles = {
  containerStyle: {
    width: 30,
    height: 30,
    resizeMode: 'contain'
  }
}

const InputImage = ({ icon, errorIcon, isError}) => {
  return isError 
    ? <Image source={errorIcon} style={styles.containerStyle} />
    : <Image source={icon} style={styles.containerStyle} />;
}

export default InputImage;
