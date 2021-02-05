import {Platform, Linking} from 'react-native';

export const onMapOpen = ( place) => () => {
  try {
    const { main_text, secondary_text } = place.structured_formatting;
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const address = `${secondary_text}${main_text}`;
    Linking.openURL(`${scheme}${address}`);
  } catch (error) {
    alert('開啟地圖失敗');
  }
};
