import React, { useState, useEffect } from 'react';
import { useNavigation } from 'react-native-navigation-hooks/dist';
import InputImage from '~/components/Inputs/InputImage';
import { StyleSheet, View} from 'react-native';
import Button from '~/components/Button';
import PasswordInput from '~/components/Inputs/PasswordInput';
import TextInputField from '~/components/Inputs/TextInputField';
import { inputDonut, inputLock } from '~/assets/icons';
import Image from '~/components/Image';
import logo from '~/assets/images/logo-foodmate.png';
import ViewContainer from '~/components/ViewContainer';
import bottomLogo from '~/assets/images/actor-login-donut.png';

const onChange = (setter) => (value) => {
  const noSpaceValue = value.trim();
  setter(noSpaceValue);
};

const LoginScreen = ({ handleLogin }) => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  const { push } = useNavigation();

  const payload = {
    account,
    password,
  };

  const onPress = () => {
    handleLogin(payload);
  };

  return (
    <ViewContainer>
      <View style={styles.section}>
        <Image
          source={logo}
          style={{ width: 210, height: 50, resizeMode: 'contain' }}
        />
      </View>
      <View style={styles.section}>
        <TextInputField
          placeholder='请输入用户名'
          value={account}
          containerStyle={{ width: 230 }}
          leftIcon={<InputImage icon={inputDonut} />}
          onChangeText={onChange(setAccount)}
        />
        <PasswordInput
          value={password}
          containerStyle={{ width: 230 }}
          onChangeText={onChange(setPassword)}
          leftIcon={<InputImage icon={inputLock} />}
        />
        <Button title='登入' onPress={onPress} />
        <Button title='註冊' type='outline' onPress={() => push('Register')} />
        <Button
          title='忘記密碼'
          type='clear'
          onPress={() => push('Register')}
        />
      </View>
      <View style={styles.sectionImage}>
        <Image source={bottomLogo} style={styles.bottomImage} />
      </View>
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  section: {
    flex: 1,
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomImage: {
    width: 450,
    height: 450,
    left: -100,
  },
  sectionImage: {
    flex: 1,
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

LoginScreen.options = {
  topBar: {
    title: {
      text: 'LoginScreen',
    },
  },
  bottomTab: {
    text: 'Login',
  },
};

export default LoginScreen;
