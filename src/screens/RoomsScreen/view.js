import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useNavigation } from 'react-native-navigation-hooks';
import { useEventRooms, useFriendRooms } from '~/models';
import ViewContainer from '~/components/ViewContainer';
import RoomItem from './components/RoomItem';

const RoomsScreen = (props) => {
  const friendRooms = useFriendRooms();
  const eventRooms = useEventRooms(props.authUserId);

  const { push } = useNavigation();

  return (
    <ViewContainer>
      <FlatList
       
        keyExtractor={item => item.roomId}
        data={[...friendRooms, ...eventRooms]}
        renderItem={({ item }) => {
          return (
            <RoomItem
              {...item}
              push={push}
              socket={props.socket}
              userId={props.authUserId}
              handleAddMessageByWebsocket={props.handleAddMessageByWebsocket}
            />
          );
        }}
      /></ViewContainer>
  );
};

RoomsScreen.options = {
  topBar: {
    title: {
      text: '聊天室',
    },
  },
};

export default RoomsScreen;
