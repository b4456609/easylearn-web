import { setURL, delteFolderApi, getFolderApi } from './easylearn.js';
const path = require('path');
const Pact = require('pact');
const wrapper = require('@pact-foundation/pact-node');

function testDeleteFolderApi(provider) {
  const interaction = {
    state: 'delete folder api',
    uponReceiving: 'a request for easylearn token',
    withRequest: {
      method: 'DELETE',
      path: '/user/folder/test',
      headers: { 'Accept': 'application/json, text/plain, */*' }
    },
    willRespondWith: {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: {}
    }
  };
  return provider.addInteraction(interaction)
      .then(() => delteFolderApi('test')
          .then(provider.verify));
}

function testGetFolderApi(provider) {
  const interaction = {
    state: 'get fb auth tokenf',
    uponReceiving: 'a request for easylearn tokenfad',
    withRequest: {
      method: 'GET',
      path: '/user/folder',
      headers: { 'Accept': 'application/json, text/plain, */*' }
    },
    willRespondWith: {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: [{ 'id': 'folder1478678221265', 'name': 'Hhh', 'pack': ['pack1478666090008'] }, { 'id': 'all', 'name': '全部懶人包', 'pack': ['pack1477403034413', 'pack1478666090008', 'pack1479221373194'] }, { 'id': 'folder1479221358993', 'name': 'SSD', 'pack': ['pack1477403034413'] }, { 'id': 'folder1482372421808', 'name': 'test', 'pack': [] }]
    }
  };
  return provider.addInteraction(interaction)
      .then(() => getFolderApi()
          .then(provider.verify));
}

describe("Easylearn's API", () => {
  const url = 'http://localhost';
  let provider;

  const port = 8989;

  setURL(`${url}:${port}`);

  const server = wrapper.createServer({
    port,
    log: path.resolve(process.cwd(), 'logs', 'mockserver-easylearn-user.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    spec: 2,
    consumer: 'easylearn_web',
    provider: 'easylearn_user'
  });

  afterAll(() => {
    wrapper.removeAllServers();
  });

  afterEach((done) => {
    server.delete().then(done);
  });

  beforeEach((done) => {
    server.start().then(() => {
      provider = Pact({ consumer: 'easylearn_web', provider: 'easylearn_user', port });
      done();
    });
  });

  describe('works', () => {
    afterEach(done => provider.finalize().then(done, done));

    it('successfully verifies', (done) => {
      testGetFolderApi(provider)
      .then(() => testDeleteFolderApi(provider))
         .then(done, done);
    });
  });
});
