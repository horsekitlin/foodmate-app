import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Text from '~/components/Text';
import Button from '~/components/Button';
import colors from '~/theme/color';
import Subtitle from '~/components/Subtitle';
import Description from '~/components/Description';
import SponsorDialog from './components/SponsorDialog';
import ViewContainer from '~/components/ViewContainer';

const SettingScreen = ({ handleLogout }) => {
  const [visible, setVisible] = useState(false);

  return (
    <ViewContainer>
      <ScrollView>
        <View style={styles.title}>
          <Text h2>設定</Text>
        </View>
        <Subtitle title='帳號登出' />
        <View style={styles.buttonZone}>
          <Button title='帳號登出' onPress={handleLogout} />
        </View>
        <Subtitle title='帳號刪除' />
        <Description content='刪除帳號後我們將不會保留您的任何個人資料，此動作無法回復，刪除前請仔細思考．' />
        <View style={styles.buttonZone}>
          <Button title='帳號刪除' buttonStyle={styles.deleteButton} onPress={() => false} />
        </View>
        <View style={styles.buttonZone}>
          <Button title='資助我們' onPress={() => setVisible(true)} />
          <SponsorDialog visible={visible} setVisible={setVisible} />
        </View>
      </ScrollView>
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
  subtitleText: {
    paddingBottom: 20,
  },
  deleteButton: {
    backgroundColor: colors.error,
  },
});

export default SettingScreen;
