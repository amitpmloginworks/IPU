import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InvitesPage } from '../invites/invites'; 
import { BecomeproviderPage } from '../becomeprovider/becomeprovider';   
import { BecomeagentPage } from '../becomeagent/becomeagent'; 
import { HomePage } from '../home/home';

import { ProfilePage } from '../profile/profile';  
import { ProfileproviderPage } from '../profileprovider/profileprovider'; 
import { ProfileagentPage } from '../profileagent/profileagent'; 

/**
 * Generated class for the UnregisteredPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({   
  selector: 'page-unregistered',
  templateUrl: 'unregistered.html',
})
export class UnregisteredPage {
  providertap:boolean=true;
  flag:boolean=false; 
  Srcres: boolean=false

  myInput
  fullName 
  UsrName

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.myInput=navParams.get("UsrFullN");
this.fullName=navParams.get("UsrFullN");
this.UsrName=navParams.get("ProviderUsername");
  }

  BackNav(){ 
    this.navCtrl.setRoot(HomePage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UnregisteredPage');
  }

  InviteUserBtn()    {     
    this.navCtrl.push(InvitesPage,{invitepublish:"publish",ButtonTxt:"change"});
}
PublishAgentBtn(){
  this.navCtrl.push(BecomeagentPage);
}
ProviderBtn(){
  this.navCtrl.push(BecomeproviderPage);
}

  getItems(ev)
  {
    if(ev.target.value !="")
    {
      this.flag=true;
      this.Srcres=true;
    }
    if(ev.target.value =="" || ev.target.value ==undefined) {
      this.flag=false; this.Srcres=false;
    }
    //document.getElementsByClassName("searchbar-search-icon").style.display="none";
  }

  ProfileBtn(){
    if(localStorage['ProviderUser']=="provider") {  this.navCtrl.push(ProfileproviderPage);  }
    if(localStorage['ProviderUser']=="user")     {  this.navCtrl.push(ProfilePage);          }
    if(localStorage['ProviderUser']=="agent")    {  this.navCtrl.push(ProfileagentPage);     }
  }

}
