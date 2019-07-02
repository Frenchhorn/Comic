import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, PopoverController, ToastController } from '@ionic/angular';
import { Sources } from '../../sources/sources';
import { Comic } from '../../interface/comic';
import { getComicDetail } from '../../functions/cache';
import { Source } from '../../constants/source';

@Component({
  selector: 'app-popover-more',
  template: `
    <ion-list>
      <ion-item button lines="none" (click)="search(title)">搜索标题</ion-item>
      <ion-item button lines="none" (click)="search(author)">搜索作者</ion-item>
    </ion-list>
  `
})
export class PopoverMorePage implements OnInit {
  @Input() title: string;
  @Input() author: string;

  constructor(
    public popoverController: PopoverController,
    public router: Router
  ) {}

  ngOnInit() {
    console.log('[PopoverMorePage]', this.title, this.author);
  }

  search(keyword: string) {
    this.popoverController.dismiss();
    this.router.navigate(['/comic'], {
      queryParams: {
        tab: 'search',
        keyword
      }
    });

  }

}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  source: Source;
  cid: string;
  comic: Comic = {
    author: '鸟山明/尾田荣一郎',
    cid: '3187',
    cover: 'https://images.dmzj.com/webpic/18/bluebook.jpg',
    description: '《七龙珠》作者鸟山明和他的弟子尾田荣一郎《海贼王》合作的超短篇。里面龙珠和海贼王的主要人物均会出场。不容错过。cross epoch是WT与鸟山明的短篇合作漫画的名字吧，应该没什么意思的，就是原来英文的意思吧，就是“穿越新世纪”，可以理解成这次的漫画合作是一部跨世纪的作品吧，毕竟是龙珠+OP，怎一个强字了得',
    source: Source.DMZJ,
    title: '海贼王X七龙珠',
    finish: true,
    update: '2019-01-01',
    chapter: '第1话',
    favorite: true,
    chapters: [
      {name: '第1话'},
      {name: '第2话'},
      {name: '第3话'},
      {name: '第4话'},
      {name: '第5话'},
      {name: '第6话'}
    ]
  };

  constructor(
    private route: ActivatedRoute,
    public loadingController: LoadingController,
    public sources: Sources,
    public popoverController: PopoverController,
    public toastController: ToastController
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
        // this.sources.getComic(this.source, this.cid).subscribe(json => {
          elm.dismiss();
          // this.comic = getComicDetail(this.source, this.cid);
      // })
      });
    });
  }

  async showMore(event) {
    const popover = await this.popoverController.create({
      component: PopoverMorePage,
      componentProps: {
        title: this.comic.title,
        author: this.comic.author
      },
      event,
      translucent: true,
    });
    return await popover.present();
  }

  async toggleFavorite() {
    this.comic.favorite = !this.comic.favorite;
    const toast = await this.toastController.create({
      message: this.comic.favorite ? '已收藏' : '取消收藏',
      duration: 1000,
      translucent: true
    });
    toast.present();
  }
}
