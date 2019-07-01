import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComicPage } from './comic.page';
import { SourceNamePipe } from '../../pipes/source-name.pipe';

const routes: Routes = [
  {
    path: '',
    component: ComicPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ComicPage, SourceNamePipe]
})
export class ComicPageModule {}
