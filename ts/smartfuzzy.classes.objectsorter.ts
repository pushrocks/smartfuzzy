import * as plugins from './smartfuzzy.plugins';

export class ObjectSorter<T> {
  public objectDictionary: T[];


  constructor(objectDictionaryArg: T[] = []) {
    this.objectDictionary = objectDictionaryArg;
  }

  sort(stringArg: string, objectKeysArg: string[]): T[] {
    const fuseOptions = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: objectKeysArg
    };
    const fuse = new plugins.fuseJs(this.objectDictionary, fuseOptions);
    const result = fuse.search(stringArg);
    return result;
  }

}