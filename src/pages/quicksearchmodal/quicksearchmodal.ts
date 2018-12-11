import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import{ bigdata}from'../../app/model'
import { InvitesPage } from '../invites/invites'; 
import { BecomeproviderPage } from '../becomeprovider/becomeprovider';  

/**
 * Generated class for the QuicksearchmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quicksearchmodal',
  templateUrl: 'quicksearchmodal.html',
})
export class QuicksearchmodalPage {
  index
  image
  profession
  email
  phone
  UserName 
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,public bdata:bigdata) {
    this.image=this.navParams.get("image");
    this.UserName=this.navParams.get("UserName");
    this.profession=this.navParams.get("profession");
    this.email=this.navParams.get("email");
    this.phone=this.navParams.get("phone");  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuicksearchmodalPage');
  }

  ionViewWillEnter(){
    setTimeout(() => { this.viewCtrl.dismiss(); }, 10000);
  }

  PublishBtn()  {
  this.navCtrl.push(InvitesPage,{invitepublish:"publish"});
  }

  ProviderBtn(){ 
    this.navCtrl.push(InvitesPage,{invitepublish:"invite",InviteProviderUser:"provider"});
  }


}
