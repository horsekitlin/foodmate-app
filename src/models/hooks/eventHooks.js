import React, { useState, useMemo } from 'react';
import isEmpty from 'lodash/isEmpty';

export const useEventsHook = function (database) {
  const [events, setEvents] = useState([]);
  useMemo(() => {
    if(database) {
      const sub = database.events.find().sort({ createAt: 'desc'}).$.subscribe(items => {
        const eventItems = items.map(item => item.toJSON());
        setEvents(eventItems);
      });
      return () => {
        sub.unsubscribe();
      }
    }   
  }, [database]);
  return events;
};

export const useEventDetailHook = function (database, id) {
  const [event, setEvent] = useState({});
  useMemo(() => {
    if(database) {
      const sub = database.events.findOne().where('id').eq(id).$.subscribe(item => {
        setEvent(item.toJSON());
      });
      return () => sub.unsubscribe();
    }   
  }, [database, id]);
  return event;
}

export const useEventRoomsHook = (database, authUserId) => {
  const [rooms, setRooms] = useState([]);
  useMemo(() => {
    if(database) {
        const sub = database.events.find().$.subscribe(items => {
        let nextItems = [];
        for(let index = 0; index < items.length; index++){
          const item = items[index];
          if(item.creator.id === authUserId) {
            nextItems.push({
              type: 'event',
              title: item.title,
              subTitle: item.creator.name,
              roomId: item.room,
              avatar: item.logo.url,
              updateAt: item.updateAt,
            });
          } else {
            const user = item.users.find(u => u.status === 1 && u.info.id === authUserId);
            if(!isEmpty(user)) {
              nextItems.push({
                type: 'event',
                title: item.title,
                subTitle: item.creator.name,
                roomId: item.room,
                avatar: item.logo.url,
                updateAt: item.updateAt,
              });
            }
          }
        }
        setRooms(nextItems);
      });
      return () => {
        sub.unsubscribe();
      }

    }   
  }, []);
  return rooms;
}
