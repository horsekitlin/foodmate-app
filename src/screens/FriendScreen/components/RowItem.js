import React from 'react';
import {TouchableOpacity} from 'react-native';
import {ListItem} from 'react-native-elements';
import Avatar from '~/components/Avatar';

async function asyncIteratorWatcher(channel, userId) {
  let asyncIterator = channel.createConsumer();
  while (true) {
    let packet = await asyncIterator.next();
    if (packet.done) break;
  }
}

const VerifyFriendRowItem = ({item, push}) => (
  <ListItem bottomDivider>
    <TouchableOpacity
      style={{flex: 1, flexDirection: 'row'}}
      onPress={() => push('SearchFriend', {friendAccount: item.account})}>
      <Avatar source={{uri: item.avatar.url}} />
      <ListItem.Content style={{marginLeft: 10}}>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.account}</ListItem.Subtitle>
      </ListItem.Content>
    </TouchableOpacity>
    <ListItem.Chevron
      type='font-awesome'
      name='pencil'
      onPress={() => push('SearchFriend', {friendAccount: item.account})}
    />
  </ListItem>
);

const FriendRowItem = ({item, push}) => (
  <ListItem bottomDivider>
    <TouchableOpacity
      style={{flex: 1, flexDirection: 'row'}}
      onPress={() => push('FriendDetail', {friendId: item.id})}>
      <Avatar source={{uri: item.avatar.url}} />
      <ListItem.Content style={{marginLeft: 10}}>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.account}</ListItem.Subtitle>
      </ListItem.Content>
    </TouchableOpacity>
  </ListItem>
);

const RowItem = ({item, push}) =>
  item.status === 1 ? (
    <VerifyFriendRowItem item={item} push={push} />
  ) : (
    <FriendRowItem item={item} push={push} />
  );

export default RowItem;
