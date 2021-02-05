import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Overlay} from 'react-native-elements';
import QRCode from 'react-native-qrcode-generator';
import Text from '~/components/Text';
import colors from '~/theme/color';
import Image from '~/components/Image';
import logo from '~/assets/images/avatar.png'

const QRCodeModal = (props) => {
  const {isVisible, value, onClose, username} = props;

  return (
    <Overlay isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.panel}>
        <QRCode value={value} size={200} bgColor={colors.secondary} fgColor='white' />
        <Image source={logo} style={styles.logo} />
        <Text h2 style={styles.text}>{`${username}`}</Text>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  panel: {
    padding: 30,
    position: 'relative',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 340
  },
  logo: {
    position: 'absolute',
    width: 60,
    height: 60,
    top: 100
  },
  text: {
    width: '100%',
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 24,
    borderRadius: 10,
    overflow: 'hidden',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: colors.secondary
  }
});

export default QRCodeModal;
