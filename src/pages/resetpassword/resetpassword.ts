import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx'

/**
 * Generated class for the ResetpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html',
})
export class ResetpasswordPage {
  username
  OnlyCode
  MobileNoWithoutCode
  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController, public toastCtrl:ToastController,public http:Http,public security:SecurityProvider,public loadingCtrl: LoadingController) {
    this.username=this.navParams.get("username"); 

    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present(); 
    this.security.GetConnections(this.username,localStorage['token']).subscribe(result1 => {
      loading.dismiss()    
      if(result1==true){
        this.OnlyCode = result1.phone.substring(0,2);     
        this.MobileNoWithoutCode = result1.phone.replace(this.OnlyCode.trim()," "); 
      }
      if(result1==false){
        this.OnlyCode = "40"; 
        this.MobileNoWithoutCode = "0123 2487 543";
        this.toastCtrl.create({ message: `Internal server error, please try again.`, duration: 4000, position: 'top' }).present(); return;
      }
  }, err => {
    this.OnlyCode = "40"; 
    this.MobileNoWithoutCode = "0123 2487 543";
    loading.dismiss()
    this.toastCtrl.create({ message: `No internet connection, please try again.`, duration: 4000, position: 'top' }).present(); return;
  });




  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewWillLeave() {
    this.menu.swipeEnable(true);
   }

   MobCheck(vale)  { 
    if(vale.length==6) 
    {
      return false;
    }
  }

   GotoNext(codeotp,password) 
   {
     if(codeotp=="" || codeotp==undefined) 
     {
      this.toastCtrl.create({ message: `Please enter OTP send on your registered mobile number.`, duration: 4000, position: 'top' }).present(); return;
     }
     if(codeotp.length < 6 ) {
      this.toastCtrl.create({ message: `Please enter OTP send on your registered mobile number.`, duration: 6000, position: 'top' }).present(); return;
    } 
     if(password=="" || password==undefined)
     {
      this.toastCtrl.create({ message: `Please Enter password!`, duration: 4000, position: 'top' }).present(); return;
     }

     if(password.length<6){
      this.toastCtrl.create({ message: `Password must be atleast 6 characters longer. It must contain at least 1 lowercase alphabet, 1 uppercase alphabet, 1 number and 1 special character.`, duration: 6000, position: 'top' }).present();
       return;
    }

    if(!this.validateForm(password)){
      this.toastCtrl.create({ message: `Password must be atleast 6 characters longer. It must contain at least 1 lowercase alphabet, 1 uppercase alphabet, 1 number and 1 special character.`, duration: 6000, position: 'top' }).present();
       return;
    }

     let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
     loading.present();    
        this.security.verifyOtp('password', codeotp, this.username).subscribe(result => {
          if (result === true) {
            loading.dismiss();
            let loading1=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
            loading.present();   
               this.security.forgotPassword(this.username,password, codeotp).subscribe(result => {
                 console.log(result);
                 if (result === true) {
                   loading1.dismiss();
                   this.navCtrl.setRoot(LoginPage);
                 } else {
                   loading1.dismiss()
                   this.toastCtrl.create({ message: `Please Enter Valid credentials!`, duration: 4000, position: 'top' }).present(); return;
                 }
               }, err => {
                 console.log("err", err);
                 loading1.dismiss()
                 this.toastCtrl.create({ message: `Please Enter valid credentials!!`, duration: 4000, position: 'top' }).present(); return;
               });
          } else {
            loading.dismiss()
            this.toastCtrl.create({ message: `Please Enter Valid credentials!`, duration: 4000, position: 'top' }).present(); return;
          }
        }, err => {
          console.log("err", err);
          loading.dismiss()
          this.toastCtrl.create({ message: `Please Enter valid credentials!!`, duration: 4000, position: 'top' }).present(); return;
        });
   }

   validateForm(str){
    var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
    return re.test(str);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetpasswordPage');
  }

}
