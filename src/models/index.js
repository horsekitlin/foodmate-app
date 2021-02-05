import { decode, encode } from 'base-64';
import { addRxPlugin, createRxDatabase } from 'rxdb';
import {
  useFriendsHook,
  useMessagesHook,
  useFriendRoomsHook,
  useFriendDetailHook,
} from './hooks/friendHooks';
import {
  useEventsHook,
  useEventRoomsHook,
  useEventDetailHook,
} from './hooks/eventHooks';
import isEmpty from 'lodash/isEmpty';
import SQLite from 'react-native-sqlite-2';
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite';
import userSchema from './userSchema';
import friendSchema from './friendSchema';
import messageSchema from './messageSchema';
import eventSchema from './eventSchema';


if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

// Avoid using node dependent modules
process.browser = true;

let foodmateDB = null;

const SQLiteAdapter = SQLiteAdapterFactory(SQLite);

addRxPlugin(SQLiteAdapter);
addRxPlugin(require('pouchdb-adapter-http'));

export const destoryDatabase = async (database) => {
  return await Promise.all([
    database.users.remove(),
    database.friends.remove(),
    database.messages.remove(),
    database.events.remove(),
  ]);
};

export const initialCollections = async (database) => {
  return await Promise.all([
    database.collection({
      name: 'users',
      schema: userSchema,
    }),
    database.collection({
      name: 'events',
      schema: eventSchema,
    }),
    database.collection({
      name: 'friends',
      schema: friendSchema,
      methods: {
        updateStatus: function (status) {
          this.status = status;
          return this.save();
        },
      },
      statics: {
        findAndUpdateStatus: async function (friend, status) {
          const doc = await this.findOne({ id: friend.id });
          if (isEmpty(doc)) {
            await this.create({ ...friend, status });
          } else {
            doc.status = status;
            await doc.save();
          }
        },
      },
    }),
    database.collection({
      name: 'messages',
      schema: messageSchema,
    }),
  ]);
};

export const initSQL = async () => {
  const database = await createRxDatabase({
    name: 'foodmate',
    adapter: 'react-native-sqlite', // the name of your adapter
    multiInstance: false,
    ignoreDuplicate: true,
  });

  foodmateDB = database;

  await initialCollections(database);

  return database;
};

export const useFriends = (query, options) => {
  return useFriendsHook(foodmateDB, query, options);
};

export const useFriendDetail = (id) => {
  return useFriendDetailHook(foodmateDB, id);
};

export const useEvents = (query, options) => {
  return useEventsHook(foodmateDB, query, options);
};

export const useEventDetail = (id) => {
  return useEventDetailHook(foodmateDB, id);
};

export const useFriendRooms = () => {
  return useFriendRoomsHook(foodmateDB);
};

export const useEventRooms = (authUserId) => {
  return useEventRoomsHook(foodmateDB, authUserId);
};

export const useMessages = (roomId) => {
  return useMessagesHook(foodmateDB, roomId);
};
