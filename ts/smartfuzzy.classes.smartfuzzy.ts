import * as plugins from './smartfuzzy.plugins';

export let standardExport = 'Hi there! :) This is an exported string';

export class Smartfuzzy {
  dictionary: string[];
  constructor(dictionary: string[]) {
    this.dictionary = dictionary;
  }

  /**
   * adds words to the dictionary
   * @param payloadArg
   */
  addToDictionary(payloadArg: string | string[]) {
    if (Array.isArray(payloadArg)) {
      this.dictionary = this.dictionary.concat(payloadArg);
    } else {
      this.dictionary.push(payloadArg);
    }
  }

  /**
   * returns the closest match for a given string
   * @param stringArg
   */
  getChangeScoreForString(stringArg) {
    const dictionaryMap: { [key: string]: number } = {};
    for (const wordArg of this.dictionary) {
      dictionaryMap[wordArg] = plugins.leven(stringArg, wordArg);
    }
    console.log(dictionaryMap);
  }

  getClosestMatchForString(stringArg: string) {
    const fuseDictionary: { name: string }[] = [];
    for (const wordArg of this.dictionary) {
      fuseDictionary.push({
        name: wordArg
      });
    }
    const options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['name']
    };
    const fuse = new plugins.fuseJs(fuseDictionary, options);
    const result = fuse.search(stringArg);
    console.log(result);
  }
}
