import reducers from '.';


test('reducers', () => {

  let state;
  state = reducers({
    user: {
      id: '',
      name: '遊客',
      fbAccessToken: '',
      token: '',
    },
    folder: [
      {
        name: '全部懶人包',
        id: 'all',
        pack: ['pack1474100598141'],
      }, {
        name: 'a',
        id: 'folder1476756912004',
        pack: [],
      },
    ],
    dialog: {
      modalType: 'NOTE_DIALOG',
      modalProps: {
        name: 'World',
        noteId: 'note1476757870489',
      },
    },
    pack: [
      {
        id: 'pack1474100598141',
        createTime: 1474100598144,
        name: 'a',
        description: 'a',
        isPublic: true,
        coverFilename: '',
        creatorUserId: null,
        creatorUserName: '遊客',
        viewCount: 0,
        version: [
          {
            id: 'version1474100598144',
            content: '<p>Hello, <span class="mdl-tooltip mdl-tooltip--large" for="note1476757870489">a</span><span class="note mdl-color--indigo-100" id="note1476757870489">World</span>!</p>',
            createTime: 1474100598144,
            isPublic: true,
            creatorUserId: null,
            creatorUserName: '遊客',
            note: ['note1476757870489'],
            view_count: 0,
            user_view_count: 0,
          }
        ],
      }
    ],
    app: {
      initState: 'APP_LOGIN_SUCCESS'
    },
    note: {
      note1476757870489: {
        id: 'note1476757870489',
        content: 'a',
        createTime: 1476757870490,
        comment: [
          {
            id: 'comment1476757873277',
            createTime: 1476757873277,
            userId: '',
            userName: '遊客',
            content: 'fasdf',
          }, {
            id: 'comment1476757875020',
            createTime: 1476757875020,
            userId: '',
            userName: '遊客',
            content: 'fasdf',
          }, {
            id: 'comment1476757875848',
            createTime: 1476757875848,
            userId: '',
            userName: '遊客',
            content: 'asdf',
          }, {
            id: 'comment1476757876549',
            createTime: 1476757876549,
            userId: '',
            userName: '遊客',
            content: 'adsfa',
          }, {
            id: 'comment1476757878174',
            createTime: 1476757878174,
            userId: '',
            userName: '遊客',
            content: 'asdf',
          }, {
            id: 'comment1476757879241',
            createTime: 1476757879241,
            userId: '',
            userName: '遊客',
            content: 'asdfa',
          },
        ],
        userId: '',
        userName: '遊客',
      }
    },
  }, {
    type: 'NEW_COMMENT',
    id: 'comment1476757879926',
    createTime: 1476757879926,
    userId: '',
    userName: '遊客',
    content: 'adsf',
    noteId: 'note1476757870489',
  });
  expect(state).toEqual({
    user: {
      id: '',
      name: '遊客',
      fbAccessToken: '',
      token: '',
    },
    folder: [
      {
        name: '全部懶人包',
        id: 'all',
        pack: ['pack1474100598141'],
      }, {
        name: 'a',
        id: 'folder1476756912004',
        pack: [],
      },
    ],
    dialog: {
      modalType: 'NOTE_DIALOG',
      modalProps: {
        name: 'World',
        noteId: 'note1476757870489',
      },
    },
    pack: [
      {
        id: 'pack1474100598141',
        createTime: 1474100598144,
        name: 'a',
        description: 'a',
        isPublic: true,
        coverFilename: '',
        creatorUserId: null,
        creatorUserName: '遊客',
        viewCount: 0,
        version: [
          {
            id: 'version1474100598144',
            content: '<p>Hello, <span class="mdl-tooltip mdl-tooltip--large" for="note1476757870489">a</span><span class="note mdl-color--indigo-100" id="note1476757870489">World</span>!</p>',
            createTime: 1474100598144,
            isPublic: true,
            creatorUserId: null,
            creatorUserName: '遊客',
            note: ['note1476757870489'],
            view_count: 0,
            user_view_count: 0,
          }
        ],
      }
    ],
    app: {
      initState: 'APP_LOGIN_SUCCESS'
    },
    note: {
      note1476757870489: {
        id: 'note1476757870489',
        content: 'a',
        createTime: 1476757870490,
        comment: [
          {
            id: 'comment1476757873277',
            createTime: 1476757873277,
            userId: '',
            userName: '遊客',
            content: 'fasdf',
          }, {
            id: 'comment1476757875020',
            createTime: 1476757875020,
            userId: '',
            userName: '遊客',
            content: 'fasdf',
          }, {
            id: 'comment1476757875848',
            createTime: 1476757875848,
            userId: '',
            userName: '遊客',
            content: 'asdf',
          }, {
            id: 'comment1476757876549',
            createTime: 1476757876549,
            userId: '',
            userName: '遊客',
            content: 'adsfa',
          }, {
            id: 'comment1476757878174',
            createTime: 1476757878174,
            userId: '',
            userName: '遊客',
            content: 'asdf',
          }, {
            id: 'comment1476757879241',
            createTime: 1476757879241,
            userId: '',
            userName: '遊客',
            content: 'asdfa',
          }, {
            id: 'comment1476757879926',
            createTime: 1476757879926,
            userId: '',
            userName: '遊客',
            content: 'adsf',
          },
        ],
        userId: '',
        userName: '遊客',
      }
    },
  });
});
