import {
    USER_LOGIN_SUCCESS,
} from '../actions';

const user = (state = {
  id: null,
  name: '遊客',
}, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        id: action.id,
        name: action.name,
      });
    default:
      return state;
  }
};

export default user;
