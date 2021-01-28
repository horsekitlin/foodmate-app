import ImagePicker from 'react-native-image-picker';
import {Platform} from 'react-native';
import Config from 'react-native-config';
import {uploadImgUrlResult} from '~/apis/api';

const DEFAULT_OPTIONS = {
  mediaType: 'photo',
  includeBase64: false,
  maxHeight: 960,
  maxWidth: 960,
};

const getImageByPlatform = (photo) => {
  let formData = new FormData();

  const uri = Platform.select({
    ios: photo.uri.replace('file://', ''),
    android: photo.uri,
  });

  const fileName = uri.split('/').pop();
  const options = {
    name: fileName,
    type: photo.type,
    uri,
  };

  formData.append('image', options);
  return formData;
};

export const handleUploadImage = (
  onSuccess,
  onError,
  imageOptions = DEFAULT_OPTIONS
) => {
  ImagePicker.launchImageLibrary(imageOptions, async (photo) => {
    const formData = getImageByPlatform(photo);

    try {
      const Authorization = `Client-ID ${Config.IMG_URL_CLIENT_ID}`;
      const result = await uploadImgUrlResult({ Authorization },formData);

      onSuccess(result.data.link);
    } catch (error) {
      onError(error);
    }
  });
};
