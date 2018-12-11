import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register'; 

/**
 * Generated class for the RegistermainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registermain',
  templateUrl: 'registermain.html',
})
export class RegistermainPage { 
  SocialLog
  constructor(public navCtrl: NavController, public navParams: NavParams, public menu:  MenuController) {
    this.SocialLog=this.navParams.get('SocialLog');
  }

  LoginBtn() {  
    this.navCtrl.setRoot(LoginPage); 
  }
  RegisterBtn(TxtType){   
    this.navCtrl.push(RegisterPage,{SocialLog:"0",types:TxtType});   
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistermainPage');
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }


  ionViewWillLeave() {
    this.menu.swipeEnable(true);
   }


}
