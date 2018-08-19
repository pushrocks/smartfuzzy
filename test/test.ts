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
  const result = testSmartfuzzy.getChangeScoreForString('Apple');
  console.log(result);
});

tap.test('should get closest match', async () => {
  const result = testSmartfuzzy.getClosestMatchForString('Apple');
  console.log(result);
});

tap.test('should sort objects', async () => {
  class Car {
    constructor(public brand: string) {}
  }

  let testObjectSorter: smartfuzzy.ObjectSorter<Car>;

  testObjectSorter = new smartfuzzy.ObjectSorter([
    new Car('BMW'),
    new Car('Mercedes Benz'),
    new Car('Volvo')
  ]);

  const result = testObjectSorter.sort('Volvo', ['brand']);
  console.log(result);
});

tap.start();
