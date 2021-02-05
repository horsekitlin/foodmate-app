import React, {useState, useEffect} from 'react';
import {useNavigation} from 'react-native-navigation-hooks/dist';
import {View, StyleSheet, ImageBackground, Text} from 'react-native';
import Button from '~/components/Button';
import ViewContainer from '~/components/ViewContainer';
import InputImage from '~/components/Inputs/InputImage';
import TextInputField from '~/components/Inputs/TextInputField';
import registerBackground from '~/assets/images/register_bg.png';
import {inputDonut} from '~/assets/icons';

const MESSAGES = [
  '註冊成功 ! 準備開始尋找好食伴囉 !',
  '該怎麼稱呼您呢？',
  '歡迎加入，記得更新個人檔案，讓我們提供更好的服務喔！',
];

const onChange = (setter) => (value) => {
  const noSpaceValue = value.trim();
  setter(noSpaceValue);
};

const NicknameScreen = ({ userId, handleUpdateUser }) => {
  const {popToRoot} = useNavigation();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setStep(1);
    }, 3000)
  }, []);

  return (
    <ViewContainer>
      <ImageBackground source={registerBackground} style={styles.image}>
      <View style={styles.offsetTop}></View>
        <View style={styles.section}>
          <TextInputField
            name='name'
            value={name}
            placeholder='请输入暱稱'
            containerStyle={{width: 230}}
            onChangeText={onChange(setName)}
            leftIcon={<InputImage icon={inputDonut} />}
          />
          <View style={styles.buttonZone}>
            <Button title='填好了！' onPress={() => handleUpdateUser({ id: userId, name, popToRoot })}/>
          </View>
        </View>
        <View style={styles.sectionImage}>
          <Text style={styles.typography}>{MESSAGES[step]}</Text>
        </View>
      </ImageBackground>
    </ViewContainer>
  );
};

NicknameScreen.options = {
  topBar: {
    visible: false,
  },
};

const styles = StyleSheet.create({
  offsetTop: {
    flex: 1,
  },
  section: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionImage: {
    flex: 1,
    alignItems: 'center',
  },
  typography: {
    color: '#707070',
    textAlign: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  buttonZone: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default NicknameScreen;
