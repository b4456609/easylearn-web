import {NEW_PACK, REMOVE_PACK, NEW_VERSION, NEW_NOTE,} from '../actions';

function newPack(id, name, description, isPublic, content, creatorUserId, creatorUserName) {
  const time = new Date().getTime();
  return {
    id,
    createTime: time,
    name,
    description,
    isPublic,
    coverFilename: '',
    creatorUserId,
    creatorUserName,
    viewCount: 0,
    version: [
      {
        id: `version${time}`,
        content,
        createTime: time,
        isPublic,
        creatorUserId,
        creatorUserName,
        note: [],
        version: 0,
        view_count: 0,
        user_view_count: 0,
      },
    ],
  };
}

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
        'user_view_count': 0,
      },
    ],
  }
];

if (process.env.NODE_ENV === 'production') {
  initState = [];
}

const pack = (state = initState, action) => {
  switch (action.type) {
    case NEW_PACK:
      return [
        ...state,
        newPack(action.id, action.title, action.description, action.isPublic, action.content, action.userId, action.userName),
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
              ...i.version, {
                'id': action.versionId,
                'content': action.content,
                'createTime': new Date().getTime(),
                'isPublic': true,
                'creatorUserId': action.userId,
                'creatorUserName': action.userName,
                'note': [],
                'view_count': 0,
                'user_view_count': 0,
              },
            ]
          });
        }
        return i;
      });
    case NEW_NOTE:
      return state.map((pack) => {
        if (pack.id === action.packId) {
          return Object.assign({}, pack, {
            version: pack.version.map((version) => {
              if (version.id === action.versionId) {
                return Object.assign({}, version, {
                  content: action.newContent,
                  note: [
                    ...version.note,
                    action.noteId,
                  ],
                });
              }
              return version;
            })
          });
        }
        return pack;
      });
    default:
      return state;
  }
};

export default pack;
