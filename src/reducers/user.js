import {
    USER_FB_LOGIN_SUCCESS,
    APP_LOGIN_SUCCESS,
} from '../actions';

let initState = {
  id: '1009840175700426',
  name: 'Bernie',
  fbAccessToken: '',
  token: '',
};

if (process.env.NODE_ENV === 'production') {
  initState = {
    id: '',
    name: '遊客',
    fbAccessToken: '',
    token: '',
  };
}

const user = (state = initState, action) => {
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
