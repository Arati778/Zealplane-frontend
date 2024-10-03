import { SET_USER_ID, LOGOUT_USER } from '../actions/userActions';

const initialState = {
  userId: null,
  token: null,  // Add token to the initial state
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_ID:
      return {
        ...state,
        userId: action.payload.userId,  // Access userId from payload
        token: action.payload.token,    // Access token from payload
      };
    case LOGOUT_USER:
      return {
        ...state,
        userId: null,
        token: null, // Clear token on logout
      };
    default:
      return state;
  }
};

export default userReducer;
