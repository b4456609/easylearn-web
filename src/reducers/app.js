import {
    USER_NOT_LOGIN,
    USER_LOGIN_SUCCESS,
} from '../actions';

const initState = {
  initState: 'init'
};

const app = (state = initState, action) => {
  switch (action.type) {
    case USER_NOT_LOGIN:
      return Object.assign({}, state, {initState: USER_NOT_LOGIN});    
    case USER_LOGIN_SUCCESS:
      return Object.assign({}, state, {initState: USER_LOGIN_SUCCESS});
    default:
      return state;
  }
};

export default app;
