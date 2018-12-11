import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SocialfeedPage } from './socialfeed';

@NgModule({
  declarations: [
    SocialfeedPage,
  ],
  imports: [
    IonicPageModule.forChild(SocialfeedPage),
  ],
})
export class SocialfeedPageModule {}
