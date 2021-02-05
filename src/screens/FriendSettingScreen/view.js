import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '~/components/Text';
import Button from '~/components/Button';
import colors from '~/theme/color';
import Subtitle from '~/components/Subtitle';
import Description from '~/components/Description';
import ViewContainer from '~/components/ViewContainer';
import { useNavigation } from 'react-native-navigation-hooks';

const FriendSettingScreen = ({ friendId, handleDeleteFriend }) => {
  const { popToRoot } = useNavigation();

  return (
    <ViewContainer>
      <View style={styles.title}>
        <Text h2>設定</Text>
      </View>
      <Subtitle title='刪除好友' />
      <Description content='刪除好友後我們將不會保留聊天資料，此動作無法回復，刪除前請仔細思考．' />
      <View style={styles.buttonZone}>
        <Button
          title='刪除好友'
          buttonStyle={styles.deleteButton}
          onPress={() => {
            const payload = {
              friendId,
              onSuccess: popToRoot
            };
            handleDeleteFriend(payload);
          }} />
      </View>
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  buttonZone: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    padding: 30,
  },
  deleteButton: {
    backgroundColor: colors.error,
  },
});

export default FriendSettingScreen;
