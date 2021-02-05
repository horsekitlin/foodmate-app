import { Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export const getFullScreenSize = ({width, height}) => {
  if (screenWidth <= width) return {width, height};

  const Ratio = screenWidth / width;
  return {
    width: screenWidth,
    height: Ratio * height,
  };
};
