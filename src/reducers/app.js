import {
    USER_NOT_LOGIN,
    USER_FB_LOGIN_SUCCESS,
    APP_LOGIN_SUCCESS,
    FETCHING,
    PACK_FETCHING_ERROR,
    SUCCESS_LOAD_PACK,
} from '../actions';

let initState = {
  initState: 'APP_LOGIN_SUCCESS',
  packFetch: 'false'
};

if (process.env.NODE_ENV === 'production') {
  initState = {
    initState: 'init',
    packFetch: false
  };
}

const app = (state = initState, action) => {
  switch (action.type) {
    case FETCHING:
      return Object.assign({}, state, { packFetch: true });
    case SUCCESS_LOAD_PACK:
      return Object.assign({}, state, { packFetch: false });
    case PACK_FETCHING_ERROR:
      return Object.assign({}, state, { packFetch: 'error' });
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
