import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnregisteredPage } from './unregistered';

@NgModule({
  declarations: [
    UnregisteredPage,
  ],
  imports: [
    IonicPageModule.forChild(UnregisteredPage),
  ],
})
export class UnregisteredPageModule {}
