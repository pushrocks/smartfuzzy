import * as plugins from './smartfuzzy.plugins';

export let standardExport = 'Hi there! :) This is an exported string';

export type TDictionaryMap = { [key: string]: number };

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
  getChangeScoreForString(stringArg): TDictionaryMap {
    const dictionaryMap: TDictionaryMap = {};
    for (const wordArg of this.dictionary) {
      dictionaryMap[wordArg] = plugins.leven(stringArg, wordArg);
    }
    return dictionaryMap;
  }

  getClosestMatchForString(stringArg: string): string {
    const fuseDictionary: { name: string }[] = [];
    for (const wordArg of this.dictionary) {
      fuseDictionary.push({
        name: wordArg
      });
    }
    const fuseOptions = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['name']
    };
    const fuse = new plugins.fuseJs(fuseDictionary, fuseOptions);
    const fuzzyResult = fuse.search(stringArg);
    let closestMatch: string = null;
    if(fuzzyResult.length > 0) {
      closestMatch = fuzzyResult[0].name;
    }
    return closestMatch;
  }
}
