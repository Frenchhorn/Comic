import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { Storage } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { initConfig } from './functions/config';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: '漫画',
      url: '/comic',
      icon: 'book'
    },
    {
      title: '图源',
      url: '/list',
      icon: 'apps'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private file: File
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.file.readAsText(this.file.dataDirectory, 'setting.json')
      .then(config => {
        console.log('[setting.json]', config);
        initConfig(this.storage, config);
      })
      .catch(err => {
        console.log(err);
        initConfig(this.storage);
      });
    });
  }
}
