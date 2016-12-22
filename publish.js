const pact = require('@pact-foundation/pact-node');
const opts = {
  pactUrls: ['./pacts'], // Array of local Pact files or directories containing them. Required.
  pactBroker: 'http://140.121.102.161:8880',
  consumerVersion: '0.8.0'
}; // URL to fetch the provider states for the given provider API. Optional.

pact.publishPacts(opts).then(() => {
  // do something
});
