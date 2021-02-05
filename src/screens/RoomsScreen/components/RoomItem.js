import React, {useEffect, Fragment} from 'react';
import {StyleSheet} from 'react-native';
import {ListItem, Icon, colors} from 'react-native-elements';
import Avatar from '~/components/Avatar';

async function asyncIteratorWatcher(
  channel,
  userId,
  handleAddMessageByWebsocket
) {
  let asyncIterator = channel.createConsumer();
  while (true) {
    let packet = await asyncIterator.next();
    if (packet.done) break;
    const {user} = packet.value;
    if (user.id !== userId) {
      handleAddMessageByWebsocket(packet.value);
    }
  }
}

const TypeIcon = ({type}) => {
  if (type !== 'event') return <Fragment />;

  return (
    <Icon size={12} type='font-awesome' name='users' color={colors.grey4} style={styles.icon} />
  );
};

const RoomItem = ({
  socket,
  userId,
  title,
  subTitle,
  avatar,
  roomId,
  type,
  push,
  handleAddMessageByWebsocket,
}) => {
  useEffect(() => {
    const channel = socket.subscribe(`room.newMessage.${roomId}`);
    asyncIteratorWatcher(channel, userId, handleAddMessageByWebsocket);
    return () => channel.kill();
  }, []);

  return (
    <ListItem bottomDivider onPress={() => push('Chat', {roomId, type})}>
      <Avatar rounded source={{uri: avatar}} />
      <ListItem.Content>
        <ListItem.Title>
          {title}
          <TypeIcon type={type} />
        </ListItem.Title>
        <ListItem.Subtitle style={styles.subtitle}>
          {subTitle}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: colors.grey3,
  },
  icon: {
    marginLeft: 5
  }
});

export default RoomItem;
