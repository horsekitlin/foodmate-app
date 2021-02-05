import React, { useState } from 'react';
import * as yup from 'yup';
import { View, ScrollView, StyleSheet } from 'react-native';
import isEmpty from 'lodash/isEmpty';
import Button from '~/components/Button';
import TextArea from '~/components/TextArea';
import TextInputField from '~/components/Inputs/TextInputField';
import DatetimeModal from './components/DatetimeModal';
import SelectInput from '~/components/Inputs/SelectInput';
import InputIcon from '~/components/Inputs/InputIcon';
import ConfirmDialog from './components/ConfirmDialog';
import PickPlaceModal from './components/PickPlaceModal';
import EventPhotoBlock from '~/components/EventPhotoBlock';
import { handleUploadImage, handleDeleteImage } from '~/helper/imageUploadHelper';
import { PAYMENT_METHOD, EVENT_TYPES } from '~/constants/selectItems';
import { useNavigation } from 'react-native-navigation-hooks';
import { handleYupSchema, handleYupErrors } from '~/helper/yupHelper';
import {
  urlSchema,
  nameSchema,
  enumSchema,
  dateSchema,
} from '~/constants/yupSchemas';
import colors from '~/theme/color';
import { getResolution, RESOLUTION } from '~/helper/imageResolutionHelper';

const DEFAULT_EVENT_IMAGE = {
  id: '9a8c43cd1bef6b3a0d66bd88c8cb2ee9',
  type: 'image/jpg',
  url: 'https://www.bomb01.com/upload/news/original/9a8c43cd1bef6b3a0d66bd88c8cb2ee9.jpg',
  deletehash: '',
};
import ViewContainer from '~/components/ViewContainer';

const logoSchema = yup.object().shape({
  deletehash: yup.string(),
  id: yup.string(),
  type: yup.string(),
  url:  urlSchema('錯誤的圖片連結', '請上傳活動照片'),
});

const schema = yup.object().shape({
  logo: logoSchema,
  type: enumSchema([0, 1, 2], '錯誤的活動類型', '請選擇活動類型'),
  paymentMethod: enumSchema([0, 1, 2, 3], '錯誤的分攤方式', '請選擇分攤方式'),
  budget: yup.number().typeError('請輸入數字金額').required('請輸入預算'),
  title: nameSchema('請輸入活動名稱'),
  datingAt: dateSchema('請輸入活動日期'),
  finalReviewAt: dateSchema('請輸入審核截止日期'),
  userCountMax: yup.number().typeError('請輸入數字').required('請輸入參與人數'),
  description: yup.string().required('請輸入簡介'),
  place: yup.object().required('請選擇活動地點'),
});

