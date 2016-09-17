import {
    ADD_FOLDER,
    NEW_PACK,
} from '../actions';

const ALL_FOLDER = 'all';
const initState = {
  name: '全部懶人包',
  id: ALL_FOLDER,
  pack: [],
};

const folder = (state = [initState], action) => {
  switch (action.type) {
    case ADD_FOLDER:
      return [...state, {
        name: action.name,
        id: `${new Date().getTime()}`,
        pack: [],
      }];
    case NEW_PACK:
      return state.map((i) => {
        if (i.id !== ALL_FOLDER) return i;
        return Object.assign({}, i, { pack: [
          ...i.pack,
          action.id,
        ] });
      });
    default:
      return state;
  }
};

export default folder;
