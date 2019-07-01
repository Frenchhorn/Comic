import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
import { DMZJ } from '../constants/api';
import { Comic } from '../interface/comic';
import { Source } from '../constants/source';
import { setSearchResults, setComicDetail } from '../functions/cache';

@Injectable({
  providedIn: 'root'
})
export class Dmzj {
  private source = Source.DMZJ;

  constructor(private http: HttpClient) {
  }

  search(keyword: string): Observable<any> {
    const url = DMZJ.SEARCH_URL.replace('{{keyword}}', keyword);
    return this.http.get(url, {
      responseType: 'text'
    }).pipe(
      timeout(10000),
      map((html: string) => {
        return this.saveSearchResult(keyword, html);
      }),
      catchError(err => {
        console.log('[err]', err);
        return of(null);
      })
    );
  }

  saveSearchResult(keyword: string, html: string) {
    const jsonStr = html.slice(20, html.length - 1);
    const results = JSON.parse(jsonStr);
    const resultList: Comic[] = [];
    results.forEach(item => {
      resultList.push({
        source: this.source,
        cid: item.id,
        title: item.name,
        cover: item.cover,
        author: item.authors
      });
    });
    setSearchResults(this.source, keyword, resultList);
    return resultList;
  }

  getComic(cid: string): Observable<any> {
    const url = DMZJ.ITEM_URL.replace('{{cid}}', cid);
    console.log('[dmzj]getComic', url);
    return this.http.get(url).pipe(
      timeout(10000),
      map((item) => {
        console.log(item);
        return this.saveComicItem(cid, item);
      }),
      catchError(err => {
        console.log('[err]', err);
        return of(null);
      })
    );
  }

  saveComicItem(cid, item) {
    const comic: Comic = {
      source: this.source,
      cid: String(item.id),
      title: item.title,
      cover: item.cover,
      author: item.authors.map(author => author.tag_name).join('/')
    };
    setComicDetail(this.source, comic);
    return comic;
  }
}
