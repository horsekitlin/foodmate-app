import React, { Fragment, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'react-native-elements';
import { useNavigation } from 'react-native-navigation-hooks';
import Text from '~/components/Text';
import confirmImage from '~/assets/images/image-take-part.png';
import colors from '~/theme/color';
import Button from '~/components/Button';
import TextArea from '~/components/TextArea';
import SuccessDialog from './components/SuccessDialog';
import ViewContainer from '~/components/ViewContainer';
import ScrollContainer from '~/components/ScrollContainer';

const handleOnChange = (setter) => (name) => (value) => {
  setter((payload) => ({ ...payload, [name]: value }));
};

const handleSubmit = ({ payload, event, setVisible, handleJoinEvent }) => () => {
  setVisible(true);
  handleJoinEvent({ eventId: event.id, ...payload });
};

const JoinEventScreen = ({ eventId, handleJoinEvent, event }) => {
  const [payload, setPayload] = useState({});
  const [visible, setVisible] = useState(false);
  const { pop } = useNavigation();

  const onChange = handleOnChange(setPayload);
  const onSubmit = handleSubmit({ payload, event, setVisible, handleJoinEvent });


  return (
    <ViewContainer>
      <ScrollContainer>
        <SuccessDialog visible={visible} setVisible={setVisible} pop={pop} />
        <View style={styles.container}>
          <Image source={confirmImage} style={styles.headerImg} />
          <Text h5>參加活動</Text>
          <Text h2>{event.title}</Text>
          <Text h5 style={styles.introText}>
            介紹一下自己，讓主辦人好好認識你，也能提升自己審核通過的機會喔！
          </Text>
          <TextArea
            title='自我介紹'
            numberOfLines={4}
            name='description'
            placeholder='請輸入自我介紹'
            value={payload.description}
            containerStyle={styles.textarea}
            onChangeText={onChange('description')}
          />
          <Button title='提交' onPress={onSubmit} onPress={onSubmit} />
          <Button title='取消' type='outline' onPress={() => pop()} />
        </View>
      </ScrollContainer>
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  introText: {
    padding: 15,
    width: 270,
    color: colors.greyLight,
  },
  headerImg: {
    width: 200,
    height: 80,
    margin: 15,
    resizeMode: 'contain',
  },
  textarea: {
    width: 230,
    height: 200,
  },
});

export default JoinEventScreen;
