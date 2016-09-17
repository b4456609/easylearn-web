import expect from 'expect';
import reducers from '../../reducers';

describe('reducers', () => {
  it('should handle actions', () => {
    let state;
    state = reducers({
      user: {
        id: null,
        name: '遊客',
      },
      folder: [
        {
          name: '全部懶人包',
          id: 'all',
          pack: ['pack1474100598141'],
        }, {
          name: '未命名資料夾',
          id: '1474104664368',
          pack: [],
        },
      ],
      dialog: {
        modalType: 'MOVE_PACK',
        modalProps: {
          id: 'pack1474100598141',
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
              content: '<p>Hello, World!</p>',
              createTime: 1474100598144,
              isPublic: true,
              creatorUserId: null,
              creatorUserName: '遊客',
              note: [],
              version: 0,
              view_count: 0,
              user_view_count: 0,
            },
          ],
        },
      ],
    }, {
      type: 'MOVE_PACK_TO_FOLDER',
      packId: 'pack1474100598141',
      folderId: '1474104664368',
    });
    expect(state.folder[1].pack.length).toEqual(1);
    expect(state.folder[1].pack[0]).toEqual('pack1474100598141');
  });
});