const onUploadSuccess = (setter) => (data) => {
  setter(data);
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

const onUploadImage = (deleteHash, setUploadedImage) => () => {
 if(!isEmpty(deleteHash))
    handleDeleteImage(deleteHash);

  handleUploadImage(onUploadSuccess(setUploadedImage), onUploadError);
};

const submit = (payload, setErrors, setDialogVisible) => async () => {
  if (await validateData(payload, setErrors)) {
    setDialogVisible(true);
    return;
  }
};

const handleOnBlur = (errors, editPayload, setErrors) => async () => {
  if (!isEmpty(errors)) await validateData(editPayload, setErrors);
};

const handleConfirmPlace = (setPlace) => (place) => {
  setPlace(place);
};

const CreateActivityScreen = (props) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [type, setType] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(0);
  const [budget, setBudget] = useState('100');
  const [uploadedImage, setUploadedImage] = useState(DEFAULT_EVENT_IMAGE);
  const [title, setTitle] = useState('test003');
  const [userCountMax, setUserCountMax] = useState('2');
  const [description, setDescription] = useState('teskldfjasdlkfj');
  const [place, setPlace] = useState({});
  const [datingAt, setDatingAt] = useState(new Date());
  const [finalReviewAt, setFinalReviewAt] = useState(new Date());
  const [errors, setErrors] = useState({});

  const {push} = useNavigation();

  const payload = {
    logo: { ...uploadedImage },
    publicationPlace: '台北',
    type,
    paymentMethod,
    budget,
    title,
    datingAt,
    finalReviewAt,
    userCountMax,
    description,
    place,
  };

  const onSubmit = submit(payload, setErrors, setDialogVisible);

  const handleCreateEvent = () => {
    props.handleCreateEvent({
      ...payload,
      push,
      onSuccess: () => setDialogVisible(false),
    });
  };

  const onBlur = handleOnBlur(errors, payload, setErrors);

  const confirmPlace = handleConfirmPlace(setPlace);

  return (
    <ViewContainer>
    <ScrollView
      contentContainerStyle={styles.scroll}
      keyboardShouldPersistTaps='always'>
      <EventPhotoBlock
        uri={getResolution(uploadedImage.url, RESOLUTION.MEDIUM)}
        onEditClick={onUploadImage(uploadedImage.deletehash, setUploadedImage)}
      />
      <ConfirmDialog
        payload={payload}
        visible={dialogVisible}
        onClose={() => setDialogVisible(false)}
        handleCreateEvent={handleCreateEvent}
      />
      <View style={styles.form}>
        <TextInputField
          name='title'
          placeholder='活動名稱'
          value={title}
          containerStyle={{ width: 230 }}
          onChangeText={(text) => setTitle(text)}
          errorMessage={errors.title}
          onBlur={onBlur}
          leftIcon={
            <InputIcon
              size={30}
              type='material'
              name='local-activity'
              color={colors.greyLightest}
              isError={!isEmpty(errors.title)}
            />
          }
        />
        <DatetimeModal
          placeholder='活動日期'
          onConfirm={(date) => setDatingAt(date)}
          defaultDate={datingAt}
          errorMessage={errors.datingAt}
          onBlur={onBlur}
          leftIcon={
            <InputIcon
              size={30}
              type='material'
              name='calendar-today'
              color={colors.greyLightest}
              isError={!isEmpty(errors.datingAt)}
            />
          }
        />
        <DatetimeModal
          placeholder='審核截止日期'
          onConfirm={(date) => setFinalReviewAt(date)}
          defaultDate={finalReviewAt}
          errorMessage={errors.finalReviewAt}
          onBlur={onBlur}
          leftIcon={
            <InputIcon
              size={30}
              type='material'
              name='event-available'
              color={colors.greyLightest}
              isError={!isEmpty(errors.finalReviewAt)}
            />
          }
        />
        <TextInputField
          name='userCountMax'
          placeholder='參與人數'
          value={userCountMax}
          errorMessage={errors.userCountMax}
          containerStyle={{ width: 230 }}
          onChangeText={(text) => setUserCountMax(text)}
          onBlur={onBlur}
          leftIcon={
            <InputIcon
              size={30}
              type='material'
              name='people'
              color={colors.greyLightest}
              isError={!isEmpty(errors.userCountMax)}
            />
          }
        />
        <SelectInput
          value={type}
          items={EVENT_TYPES}
          placeholderText='請選擇活動類型'
          errorMessage={errors.type}
          onValueChange={(value) => setType(value)}
          onBlur={onBlur}
          leftIcon={
            <InputIcon
              size={30}
              type='material'
              name='bookmarks'
              color={colors.greyLightest}
              isError={!isEmpty(errors.type)}
            />
          }
        />
        <TextInputField
          name='budget'
          placeholder='消費預算'
          value={budget}
          errorMessage={errors.budget}
          containerStyle={{ width: 230 }}
          onBlur={onBlur}
          onChangeText={(text) => setBudget(text)}
          leftIcon={
            <InputIcon
              size={30}
              type='material'
              name='credit-card'
              color={colors.greyLightest}
              isError={!isEmpty(errors.budget)}
            />
          }
        />
        <SelectInput
          placeholderText='請選擇分攤方式'
          value={paymentMethod}
          errorMessage={errors.paymentMethod}
          onValueChange={(value) => setPaymentMethod(value)}
          items={PAYMENT_METHOD}
          onBlur={onBlur}
          leftIcon={
            <InputIcon
              size={30}
              type='material'
              name='monetization-on'
              color={colors.greyLightest}
              isError={!isEmpty(errors.paymentMethod)}
            />
          }
        />
        <PickPlaceModal
          place={place}
          errorMessage={errors.place}
          onConfirm={confirmPlace}
          onBlur={onBlur}
          leftIcon={
            <InputIcon
              size={30}
              type='material'
              name='place'
              color={colors.greyLightest}
              isError={!isEmpty(errors.place)}
            />
          }
        />
        <TextArea
          title='簡介'
          numberOfLines={4}
          placeholder='請輸入簡介'
          value={description}
          onBlur={onBlur}
          errorMessage={errors.description}
          containerStyle={styles.textarea}
          onChangeText={(text) => setDescription(text)}
        />
        <Button title='確認' onPress={onSubmit} />
      </View>
    </ScrollView>
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  scroll: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 230,
  },
  textarea: {
    width: 230,
    height: 200,
  },
});

export default CreateActivityScreen;
