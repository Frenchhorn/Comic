import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, timeout } from 'rxjs/operators';
import { Source } from '../constants/source';
import { DMZJ2 } from '../constants/api';
import { Comic } from '../interface/comic';
import { setSearchResults } from '../functions/cache';

@Injectable({
  providedIn: 'root'
})
export class Dmzj2 {
  private source = Source.DMZJ2;

  constructor(private http: HttpClient) {
  }

  search(keyword: string, page: string = '0'): Observable<any> {
    const url = DMZJ2.SEARCH_URL.replace('{{keyword}}', keyword).replace('{{page}}', page);
    return this.http.get(url).pipe(
      timeout(10000),
      map((item) => {
        return this.saveSearchResult(keyword, item);
      }),
      catchError(err => {
        console.log('[err]', err);
        return of(null);
      })
    );
  }

  saveSearchResult(keyword, results) {
    const resultList: Comic[] = [];
    results.forEach(item => {
      resultList.push({
        source: this.source,
        cid: String(item.id),
        title: item.title,
        cover: item.cover,
        author: item.authors
      });
    });
    setSearchResults(this.source, keyword, resultList);
    return resultList;
  }

  getComic(cid: string): Observable<any> {
    return of(null);
  }
}
