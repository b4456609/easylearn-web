import { auth, setURL, getPackApi, getFolderApi } from './easylearn.js';
const path = require('path');
const Pact = require('pact');
const wrapper = require('@pact-foundation/pact-node');

function testGetPackApi(provider) {
  const interaction = {
    state: 'get fb auth token',
    uponReceiving: 'a request for easylearn token',
    withRequest: {
      method: 'GET',
      path: '/pack',
      headers: { 'Accept': 'application/json, text/plain, */*' }
    },
    willRespondWith: {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: [{ 'id': 'pack1477403034413', 'name': 'test', 'description': 'test', 'createTime': 1477403036635, 'isPublic': true, 'creatorUserId': '1009840175700426', 'creatorUserName': '范振原', 'coverFilename': 'uNS5dGs.png', 'version': [{ 'id': 'version1477894888307', 'content': '<p>test</p><p>自從此次</p>', 'createTime': 1477894888307, 'creatorUserId': '1009840175700426', 'creatorUserName': '范振原', 'viewCount': 0, 'public': false }, { 'id': 'version1477403036635', 'content': '<p>test</p>', 'createTime': 1477403036635, 'creatorUserId': '1009840175700426', 'creatorUserName': '范振原', 'viewCount': 0, 'public': false }], 'viewCount': 0, 'public': true }, { 'id': 'pack1478666090008', 'name': 'private', 'description': 'private', 'createTime': 1478666090008, 'isPublic': false, 'creatorUserId': '1009840175700426', 'creatorUserName': '范振原', 'coverFilename': '', 'version': [{ 'id': 'version1478666090008', 'content': '<p>asdfasdf</p>', 'createTime': 1478666090008, 'creatorUserId': '1009840175700426', 'creatorUserName': '范振原', 'viewCount': 0, 'public': false }, { 'id': 'version1479830920177', 'content': '<p>asdfasdf tttt</p>', 'createTime': 1479830920178, 'creatorUserId': '1009840175700426', 'creatorUserName': '范振原', 'viewCount': 0, 'public': false }], 'viewCount': 0, 'public': false }, { 'id': 'pack1479221373194', 'name': 'SSD', 'description': 'ssd', 'createTime': 1479221373194, 'isPublic': true, 'creatorUserId': '1009840175700426', 'creatorUserName': '范振原', 'coverFilename': '', 'version': [{ 'id': 'version1479221373194', 'content': '<p>asdfasdfasf</p>', 'createTime': 1479221373194, 'creatorUserId': '1009840175700426', 'creatorUserName': '范振原', 'viewCount': 0, 'public': false }], 'viewCount': 0, 'public': true }]
    }
  };
  return provider.addInteraction(interaction)
      .then(() => getPackApi()
          .then(provider.verify));
}


describe("Easylearn's API", () => {
  const url = 'http://localhost';
  let provider;

  const port = 8989;

  setURL(`${url}:${port}`);

  const server = wrapper.createServer({
    port,
    log: path.resolve(process.cwd(), 'logs', 'mockserver-easylearn-pack.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    spec: 2,
    consumer: 'easylearn_web',
    provider: 'easylearn_pack'
  });

  afterAll(() => {
    wrapper.removeAllServers();
  });

  afterEach((done) => {
    server.delete().then(done);
  });

  beforeEach((done) => {
    server.start().then(() => {
      provider = Pact({ consumer: 'easylearn_web', provider: 'easylearn_pack', port });
      done();
    });
  });

  describe('works', () => {
    afterEach(done => provider.finalize().then(done, done));

    it('successfully verifies', (done) => {
      testGetPackApi(provider)
         .then(done, done);
    });
  });
});
