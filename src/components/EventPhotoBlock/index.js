import React from 'react';
import propTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { Button } from 'react-native-elements';
import { StyleSheet, View, Dimensions } from 'react-native';
import Image from '~/components/Image';
import colors from '~/theme/color';

const { width: screenWidth } = Dimensions.get('window');

const ImagePlaceholder = () => {
  return <View style={styles.imagePlaceHolder}></View>;
};

const SelectedImage = ({ uri }) => {
  if (isEmpty(uri)) return <ImagePlaceholder />;
  return <Image source={{uri}} style={styles.image} />;
};

const EventPhotoBlock = ({uri, onEditClick, hideButton, btnText}) => {
  return (
    <View style={styles.imageContainer}>
      <SelectedImage uri={uri} />
      {!hideButton && (
        <Button
          title={btnText}
          onPress={onEditClick}
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          containerStyle={styles.buttonContainer}
        />
      )}
    </View>
  );
};

EventPhotoBlock.propTypes = {
  uri: propTypes.string,
  btnText: propTypes.string,
  hideButton: propTypes.bool,
  onEditClick: propTypes.func,
};

EventPhotoBlock.defaultProps = {
  uri: '',
  btnText: '編輯活動照',
  hideButton: false,
  onEditClick: () => false,
};

const styles = StyleSheet.create({
  image: {
    width: screenWidth,
    resizeMode: 'cover',
    height: 250,
  },
  imagePlaceHolder: {
    backgroundColor: '#eee',
    width: screenWidth,
    height: 200,
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderTopColor: colors.primary,
    borderBottomColor: colors.greyLightest,
  },
  buttonContainer: {
    margin: 5,
    flex: 1,
    position: 'absolute',
  },
  button: {
    borderWidth: 1.5,
    height: 30,
    width: 100,
    borderRadius: 5,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  buttonTitle: {
    fontSize: 12,
    lineHeight: 10,
    color: colors.grey,
  },
});

export default EventPhotoBlock;
