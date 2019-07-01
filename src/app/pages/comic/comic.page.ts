import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar, LoadingController } from '@ionic/angular';
import { getSearchResult } from '../../functions/cache';
import { Source, SourceName } from '../../constants/source';
import { Comic } from '../../interface/comic';
import { Sources } from '../../sources/sources';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.page.html',
  styleUrls: ['./comic.page.scss'],
})
export class ComicPage implements OnInit {

  @ViewChild('searchBar') searchBar: IonSearchbar;
  segment = 'favorites';
  favorites: Comic[] = [
    {
      author: '鸟山明/尾田荣一郎',
      cid: '3187',
      cover: 'https://images.dmzj.com/webpic/7/01_04d5eab7b766b2f4e32e103496e3368d.jpg',
      title: '海贼王X七龙珠',
      source: Source.DMZJ,
    },
    {
      author: '尾田荣一郎',
      cid: '4',
      cover: 'https://images.dmzj.com/webpic/4/onepiece.jpg',
      title: '海贼王',
      source: Source.DMZJ
    },
    {
      author: '尾田荣一郎',
      cid: '3555',
      cover: 'https://images.dmzj.com/webpic/18/bluebook.jpg',
      title: '海贼王资料设定集',
      source: Source.DMZJ
    },
    {
      author: '尾田荣一郎',
      cid: '10539',
      cover: 'https://images.dmzj.com/webpic/19/haizeiwangxiongmao.jpg',
      title: '海贼王-熊猫人历险记',
      source: Source.DMZJ
    }
  ];
  downloads: Comic[] = [
    {
      title: 'Download',
      cover: '/assets/test/test.png',
      source: Source.DMZJ
    },
    {
      title: 'Download',
      cover: '/assets/test/test.png',
      source: Source.DMZJ
    },
    {
      title: 'Download',
      cover: '/assets/test/test.png',
      source: Source.DMZJ
    },
    {
      title: 'Download',
      cover: '/assets/test/test.png',
      source: Source.DMZJ
    }
  ];
  queryText: string;
  searchResults: Comic[] = [];
  searchResultsTmp: Comic[] = [];
  SourceName = SourceName;

  constructor(
    public loadingController: LoadingController,
    public sources: Sources) { }

  ngOnInit() {
  }

  updateFavorites() {}

  startDownload() {}

  doSearch() {
    if (this.queryText) {
      this.queryText = this.queryText.trim();
    }
    if (!this.queryText) {
      return;
    }
    this.searchResults = [];
    this.searchResultsTmp = [];
    this.searchBar.getInputElement().then(elm => elm.blur());
    this.loadingController.create({
      backdropDismiss: true,
      showBackdrop: false,
      spinner: 'circles',
      translucent: true
    }).then(elm => {
      elm.present().then(() => {
        this.sources.search(this.queryText).subscribe((json) => {
          elm.dismiss();
          const l = getSearchResult(this.queryText);
          this.searchResults = l.slice(0, 12);
          this.searchResultsTmp = l.slice(12);
        });
      });
    });
  }

  loadSearchResults() {
    if (this.segment !== 'search') {
      return;
    }
    if (this.searchResultsTmp.length === 0) {
      return;
    }
    this.searchResults = this.searchResults.concat(this.searchResultsTmp.slice(0, 2));
    this.searchResultsTmp = this.searchResultsTmp.slice(2);
  }
}
