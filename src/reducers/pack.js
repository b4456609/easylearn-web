import { NEW_PACK, REMOVE_PACK } from '../actions';

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

const fake = {
      "id": "pack1474100598141",
      "createTime": 1474100598144,
      "name": "a",
      "description": "a",
      "isPublic": true,
      "coverFilename": "",
      "creatorUserId": null,
      "creatorUserName": "遊客",
      "viewCount": 0,
      "version": [
        {
          "id": "version1474100598144",
          "content": "<p>Hello, World!</p>",
          "createTime": 1474100598144,
          "isPublic": true,
          "creatorUserId": null,
          "creatorUserName": "遊客",
          "note": [],
          "version": 0,
          "view_count": 0,
          "user_view_count": 0
        }
      ]
    };

const pack = (state = [fake], action) => {
  switch (action.type) {
    case NEW_PACK:
      return [
        ...state,
        newPack(action.id, action.title, action.description, action.isPublic,
           action.content, action.userId, action.userName),
      ];
    case REMOVE_PACK:
      const index = state.findIndex(ele => ele.id === action.packId);
      return [
            ...state.slice(0, index),
            ...state.slice(index + 1),
          ];
    default:
      return state;
  }
};

export default pack;
