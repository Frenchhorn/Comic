import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Sources } from '../../sources/sources';
import { Comic } from '../../interface/comic';
import { getComicDetail } from '../../functions/cache';
import { Source } from '../../constants/source';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  source: Source;
  cid: string;
  comic: Comic;

  constructor(
    private route: ActivatedRoute,
    public loadingController: LoadingController,
    public sources: Sources
  ) {
    this.source = this.route.snapshot.paramMap.get('source') as Source;
    this.cid = this.route.snapshot.paramMap.get('cid');
  }

  ngOnInit() {
    this.loadingController.create({
      backdropDismiss: true,
      showBackdrop: false,
      spinner: 'circles',
      translucent: true
    }).then(elm => {
      elm.present().then(() => {
        this.sources.getComic(this.source, this.cid).subscribe(json => {
          elm.dismiss();
          this.comic = getComicDetail(this.source, this.cid);
        });
      });
    });
  }

}
