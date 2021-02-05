import { getUrl } from './libs/route';
import {
  fetchWithoutToken,
  fetchGetWithToken,
  fetchPostWithToken,
  fetchPatchWithToken,
  fetchWithFormData,
  fetchDeleteWithFormData,
} from './libs/fetch';

export const getRoomsResult = (customHeaders, payload) =>
  fetchGetWithToken(getUrl('rooms'), customHeaders, payload);

export const getFriendsResult = (customHeaders, payload) =>
  fetchGetWithToken(getUrl('friends'), customHeaders, payload);

export const getMessagesResult = (customHeaders, { roomId, ...payload }) =>
  fetchGetWithToken(getUrl(`messages/${roomId}`), customHeaders, payload);

export const getUserByIdResult = (customHeaders, { userId }) =>
  fetchGetWithToken(getUrl(`users/${userId}`), customHeaders);

export const addMessageResult = (customHeaders, { roomId, ...payload }) =>
  fetchPostWithToken(getUrl(`messages/${roomId}`), customHeaders, payload);

export const createEventResult = (customHeaders, payload) =>
  fetchPostWithToken(getUrl('events'), customHeaders, payload);

export const joinEventResult = (customHeaders, { eventId }) =>
  fetchPostWithToken(getUrl(`events/${eventId}`), customHeaders);

export const leaveEventResult = (customHeaders, { eventId }) =>
  fetchPostWithToken(getUrl(`events/leave/${eventId}`), customHeaders);

export const rejectMemberByAdminResult = (customHeaders, { eventId, userId }) =>
  fetchPostWithToken(getUrl(`events/${eventId}/reject/${userId}`), customHeaders);

export const validEventMemberResult = (customHeaders, { eventId, userId }) =>
  fetchPostWithToken(getUrl(`events/${eventId}/validate/${userId}`), customHeaders);

export const inviteFriendResult = (customHeaders, { userId }) =>
  fetchPostWithToken(getUrl(`friends/invite/${userId}`), customHeaders);

export const rejectInviteFriendResult = (customHeaders, { friendId }) =>
  fetchPostWithToken(getUrl(`friends/reject/${friendId}`), customHeaders);

export const approveInviteFriendResult = (customHeaders, { friendId }) =>
  fetchPostWithToken(getUrl(`friends/approve/${friendId}`), customHeaders);

export const deleteFriendResult = (customHeaders, { friendId }) =>
  fetchPostWithToken(getUrl(`friends/delete/${friendId}`), customHeaders);

export const registerUserResult = (payload) =>
  fetchWithoutToken(getUrl('users'), 'POST', payload);

export const updateUserResult = (customHeaders, payload) =>
  fetchPatchWithToken(getUrl('users'), customHeaders, payload);

export const getUserByAccountResult = (customHeaders, { account }) =>
  fetchGetWithToken(getUrl(`users/searchAccount/${account}`), customHeaders);

export const uploadImgUrlResult = (customHeaders, formData) =>
  fetchWithFormData('https://api.imgur.com/3/upload', customHeaders, formData);

export const deleteImglResult = (customHeaders, imageHash) =>
  fetchDeleteWithFormData(`https://api.imgur.com/3/image/${imageHash}`, customHeaders);

export const loginResult = async (payload) => {
  try {
    const resp = await fetchWithoutToken(getUrl('login'), 'POST', payload);

    const { ok, result } = resp;
    if (!ok) {
      const error = new Error(result.error_description);
      throw error;
    }
    return resp;
  } catch (error) {
    throw error;
  }
};

export const getTokenResult = async (payload) => {
  try {
    const resp = await fetchWithoutToken(getUrl('v1/login'), 'POST', payload);
    const { ok, result } = resp;
    if (!ok) {
      const error = new Error(result.error_description);
      throw error;
    }

    return resp;
  } catch (error) {
    throw error;
  }
};
