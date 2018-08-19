import { expect, tap } from '@pushrocks/tapbundle';
import * as smartfuzzy from '../ts/index';

let testSmartfuzzy: smartfuzzy.Smartfuzzy;

tap.test('should create an instance of Smartfuzzy', async () => {
  testSmartfuzzy = new smartfuzzy.Smartfuzzy([
    'Sony',
    'Deutsche Bahn',
    'Apple Inc.',
    "Trader Joe's"
  ]);
  expect(testSmartfuzzy).to.be.instanceof(smartfuzzy.Smartfuzzy);
});

tap.test('should compute a score', async () => {
  testSmartfuzzy.getChangeScoreForString('Apple');
});

tap.test('should get closest match', async () => {
  testSmartfuzzy.getClosestMatchForString('Apple');
});

tap.start();
