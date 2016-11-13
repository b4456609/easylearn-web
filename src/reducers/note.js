import { NEW_NOTE, NEW_COMMENT } from '../actions';

const note = (state = {}, action) => {
  switch (action.type) {
    case NEW_NOTE:
      return Object.assign({}, state, {
        [action.noteId]: action.note,
      });
    case NEW_COMMENT:
      return Object.assign({}, state, {
        [action.noteId]: Object.assign({},
          state[action.noteId],
          { comment: [...state[action.noteId].comment, action.comment] }),
      });
    default:
      return state;
  }
};

export default note;
