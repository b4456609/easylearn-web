import {
  NEW_PACK,
  REMOVE_PACK,
  NEW_VERSION,
  SUCCESS_LOAD_PACK,
} from '../actions';

let initState = [
  {
    'id': 'pack1474100598141',
    'createTime': 1474100598144,
    'name': 'a',
    'description': 'a',
    'isPublic': true,
    'coverFilename': '',
    'creatorUserId': null,
    'creatorUserName': '遊客',
    'viewCount': 0,
    'version': [
      {
        'id': 'version1474100598144',
        'content': '<p>Hello, World!</p>',
        'createTime': 1474100598144,
        'isPublic': true,
        'creatorUserId': null,
        'creatorUserName': '遊客',
        'note': [],
        'view_count': 0,
        'user_view_count': 0
      },
    ]
  }
];

if (process.env.NODE_ENV === 'production') {
  initState = [];
}

const pack = (state = initState, action) => {
  switch (action.type) {
    case SUCCESS_LOAD_PACK:
      return action.data;
    case NEW_PACK:
      return [
        ...state,
        action.pack,
      ];
    case REMOVE_PACK:
      const index = state.findIndex(ele => ele.id === action.packId);
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1),
      ];
    case NEW_VERSION:
      return state.map((i) => {
        if (i.id === action.packId) {
          return Object.assign({}, i, {
            version: [
              ...i.version, action.version
            ]
          });
        }
        return i;
      });
    default:
      return state;
  }
};

export default pack;
