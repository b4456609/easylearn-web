import {
    USER_NOT_LOGIN,
    USER_FB_LOGIN_SUCCESS,
    APP_LOGIN_SUCCESS,
} from '../actions';

const initState = {
  initState: 'init',
};

const app = (state = initState, action) => {
  switch (action.type) {
    case USER_NOT_LOGIN:
      return Object.assign({}, state, { initState: USER_NOT_LOGIN });
    case USER_FB_LOGIN_SUCCESS:
      return Object.assign({}, state, { initState: USER_FB_LOGIN_SUCCESS });
    case APP_LOGIN_SUCCESS:
      return Object.assign({}, state, { initState: APP_LOGIN_SUCCESS });
    default:
      return state;
  }
};

export default app;
