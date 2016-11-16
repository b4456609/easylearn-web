import { auth, setURL } from './easylearn.js';
const path = require('path');
const Pact = require('pact');
const wrapper = require('@pact-foundation/pact-node');

describe("Easylearn's API", () => {
  const url = 'http://localhost';
  let provider;

  const port = 8989;

  setURL(`${url}:${port}`);

  const server = wrapper.createServer({
    port,
    log: path.resolve(process.cwd(), 'logs', 'mockserver-integration.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    spec: 2,
    consumer: 'easylearn-web',
    provider: 'easylearn-user'
  });

  const EXPECTED_BODY = [{ dog: 1 }];

  afterAll(() => {
    wrapper.removeAllServers();
  });

  afterEach((done) => {
    server.delete().then(done);
  });

  beforeEach((done) => {
    server.start().then(() => {
      provider = Pact({ consumer: 'easylearn-web', provider: 'easylearn-user', port });
      done();
    });
  });

  describe('works', () => {
    beforeEach((done) => {
      const interaction = {
        state: 'get fb auth token',
        uponReceiving: 'a request for easylearn token',
        withRequest: {
          method: 'POST',
          path: '/auth',
          headers: { 'Accept': 'application/json, text/plain, */*' }
        },
        willRespondWith: {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
          body: EXPECTED_BODY
        }
      };
      provider.addInteraction(interaction).then(done, done);
    });

    afterEach((done) => {
      return provider.finalize().then(done, done);
    });

    it('successfully verifies', (done) => {
      return auth()
        .then(done, done);
    });
  });
});
