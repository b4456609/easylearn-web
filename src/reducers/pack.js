import { NEW_PACK } from '../actions';

function newPack(name, description, isPublic, content, creatorUserId, creatorUserName) {
  const time = new Date().getTime();
  return {
    id: 'pack' + time,
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
        id: 'version' + time,
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

const pack = (state = [], action) => {
  switch (action.type) {
    case NEW_PACK:
      return [
        ...state,
        newPack(action.title, action.description, action.isPublic,
           action.content, action.userId, action.userName),
      ];
    default:
      return state;
  }
};

export default pack;
