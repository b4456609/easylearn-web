import {
    ADD_FOLDER,
    NEW_PACK,
} from '../actions';

const initState = {
  name: '全部懶人包',
  id: new Date().getTime(),
  pack: [],
};

const folder = (state = [initState], action) => {
  switch (action.type) {
    case ADD_FOLDER:
      return [...state, {
        name: action.name,
        id: new Date().getTime(),
        pack: [],
      }];
    case NEW_PACK:
      const target = state.find(i => i.name === '全部懶人包');
      target.pack = [...target.pack, action.id]
      return state;
    default:
      return state;
  }
};

export default folder;
