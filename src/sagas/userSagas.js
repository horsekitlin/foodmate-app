import {put, select, call} from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import types from '~/constants/actionTypes';
import rootNavigator from '~/navigation/rootNavigator';
import {
  getUserByIdResult,
  updateUserResult,
  getUserByAccountResult,
} from '~/apis/api';

const okGet = (payload) => ({
  type: types.GET_USER_BY_ID_SUCCESS,
  payload,
});

const errGet = ({message}) => {
  return {
    type: types.GET_USER_BY_ID_ERROR,
    payload: {
      message,
    },
  };
};

export function* getUserByIdSaga({payload}) {
  try {
    const {auth, setting} = yield select(({auth, setting}) => ({
      auth,
      setting,
    }));
    const token = auth.get('token');
    const database = setting.get('database');

    if (isEmpty(token) || isEmpty(database)) {
      yield put(okGet());
      return;
    }

    const customHeaders = {
      Authorization: `Bearer ${auth.get('token')}`,
    };
    const {result} = yield call(getUserByIdResult, customHeaders, payload);

    yield put(okGet(result.data));
  } catch (error) {
    const errorAction = errGet(error);
    yield put(errorAction);
  }
}

const okGetMemberDetail = (payload) => ({
  type: types.GET_MEMBER_DETAIL_SUCCESS,
  payload,
});

const errGetMemberDetail = ({message}) => ({
  type: types.GET_MEMBER_DETAIL_ERROR,
  payload: {message},
});

export function* getMemberDetailSaga({payload}) {
  try {
    const {auth, setting} = yield select(({auth, setting}) => ({
      auth,
      setting,
    }));
    const token = auth.get('token');
    const database = setting.get('database');

    if (isEmpty(token) || isEmpty(database)) {
      yield put(okGetMemberDetail());
      return;
    }

    const customHeaders = {
      Authorization: `Bearer ${auth.get('token')}`,
    };
    const {result} = yield call(getUserByIdResult, customHeaders, payload);

    yield put(okGetMemberDetail(result.data));
  } catch (error) {
    const errorAction = errGetMemberDetail(error);
    yield put(errorAction);
  }
}

const okGetAccount = (payload) => ({
  type: types.GET_USER_BY_ACCOUNT_SUCCESS,
  payload,
});

const errGetAccount = ({message}) => ({
  type: types.GET_USER_BY_ACCOUNT_ERROR,
  payload: {
    message,
  },
});

export function* getUserByAccountSaga({payload}) {
  try {
    const {auth, setting} = yield select(({auth, setting}) => ({
      auth,
      setting,
    }));
    const token = auth.get('token');
    const database = setting.get('database');

    if (isEmpty(token) || isEmpty(database)) {
      yield put(okGet());
      return;
    }

    const customHeaders = {
      Authorization: `Bearer ${auth.get('token')}`,
    };
    const {result} = yield call(getUserByAccountResult, customHeaders, payload);

    yield put(okGetAccount(result.data));
  } catch (error) {
    const errorAction = errGetAccount(error);
    yield put(errorAction);
  }
}

const okUpdate = (payload) => ({
  type: types.INIT_USERNAME_SUCCESS,
  payload,
});

const errorUpdate = (payload) => ({
  type: types.INIT_USERNAME_ERROR,
  payload,
});

export function* updateUserSaga({payload}) {
  try {
    const {auth} = yield select(({auth, setting}) => ({auth, setting}));

    const customHeaders = {
      Authorization: `Bearer ${auth.get('token')}`,
    };
    const {result} = yield call(updateUserResult, customHeaders, payload);

    yield put(okUpdate({ ...result.data, name: payload.name}));
    rootNavigator();
  } catch (error) {
    const errorAction = errorUpdate(error);
    yield put(errorAction);
  }
}

const okUpdateProfile = (payload) => ({
  type: types.UPDATE_PROFILE_SUCCESS,
  payload,
});

const errUpdateProfile = ({message}) => ({
  type: types.UPDATE_PROFILE_ERROR,
  payload: {message},
});

export function* updateUserProfileSaga({payload}) {
  try {
    const auth = yield select(({auth}) => auth);

    const customHeaders = {
      Authorization: `Bearer ${auth.get('token')}`,
    };

    const {result} = yield call(updateUserResult, customHeaders, payload);

    yield put(okUpdateProfile({ ...result.data, ...payload }));
  } catch (error) {
    const errorAction = errUpdateProfile(error);
    yield put(errorAction);
  }
}
