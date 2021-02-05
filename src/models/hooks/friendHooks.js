import cloneDeep from 'lodash/cloneDeep';
import React, { useState, useEffect, useMemo } from 'react';

const DEFAULT_SETION_DATA = [
  {
    title: '審核中',
    data: [],
  },
  {
    title: '好友',
    data: [],
  },
];

export const useFriendsHook = function (database, query = undefined, options = undefined) {
  const [friends, setFriends] = useState([]);
  useMemo(() => {
    if(database) {
      const sub = database.friends.find(query).$.subscribe(items => {
        const result = items.reduce((rs, item) => {
          const index = item.status === 2 ? 1 : 0;
  
          rs[index].data.push(item);
          return rs;
        }, cloneDeep(DEFAULT_SETION_DATA));
        setFriends(result);
      });
      return () => sub.unsubscribe();
    }   
  }, [database, query, options]);
  return friends;
};

export const useFriendDetailHook = (database, id) => {
  const [ friend, setFriend ] = useState({});
  useEffect(() => {
    if(database) {
      const sub = database.friends.findOne().where('id').eq(id).$.subscribe(item => {
        setFriend(item);
        });
        return () => sub.unsubscribe();
    }
  }, [database, id]);
  return friend;
}

export const useFriendRoomsHook = (database) => {
  const [rooms, setRooms] = useState([]);
  useMemo(() => {
    if(database) {
      const sub = database.friends.find().where('status').eq(2).$.subscribe(items => {
        const friendRooms = items.map(item => ({
          type: 'friend',
          title: item.name,
          subTitle: item.account,
          roomId: item.room,
          avatar: item.avatar.url,
          updateAt: item.updateAt,
        }));
        setRooms(friendRooms);
      });
      return () => sub.unsubscribe();
    }   
  }, [database]);
  return rooms;
}

export const useMessagesHook = (database, roomId = '') => {
  const [messages, setMessages] = useState([]);
  useMemo(() => {
    if(database) {
      const sub = database.messages.find().where('room').eq(roomId).sort( {createAt: -1}).$.subscribe(items => {
        const result = items.map(msg => {

          const item = msg.toJSON();
          return {
            ...item,
            _id: msg.id,
            user: {
              ...item.user,
              avatar: item.user.avatar.url,
              _id: item.user.id
            }
          };
        })
        setMessages(result);
      });
      return () => sub.unsubscribe();
    }   
  }, [database, roomId]);
  return messages;
}