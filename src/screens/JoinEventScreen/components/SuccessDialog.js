import React, {Fragment} from 'react';
import {StyleSheet} from 'react-native';
import {Overlay} from 'react-native-elements';
import Image from '~/components/Image';
import Button from '~/components/Button';
import confirmImage from '~/assets/images/image-success-join.png';

const SuccessDialog = ({visible, setVisible, pop}) => {
  return (
    <Overlay fullScreen isVisible={visible} overlayStyle={styles.overlay}>
      <Fragment>
        <Image source={confirmImage} style={styles.headerImg} />
        <Button
          title='知道了'
          onPress={() => {
            pop();
            setVisible(false);
          }}
        />
      </Fragment>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  overlay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImg: {
    width: 180,
    height: 120,
    margin: 15,
    resizeMode: 'contain',
  },
});

export default SuccessDialog;
