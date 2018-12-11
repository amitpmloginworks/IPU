import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfferSinglePage } from './offer-single';

@NgModule({
  declarations: [
    OfferSinglePage,
  ],
  imports: [
    IonicPageModule.forChild(OfferSinglePage),
  ],
})
export class OfferSinglePageModule {}
