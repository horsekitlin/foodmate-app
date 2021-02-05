import React, {Fragment} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import isEmpty from 'lodash/isEmpty';
import {useFriendDetail} from '~/models';
import Button from '~/components/Button';
import colors from '../../theme/color';
import shadow from '../../theme/shadow';
import Text from '~/components/Text';
import Avatar from '~/components/Avatar';
import ViewContainer from '~/components/ViewContainer';
import {useNavigation} from 'react-native-navigation-hooks';
import image from '~/assets/images/actor-ghost-donut.png';

const EmptyFriendContent = (props) => {
  return (
    <View style={styles.emptyContainer}>
      <Image source={image} style={styles.emptyActor} />
      <Text>找不到這名成員</Text>
    </View>
  );
};

const FriendDetailScreen = ({friendId}) => {
  const {push} = useNavigation();
  const friend = useFriendDetail(friendId);
  
  if (isEmpty(friend)) return <EmptyFriendContent />;

  return (
    <ViewContainer style={styles.container}>
      <View style={styles.infoBox}>
        <Avatar
          rounded
          style={styles.avatar}
          source={{uri: friend.get(['avatar', 'url'])}}
        />
        <View>
          <Text style={styles.nickname}>{friend.get('name')}</Text>
          <Text h4>{friend.get('job')}</Text>
        </View>
      </View>
      <View style={styles.introZone}>
        <Text h5>{friend.get('description')}</Text>
      </View>
      <Button
        title='開始聊天'
        onPress={() => push('Chat', {roomId: friend.get('room')})}
      />
      <Button
        title='設定'
        type='outline'
        onPress={() => push('FriendSetting', {friendId: friend.get('friendId')})}
      />
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  infoBox: {
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    borderColor: colors.greyLightest,
  },
  introZone: {
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
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
  title: {
    paddingLeft: 20,
  },
  nickname: {
    fontSize: 36,
    color: colors.grey,
  },
  emptyContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyActor: {width: 50, height: 50, margin: 10},
});

export default FriendDetailScreen;
