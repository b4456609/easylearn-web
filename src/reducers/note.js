import { NEW_NOTE } from '../actions';

const pack = (state = {}, action) => {
  switch (action.type) {
    case NEW_NOTE:
      return Object.assign({}, state, {
        [action.noteId]: {
          id: action.noteId,
          content: action.content,
          createTime: new Date().getTime(),
          comment: [],
          userId: action.userId,
          userName: action.userName,
        },
      });
    default:
      return state;
  }
};

export default pack;
