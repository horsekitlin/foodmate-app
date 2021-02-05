import { put, call, select } from 'redux-saga/effects';
import types from '~/constants/actionTypes';
import isFunction from 'lodash/isFunction';
import {
  joinEventResult,
  leaveEventResult,
  createEventResult,
  validEventMemberResult,
  rejectMemberByAdminResult,
} from '~/apis/api';
import { parseEventItem } from '~/utils/utils';

const okCreate = (payload) => ({
  type: types.CREATE_EVENT_SUCCESS,
  payload,
});

const errCreate = ({ message }) => {
  return {
    type: types.CREATE_EVENT_ERROR,
    payload: {
      message,
    },
  };
};

export function* createEventSaga({ payload = {} }) {
  try {
    const { push, onSuccess, ...createdPayload } = payload;

    const { auth, setting } = yield select(({ auth, setting }) => ({
      auth,
      setting,
    }));
    const database = setting.get('database');

    const customHeaders = {
      Authorization: `Bearer ${auth.get('token')}`,
    };

    const { result } = yield call(
      createEventResult,
      customHeaders,
      createdPayload
    );

    if (isFunction(onSuccess)) onSuccess();

    push('EventDetail', { passProps: { eventId: result.data.id } });

    yield database.events.insert(parseEventItem(result.data));
    yield put(okCreate());

  } catch (error) {
    const errorAction = errCreate(error);
    yield put(errorAction);
  }
}

const okReject = (payload) => ({
  type: types.REJECT_MEMBER_BY_ADMIN_SUCCESS,
  payload,
});

const errReject = ({ message }) => {
  return {
    type: types.REJECT_MEMBER_BY_ADMIN_ERROR,
    payload: {
      message,
    },
  };
};

export function* rejectMemberByAdminSaga({ payload }) {
  try {
    const { auth, setting } = yield select(({ auth, setting }) => ({
      auth,
      setting,
    }));
    const database = setting.get('database');

    const customHeaders = {
      Authorization: `Bearer ${auth.get('token')}`,
    };

    const { result } = yield call(rejectMemberByAdminResult, customHeaders, payload);
    const event = yield database.events
      .findOne()
      .where('id')
      .eq(payload.eventId)
      .exec();

    const newEventItem = parseEventItem(result.data);
    yield event.atomicUpdate(oldData => {
      Object.keys(newEventItem).map(key => {
        oldData[key] = newEventItem[key];
      })
      return oldData;
    });

    return yield put(okReject());
  } catch (error) {
    const errorAction = errReject(error);
    yield put(errorAction);
  }
}

const okJoin = (payload) => ({
  type: types.JOIN_EVENT_SUCCESS,
  payload,
});

const errJoin = ({ message }) => {
  return {
    type: types.JOIN_EVENT_ERROR,
    payload: {
      message,
    },
  };
};

export function* joinEventSaga({ payload = {} }) {
  try {
    const { auth, setting } = yield select(({ auth, setting }) => ({
      auth,
      setting,
    }));
    const database = setting.get('database');

    const customHeaders = {
      Authorization: `Bearer ${auth.get('token')}`,
    };

    const { result } = yield call(joinEventResult, customHeaders, payload);

    const eventQuery = yield database.events
      .findOne()
      .where('id')
      .eq(payload.eventId);
    yield eventQuery.update({
      $set: {
        users: result.data.event.users,
      },
    });

    yield put(okJoin());
  } catch (error) {
    const errorAction = errJoin(error);
    yield put(errorAction);
  }
}

const okValid = (payload) => ({
  type: types.VALID_MEMBER_SUCCESS,
  payload,
});

const errValid = ({ message }) => ({
  type: types.VALID_MEMBER_ERROR,
  payload: {
    message,
  },
});

export function* validEventMemberSaga({ payload = {} }) {
  try {
    const { auth, setting } = yield select(({ auth, setting }) => ({
      auth,
      setting,
    }));
    const database = setting.get('database');

    const customHeaders = {
      Authorization: `Bearer ${auth.get('token')}`,
    };

    const { result } = yield call(validEventMemberResult, customHeaders, payload);

    const eventQuery = yield database.events
      .findOne()
      .where('id')
      .eq(payload.eventId);

    yield eventQuery.update({
      $set: {
        users: result.data.event.users,
      },
    });

    yield put(okValid());
  } catch (error) {
    const errorAction = errValid(error);
    yield put(errorAction);
  }
}


const okLeave = (payload) => ({
  type: types.LEAVE_EVENT_SUCCESS,
  payload,
});

const errLeave = ({ message }) => {
  return {
    type: types.LEAVE_EVENT_ERROR,
    payload: {
      message,
    },
  };
};

export function* leaveEventSaga({ payload: {onSuccess, ...payload} }) {
  try {
    const { auth, setting } = yield select(({ auth, setting }) => ({
      auth,
      setting,
    }));
    const database = setting.get('database');

    const customHeaders = {
      Authorization: `Bearer ${auth.get('token')}`,
    };

    const { result } = yield call(leaveEventResult, customHeaders, payload);

    const eventQuery = yield database.events
      .findOne()
      .where('id')
      .eq(payload.eventId);
    yield eventQuery.update({
      $set: {
        users: result.data.event.users,
      },
    });

    yield put(okLeave());

    if(onSuccess) onSuccess();

  } catch (error) {
    const errorAction = errLeave(error);
    yield put(errorAction);
  }
}
