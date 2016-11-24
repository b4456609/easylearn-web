import {
    USER_NOT_LOGIN,
    USER_FB_LOGIN_SUCCESS,
    APP_LOGIN_SUCCESS,
    PACK_FETCHING,
    PACK_FETCHING_ERROR,
    SUCCESS_LOAD_PACK,
    FOLDER_FETCHING,
    FOLDER_FETCHING_ERROR,
    SUCCESS_LOAD_FOLDER
} from '../actions';

let initState = {
  initState: 'APP_LOGIN_SUCCESS',
  packFetch: false,
  folderFetch: false,
};

if (process.env.NODE_ENV === 'production') {
  initState = {
    initState: 'init',
    packFetch: false,
    folderFetch: false,
  };
}

const app = (state = initState, action) => {
  switch (action.type) {
    case PACK_FETCHING:
      return Object.assign({}, state, { packFetch: true });
    case SUCCESS_LOAD_PACK:
      return Object.assign({}, state, { packFetch: false });
    case PACK_FETCHING_ERROR:
      return Object.assign({}, state, { packFetch: 'error' });
    case FOLDER_FETCHING:
      return Object.assign({}, state, { packFetch: true });
    case SUCCESS_LOAD_FOLDER:
      return Object.assign({}, state, { packFetch: false });
    case FOLDER_FETCHING_ERROR:
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
