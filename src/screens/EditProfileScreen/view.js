import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import isEmpty from 'lodash/isEmpty';
import cloneDeep from 'lodash/cloneDeep';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from 'react-native-navigation-hooks/dist';
import shadow from '../../theme/shadow';
import colors from '../../theme/color';
import Button from '~/components/Button';
import Avatar from '~/components/Avatar';
import TextArea from '~/components/TextArea';
import InputImage from '~/components/Inputs/InputImage';
import ScrollContainer from '~/components/ScrollContainer';
import TextInputField from '~/components/Inputs/TextInputField';
import { nameSchema } from '~/constants/yupSchemas';
import { inputDonut, inputDonutError } from '~/assets/icons';
import { handleUploadImage } from '~/helper/imageUploadHelper';
import { Button as NativeButton } from 'react-native-elements';
import { handleYupSchema, handleYupErrors } from '~/helper/yupHelper';

const DEFAULT_PAYLOAD = {
  name: '',
  avatar: {},
  description: '',
};

const avatarSchema = yup.object().shape({
  deletehash: yup.string(),
  id: yup.string(),
  type: yup.string(),
  url:  yup.string().url().typeError('錯誤的圖片連結'),
});

const schema = yup.object().shape({
  avatar: avatarSchema,
  name: nameSchema('請輸入暱稱'),
  description: yup.string().required('請輸入自我介紹'),
});

const onUploadSuccess = (setter) => (link) => {
  if(isEmpty(link.url)) return;
  setter(state => ({ ...state, avatar: link }));
};

const handleOnChange = (setter) => (name) => (value) => {
  setter((payload) => ({ ...payload, [name]: value }));
};

const onUploadError = (error) => {
  alert(error.message);
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

const handleOnBlur = (errors, payload, setErrors) => async () => {
  if (!isEmpty(errors)) await validateData(payload, setErrors);
};

const onUploadImage = (setUploadedImage) => () => {
  handleUploadImage(onUploadSuccess(setUploadedImage), onUploadError);
};

const submit = ({
  pop,
  userId,
  payload,
  setErrors,
  handleUpdateProfile,
}) => async () => {
  if (await validateData(payload, setErrors)) {
    handleUpdateProfile({ ...payload, id: userId });
    pop();
  }
};

const EditProfileScreen = ({ auth, handleUpdateProfile, passProps }) => {
  const [errors, setErrors] = useState({});
  const [payload, setPayload] = useState(cloneDeep(DEFAULT_PAYLOAD));

  const { pop } = useNavigation();

  useEffect(() => {
    if (!isEmpty(passProps)) {
      const { username, description, avatar } = passProps;
      setPayload(cloneDeep({ name: username, description, avatar }));
    }
  }, [passProps]);

  const onChange = handleOnChange(setPayload);

  const onSubmit = submit({
    pop,
    payload,
    setErrors,
    handleUpdateProfile,
    userId: auth.get('id'),
  });

  const onBlur = handleOnBlur(errors, payload, setErrors);

  return (
    <ScrollContainer containerStyle={styles.container}>
      <View style={styles.form}>
        <View style={styles.panel}>
          <Avatar
            rounded
            avatarStyle={styles.avatar}
            containerStyle={styles.avatarContainer}
            source={{ uri: payload.avatar.url }}
          />
          <NativeButton
            title='編輯大頭照'
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            onPress={onUploadImage(setPayload)}
            containerStyle={styles.buttonContainer}
          />
          <TextInputField
            name='name'
            placeholder='請輸入暱稱'
            errorMessage={errors.name}
            onBlur={onBlur}
            value={payload.name}
            onChangeText={onChange('name')}
            leftIcon={
              <InputImage
                icon={inputDonut}
                errorIcon={inputDonutError}
                isError={!isEmpty(errors.name)}
              />
            }
          />
          <TextArea
            title='自我介紹'
            numberOfLines={4}
            name='description'
            placeholder='請輸入自我介紹'
            value={payload.description}
            onBlur={onBlur}
            errorMessage={errors.description}
            containerStyle={styles.textarea}
            onChangeText={onChange('description')}
          />
        </View>
      </View>
      <View style={styles.buttonZone}>
        <Button title='儲存' onPress={onSubmit} />
        <Button title='返回' type='outline' onPress={pop} />
      </View>
    </ScrollContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF'
  },
  panel: {
    width: 230,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  buttonZone: {
    paddingTop: 20,
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 80,
    overflow: 'hidden'
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderWidth: 5,
    borderRadius: 80,
    marginBottom: 20,
    borderColor: '#fff',
    backgroundColor: '#fff',
    ...shadow.black,
  },
  buttonTitle: {
    fontSize: 12,
    lineHeight: 10,
    color: colors.grey,
  },
  buttonContainer: {
    margin: 5,
    flex: 1,
  },
  button: {
    borderWidth: 1.5,
    height: 30,
    borderRadius: 5,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  textarea: {
    width: 230,
    height: 200,
  },
});

export default EditProfileScreen;
