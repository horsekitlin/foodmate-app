import React, {useState} from 'react';
import * as yup from 'yup';
import isEmpty from 'lodash/isEmpty';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from 'react-native-navigation-hooks/dist';
import Button from '~/components/Button';
import Image from '~/components/Image';
import logo from '~/assets/images/logo_register.png';
import ViewContainer from '~/components/ViewContainer';
import InputImage from '~/components/Inputs/InputImage';
import bottomLogo from '~/assets/images/actor-register-donut.png';
import TextInputField from '~/components/Inputs/TextInputField';
import {handleYupSchema, handleYupErrors} from '~/helper/yupHelper';
import {accountSchema, passwordSchema} from '~/constants/yupSchemas';
import {
  inputDonut,
  inputDonutError,
  inputLock,
  inputLockError,
  inputLetter,
  inputLetterError,
} from '~/assets/icons';

const schema = yup.object().shape({
  account: accountSchema('請輸入用戶名'),
  password: passwordSchema,
  confirmPassword: passwordSchema.oneOf(
    [yup.ref('password')],
    '輸入的密碼不一致'
  ),
  email: yup.string().email('錯誤的電子信箱格式').required('請輸入電子信箱'),
});

const onChange = (setter) => (value) => {
  const noSpaceValue = value.trim();
  setter(noSpaceValue);
};

const validateData = async (payload, setErrors) => {
  try {
    await handleYupSchema(schema, payload);

    setErrors({});
    return true;
  } catch (error) {
    const errors = handleYupErrors(error);
    setErrors(errors);
    return false;
  }
};

const submit = async (payload, setErrors, handleRegisterUser) => {
  const submitPayload = {...payload, name: payload.account};
  if (await validateData(submitPayload, setErrors)) {
    handleRegisterUser(submitPayload);
  }
};


const handleOnBlur = ( errors, editPayload, setErrors ) => async () => {
  if (!isEmpty(errors)) await validateData(editPayload, setErrors);
};

const RegisterScreen = ({handleRegisterUser}) => {
  const {pop, push} = useNavigation();
  const [errors, setErrors] = useState({});
  const [account, setAccount] = useState('edmond5f5');
  const [email, setEmail] = useState('sss@ddd.jj');
  const [phone, setPhone] = useState('08555541111');
  const [password, setPassword] = useState('aa123123');
  const [confirmPassword, setConfirmPassword] = useState('aa123123');

  
  const payload = {
    email,
    account,
    password,
    email,
    phone,
    confirmPassword,
    push,
  };

  const onBlur = handleOnBlur(errors, payload, setErrors);

  return (
    <ViewContainer>
      <View style={styles.section}>
        <Image
          source={logo}
          style={{width: 210, height: 50, resizeMode: 'contain'}}
        />
      </View>
      <View style={styles.form}>
        <TextInputField
          name='account'
          placeholder='请输入用户名(英數組合)'
          value={account}
          containerStyle={{width: 230}}
          errorMessage={errors.account}
          leftIcon={
            <InputImage
              icon={inputDonut}
              errorIcon={inputDonutError}
              isError={!isEmpty(errors.account)}
            />
          }
          onBlur={onBlur}
          onChangeText={onChange(setAccount)}
        />
        <TextInputField
          secureTextEntry
          name='password'
          placeholder='請輸入密碼(英數組合)'
          value={password}
          autoCompleteType='off'
          containerStyle={{width: 230}}
          errorMessage={errors.password}
          leftIcon={
            <InputImage
              icon={inputLock}
              errorIcon={inputLockError}
              isError={!isEmpty(errors.password)}
            />
          }
          onBlur={onBlur}
          onChangeText={onChange(setPassword)}
        />
        <TextInputField
          secureTextEntry
          name='confirmPassword'
          placeholder='請再次輸入密碼'
          value={confirmPassword}
          autoCompleteType='off'
          containerStyle={{width: 230}}
          errorMessage={errors.confirmPassword}
          leftIcon={
            <InputImage
              icon={inputLock}
              errorIcon={inputLockError}
              isError={!isEmpty(errors.confirmPassword)}
            />
          }
          onBlur={onBlur}
          onChangeText={onChange(setConfirmPassword)}
        />
        <TextInputField
          name='email'
          value={email}
          placeholder='請輸入 Email'
          containerStyle={{width: 230}}
          errorMessage={errors.email}
          leftIcon={
            <InputImage
              icon={inputLetter}
              errorIcon={inputLetterError}
              isError={!isEmpty(errors.email)}
            />
          }
          onBlur={onBlur}
          onChangeText={onChange(setEmail)}
        />
        <TextInputField
          name='phone'
          value={phone}
          placeholder='請輸入 電話號碼'
          containerStyle={{width: 230}}
          leftIcon={<InputImage icon={inputLetter} />}
          onChangeText={onChange(setPhone)}
        />
      </View>
      <View style={styles.buttonZone}>
        <Button
          title='開始交新朋友吧！'
          onPress={() => submit(payload, setErrors, handleRegisterUser)}
        />
        <Button title='返回' type='outline' onPress={pop} />
      </View>
      <View style={styles.sectionImage}>
        <Image source={bottomLogo} style={styles.bottomImage} />
      </View>
    </ViewContainer>
  );
};

RegisterScreen.options = {
  topBar: {
    visible: false,
  },
};

const styles = StyleSheet.create({
  section: {
    flex: 1,
    maxHeight: 220,
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonZone: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    height: 300,
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomImage: {
    width: 400,
    height: 400,
  },
  sectionImage: {
    flex: 1,
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default RegisterScreen;
