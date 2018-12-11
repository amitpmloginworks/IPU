import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SinglechatPage } from './singlechat';

@NgModule({
  declarations: [
    SinglechatPage,
  ],
  imports: [
    IonicPageModule.forChild(SinglechatPage),
  ],
})
export class SinglechatPageModule {}
