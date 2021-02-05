import React, {Fragment} from 'react';
import {View, StyleSheet} from 'react-native';
import {Overlay} from 'react-native-elements';
import Text from '~/components/Text';
import Image from '~/components/Image';
import Button from '~/components/Button';
import confirmImage from '~/assets/images/image-take-part.png';

const JoinDialog = ({visible, setVisible, push, event}) => {
  return (
    <Overlay isVisible={visible} onBackdropPress={() => setVisible(false)} overlayStyle={styles.container}>
      <Fragment>
        <Image source={confirmImage} style={styles.headerImg} />
        <Text h3 style={styles.text}>
          參與活動注意
        </Text>
        <View style={styles.note}>
          <Text h5 style={styles.textBold}>
            注意出席的時間
          </Text>
          <Text h6>
            請確認自己在審核通過後可以出席活動再報名，
            否則評價會影響未來審核通過的成功率喔。
          </Text>
        </View>
        <View style={styles.note}>
          <Text h5 style={styles.textBold}>
            更好的認識彼此
          </Text>
          <Text h6>報名時記得填寫介紹，才能讓主辦人更了解你喔！</Text>
        </View>
        <View style={styles.note}>
          <Text h5 style={styles.textBold}>
            給予優質回饋
          </Text>
          <Text h6>
            參加完活動後請不要吝嗇給予正面評價，給主辦人回饋喔！當然如果辦得不如預期，也請好好給主辦人建議，一起創造更好的聚餐環境。
          </Text>
        </View>
        <View style={styles.buttonZone}>
          <Button
            title='前往報名'
            onPress={() => {
              setVisible(false);
              push('JoinEvent', {eventId: event.id, event});
            }}
          />
          <Button
            title='下次好了'
            type='outline'
            onPress={() => {
              setVisible(false);
            }}
          />
        </View>
      </Fragment>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
  },
  headerImg: {
    width: 200,
    height: 80,
    margin: 15,
    resizeMode: 'contain',
  },
  text: {
    paddingBottom: 10,
  },
  note: {
    width: '70%',
    padding: 15,
  },
  textBold: {
    fontWeight: '600',
  },
});

export default JoinDialog;
