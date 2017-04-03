let chai = require('chai');
let expect = chai.expect;
let request = require('request-promise-native');
let shop = require('./shop');

describe('shop', () => {
  before((done) => {
    // import the mountebank helper library
    const mb = require('mountebank-helper');

    // create the skeleton for the imposter (does not post to MB)
    const catalogueImposter = new mb.Imposter({ 'imposterPort' : 9081 });

    const catalogueResponse = {
      'uri' : '/products',
      'verb' : 'GET',
      'res' : {
        'statusCode': 200,
        'responseHeaders' : { 'Content-Type' : 'application/json' },
        'responseBody' : JSON.stringify([{ sku: 1 }])
      }
    };

    catalogueImposter.addRoute(catalogueResponse);

    mb.startMbServer(2525)
      .then(function() {
        Promise.all([
          catalogueImposter.postToMountebank(),
        ])
        .then( () => {
          done();
        })
      })
  });

  it('returns products with reviews', () => {
    return shop().then((products) => {
      expect(true).to.equal(false);
    })
  })
});
