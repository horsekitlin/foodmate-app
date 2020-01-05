import * as types from '../actions/actionTypes';

export const initialState = {
  email: '',
  phone_number: '',
  password: '',
  re_password: ''
};

const reducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case types.UPDATE_STATE:
      const { key, value } = payload;
      return { ...state, [key]: value };
    default:
      return state;
  }
};

export default reducer;
