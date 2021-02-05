import { put, call, select } from 'redux-saga/effects';
import types from '~/constants/actionTypes';
import { addMessageResult, getMessagesResult } from '~/apis/api';
import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';
import addSeconds from 'date-fns/addSeconds';
import format from 'date-fns/format';
import { parseISOString } from '~/helper/dateHelper';

const okGet = () => ({
  type: types.GET_MESSAGES_SUCCESS,
});

const errGet = ({ message }) => {
  return {
    type: types.GET_MESSAGES_ERROR,
    payload: {
      message,
    },
  };
};

export function* getMessagesSaga({ payload }) {
  try {
    const { auth, setting } = yield select(({ auth, setting }) => ({ auth, setting }));
    const token = auth.get('token');
    const database = setting.get('database');
    
    if (isEmpty(token) || isEmpty(database)) {
      yield put(okGet());
      return;
    }
    
    const customHeaders = {
      Authorization: `Bearer ${auth.get('token')}`
    };

    const msg = yield database.messages.findOne().sort({createAt: -1}).exec();

    const queryObject = isEmpty(msg)
      ? payload
      : { ...payload, createAt: format(addSeconds(new Date(msg.createAt), 0.01), 'yyyy-MM-dd HH:mm:ss') }
    const { result } = yield call(getMessagesResult, customHeaders, queryObject);

    if(result.data.messages.length === 0) {
      return yield put(okGet());
    }

    const messages = result.data.messages.reduce((result, room) => {
      const items = room.messages.map(message => {
        return {
          ...message,
          room: room.room,
          text: isNull(message.text)? '': message.text,
          image: isNull(message.image)? '': message.image,
          attachment: isNull(message.attachment)? '': message.attachment,
          createAt: parseISOString(message.createAt),
        }
      });
      return [...result, ...items];
    }, []);

    yield database.messages.bulkInsert(messages);
    yield put(okGet());
  } catch (error) {
    const errorAction = errGet(error);
    yield put(errorAction);
  }
}


const okAdd = () => ({
  type: types.ADD_MESSAGE_SUCCESS,
});

const errAdd = ({ message }) => {
  return {
    type: types.ADD_MESSAGE_ERROR,
    payload: {
      message,
    },
  };
};

export function* addMessageSaga({ payload }) {
  try {
    const { auth, setting } = yield select(({ auth, setting }) => ({ auth, setting }));
    const token = auth.get('token');
    const database = setting.get('database');
    
    if (isEmpty(token) || isEmpty(database)) {
      yield put(okAdd());
      return;
    }
    
    const customHeaders = {
      Authorization: `Bearer ${auth.get('token')}`
    };
    
    const { result } = yield call(addMessageResult, customHeaders, payload);
    const newMessage = {
      ...result.data,
      createAt: parseISOString(result.data.createAt),
    }

    yield database.messages.insert(newMessage);
    
    yield put(okAdd());
  } catch (error) {
    const errorAction = errAdd(error);
    yield put(errorAction);
  }
}
