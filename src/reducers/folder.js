import {
    ADD_FOLDER,
    NEW_PACK,
    MOVE_PACK_TO_FOLDER,
    REMOVE_PACK,
    MOVE_PACK_OUT,
} from '../actions';

const ALL_FOLDER = 'all';
// const initState = {
//   name: '全部懶人包',
//   id: ALL_FOLDER,
//   pack: [],
// };

const initState = [{
      "name": "全部懶人包",
      "id": "all",
      "pack": [
        "pack1474100598141"
      ]
    },
    {
      "name": "未命名資料夾",
      "id": "1474109588909",
      "pack": [
        "pack1474100598141"
      ]
    }];

const folder = (state = initState, action) => {
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
    case MOVE_PACK_TO_FOLDER:
      return state.map((i) => {
        if (i.id === action.folderId && i.pack.indexOf(action.packId) === -1) {
          return Object.assign({}, i, { pack: [
            ...i.pack,
            action.packId,
          ] });
        }
        return i;
      });
    case REMOVE_PACK:
      return state.map((i) => {
        const index = i.pack.indexOf(action.packId);
        if (index !== -1) {
          return Object.assign({}, i, { pack: [
            ...i.pack.slice(0, index),
            ...i.pack.slice(index + 1),
          ]});
        }
        return i;
      });
    case MOVE_PACK_OUT:
      return state.map((i) => {
        if (action.folderId === i.id) {
          const index = i.pack.indexOf(action.packId);
          return Object.assign({}, i, { pack: [
            ...i.pack.slice(0, index),
            ...i.pack.slice(index + 1),
          ]});
        }
        return i;
      });
    default:
      return state;
  }
};

export default folder;
