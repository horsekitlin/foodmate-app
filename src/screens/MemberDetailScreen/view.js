import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '~/components/Text';
import colors from '../../theme/color';
import shadow from '../../theme/shadow';
import Avatar from '~/components/Avatar';
import ViewContainer from '~/components/ViewContainer';

const MemberDetailScreen = ({ userId, member, handleGetMemberDetail }) => {

  useEffect(() => {
    handleGetMemberDetail({ userId });
  }, []);

  return (
    <ViewContainer>
      <View style={styles.infoBox}>
        <Avatar
          rounded
          style={styles.avatar}
          source={{uri: member.getIn(['avatar', 'url'])}}
        />
        <View>
          <Text style={styles.nickname}>{member.get('name')}</Text>
          <Text h4>初級食伴</Text>
        </View>
      </View>
    </ViewContainer>
  )
}


const styles = StyleSheet.create({
  infoBox: {
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    borderColor: colors.greyLightest,
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
  introZone: {
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
  },
  settingsZone: {
    marginLeft: 20,
    marginRight: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderWidth: 5,
    marginRight: 15,
    borderRadius: 80,
    borderColor: '#fff',
    backgroundColor: '#fff',
    ...shadow.black,
  },
  buttonTitle: {
    fontSize: 12,
    lineHeight: 10,
    color: colors.grey,
  },
  title: {
    paddingLeft: 20,
  },
  nickname: {
    fontSize: 36,
    color: colors.grey,
  },
});

export default MemberDetailScreen;
