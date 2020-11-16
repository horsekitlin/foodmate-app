import types from '../constants/actionTypes';

export const getUserByIdAction = payload => ({
  type: types.GET_USER_BY_ID,
  payload,
});

export const getFriendsAction = payload => ({
  type: types.GET_FRIENDS,
  payload,
});

export const inviteFriendByWebsocketAction = payload => ({
  type: types.INVITE_FRIEND_BY_WEBSOCKET,
  payload,
});

export const rejectFriendByWebsocketAction = payload => ({
  type: types.REJECT_FRIEND_BY_WEBSOCKET,
  payload,
});

export const approveFriendByWebsocketAction = payload => ({
  type: types.APPROVE_FRIEND_BY_WEBSOCKET,
  payload,
});

export const inviteFriendAction = payload => ({
  type: types.INVITE_FRIEND,
  payload,
});

export const rejectInviteFriendAction = payload => ({
  type: types.REJECT_INVITE_FRIEND,
  payload,
});

export const approveInviteFriendAction = payload => ({
  type: types.APPROVE_INVITE_FRIEND,
  payload,
})