import { NEW_NOTE, NEW_COMMENT } from '../actions';

const note = (state = {}, action) => {
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
    case NEW_COMMENT:
      const { id, createTime, userId, userName, content } = action;
      return Object.assign({}, state, {
        [action.noteId]: Object.assign({},
          state[action.noteId],
          { comment: [...state[action.noteId].comment, {
            id, createTime, userId, userName, content,
          }] }),
      });
    default:
      return state;
  }
};

export default note;
