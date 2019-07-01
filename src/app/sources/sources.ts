import { Injectable } from '@angular/core';
import { Dmzj } from './dmzj';
import { Dmzj2 } from './dmzj2';
import { forkJoin, of, Observable } from 'rxjs';
import { Source } from '../constants/source';;

@Injectable({
  providedIn: 'root'
})
export class Sources {

  constructor(
    public dmzj: Dmzj,
    public dmzj2: Dmzj2
  ) {
  }

  search(keyword: string): Observable<any> {
    return forkJoin([this.dmzj.search(keyword), this.dmzj2.search(keyword)]);
  }

  getComic(source: Source, cid: string): Observable<any> {
    if (!source || !cid) {
      return of(null);
    }
    return this[source].getComic(cid);
  }
}
