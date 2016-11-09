import {
  ADD_FOLDER,
  NEW_PACK,
  MOVE_PACK_TO_FOLDER,
  REMOVE_PACK,
  MOVE_PACK_OUT,
  REMOVE_FOLDER,
  SUCCESS_LOAD_FOLDER
} from '../actions';

const ALL_FOLDER = 'all';

let initState = [
  {
    name: '全部懶人包',
    id: ALL_FOLDER,
    pack: ['pack1474100598141', 'pack1478670701680'],
  }, {
    name: 'a',
    id: 'folder1476756912004',
    pack: ['pack1478670701680']
  },
];

if (process.env.NODE_ENV === 'production') {
  initState = [
    {
      name: '全部懶人包',
      id: ALL_FOLDER,
      pack: [],
    }
  ];
}

const folder = (state = initState, action) => {
  switch (action.type) {
    case SUCCESS_LOAD_FOLDER:
      return action.data;
    case ADD_FOLDER:
      return [
        ...state, {
          name: action.name,
          id: action.id,
          pack: []
        },
      ];
    case NEW_PACK:
      return state.map((i) => {
        if (i.id !== ALL_FOLDER)
          { return i; }
        return Object.assign({}, i, {
          pack: [
            ...i.pack,
            action.pack.id,
          ]
        });
      });
    case MOVE_PACK_TO_FOLDER:
      return state.map((i) => {
        if (i.id === action.folderId && i.pack.indexOf(action.packId) === -1) {
          return Object.assign({}, i, {
            pack: [
              ...i.pack,
              action.packId,
            ]
          });
        }
        return i;
      });
    case REMOVE_PACK:
      return state.map((i) => {
        const index = i.pack.indexOf(action.packId);
        if (index !== -1) {
          return Object.assign({}, i, {
            pack: [
              ...i.pack.slice(0, index),
              ...i.pack.slice(index + 1),
            ]
          });
        }
        return i;
      });
    case MOVE_PACK_OUT:
      return state.map((i) => {
        if (action.folderId === i.id) {
          const index = i.pack.indexOf(action.packId);
          return Object.assign({}, i, {
            pack: [
              ...i.pack.slice(0, index),
              ...i.pack.slice(index + 1),
            ]
          });
        }
        return i;
      });
    case REMOVE_FOLDER:
      const index = state.findIndex(ele => (ele.id === action.folderId));
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1),
      ];
    default:
      return state;
  }
};

export default folder;
