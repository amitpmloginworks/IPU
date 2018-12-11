import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchservicePage } from './searchservice';

@NgModule({
  declarations: [
    SearchservicePage,
  ],
  imports: [
    IonicPageModule.forChild(SearchservicePage),
  ],
})
export class SearchservicePageModule {}
