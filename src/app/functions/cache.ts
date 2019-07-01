import { Source } from '../constants/source';
import { Comic } from '../interface/comic';

const CACHE = {};

Object.keys(Source).forEach((key) => {
  CACHE[Source[key]] = {
    search: {},
    item: {}
  };
});

export function setSearchResults(source: Source, keyword: string, results: Comic[]) {
  CACHE[source].search[keyword] = results;
}

export function getSearchResult(keyword: string): Comic[] {
  console.log(CACHE);
  const tmpList = [];
  let maxLength = 0;
  Object.keys(Source).forEach((key) => {
    const tmp = CACHE[Source[key]].search[keyword];
    if (!tmp) {
      return;
    }
    if (tmp.length > maxLength) {
      maxLength = tmp.length;
    }
    tmpList.push(tmp);
  });

  const comicList = [];
  for (let idx = 0; idx < maxLength; idx++) {
    tmpList.forEach((tmp) => {
      if (tmp[idx]) {
        comicList.push(tmp[idx]);
      }
    });
  }
  return comicList;
}

export function setComicDetail(source: Source, item: Comic) {
  CACHE[source].item[item.cid] = item;
}

export function getComicDetail(source: Source, cid: string): Comic {
  return CACHE[source].item[cid] || null;
}
