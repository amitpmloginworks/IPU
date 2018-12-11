import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgentfiltersPage } from './agentfilters';

@NgModule({
  declarations: [
    AgentfiltersPage,
  ],
  imports: [
    IonicPageModule.forChild(AgentfiltersPage),
  ],
})
export class AgentfiltersPageModule {}
