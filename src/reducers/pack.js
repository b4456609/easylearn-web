import {
  NEW_PACK,
  REMOVE_PACK,
  NEW_VERSION,
  SUCCESS_LOAD_PACK,
  NEW_NOTE,
} from '../actions';

let initState = [
  // {
  //   'id': 'pack1474100598141',
  //   'createTime': 1474100598144,
  //   'name': 'a',
  //   'description': 'a',
  //   'isPublic': true,
  //   'coverFilename': '',
  //   'creatorUserId': null,
  //   'creatorUserName': '遊客',
  //   'viewCount': 0,
  //   'version': [
  //     {
  //       'id': 'version1478670050337',
  //       'content': '<p>Hello, World!fff</p>',
  //       'createTime': 1478670050337,
  //       'isPublic': false,
  //       'creatorUserId': 'id',
  //       'creatorUserName': 'Bernie',
  //       'view_count': 0,
  //       'user_view_count': 0,
  //     }, {
  //       'id': 'version1474100598144',
  //       'content': '<p>Hello, World!</p>',
  //       'createTime': 1474100598144,
  //       'isPublic': true,
  //       'creatorUserId': null,
  //       'creatorUserName': '遊客',
  //       'note': [],
  //       'viewCount': 0,
  //       'userViewCount': 0,
  //     },
  //   ],
  // }
  // ,
  {
    'id': 'pack1478670701680',
    'createTime': 1478670701680,
    'name': '川普當選機率高 加拿大移民部網站被塞爆',
    'description': '',
    'isPublic': false,
    'coverFilename': '',
    'creatorUserId': 'id',
    'creatorUserName': 'Bernie',
    'viewCount': 0,
    'version': [
      {
        'id': 'version1478670701680',
        'content': '<p class="first">美國總統大選目前開票中，紐約時報預測川普當選率高達95%，而他本人也在YouTube上開直播，還一度定調為「完勝演說」。加拿大移民部網站因此被塞爆，加拿大政府官網連線速度也相當緩慢。</p>\n<p>「Move&nbsp;to&nbsp;Canada」是許多人誓言如果川普當選就要移民去加拿大，以躲避川普統治的美國，當初多被以玩笑看待的這句話，如今越來越有可能成真。<br /><br />目前加拿大移民部網站無法進入，而加拿大政府官網雖可連線但速度緩慢，移民相關資訊也無法讀取。</p>\n<p>在台發展的義大利籍藝人韋佳德也在<a href="https://www.facebook.com/ruike85/photos/a.1482087922036077.1073741827.1482081335370069/1846985895546276/?type=3&amp;theater" target="_blank" data-rapid_p="1">臉書PO</a>出加拿大移民部網站遭塞爆的截圖，並表達「覺得遭透了」的心情。</p>',
        'createTime': 1478670701680,
        'isPublic': false,
        'creatorUserId': 'id',
        'creatorUserName': 'Bernie',
        'version': 0,
        'view_count': 0,
        'user_view_count': 0,
      }
    ],
  },
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
        if (i.id === action.packId
          && i.isPublic === false
          && action.version.isPublic === true) {
          return Object.assign({}, i, {
            isPublic: true,
            version: [
              ...i.version, action.version
            ]
          });
        }
        if (i.id === action.packId) {
          return Object.assign({}, i, {
            version: [
              ...i.version, action.version
            ]
          });
        }
        return i;
      });
    case NEW_NOTE:
      return state.map((i) => {
        if (i.id === action.packId) {
          const newVersion = i.version.map((version) => {
            if (version.id === action.versionId) {
              return Object.assign({}, version, {
                content: action.newContent
              });
            }
            return version;
          });
          return Object.assign({}, i, {
            version: newVersion
          });
        }
        return i;
      });
    default:
      return state;
  }
};

export default pack;
