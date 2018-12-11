import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeproviderPage } from './homeprovider';

@NgModule({
  declarations: [
    HomeproviderPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeproviderPage),
  ],
})
export class HomeproviderPageModule {}
