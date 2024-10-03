// userActions.js

export const SET_USER_ID = 'SET_USER_ID';
export const LOGOUT_USER = 'LOGOUT_USER';

export const setUserId = (userId, token) => ({
  type: SET_USER_ID,
  payload: { userId, token },
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});
