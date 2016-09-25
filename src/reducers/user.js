import {
    USER_FB_LOGIN_SUCCESS,
    APP_LOGIN_SUCCESS,
} from '../actions';

const user = (state = {
  id: '',
  name: '遊客',
  fbAccessToken: '',
  token: '',
}, action) => {
  switch (action.type) {
    case USER_FB_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        id: action.id,
        name: action.name,
        fbAccessToken: action.fbAccessToken,
      });
    case APP_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        token: action.token,
      });
    default:
      return state;
  }
};

export default user;
