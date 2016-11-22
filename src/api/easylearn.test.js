import { setAppToken, getAppToken } from './easylearn.js';
describe('my beverage', () => {
  it('should handle actions', () => {
    setAppToken('aasdfasdf');
    const token = getAppToken();
    expect(token).toEqual('aasdfasdf');
  });
});
