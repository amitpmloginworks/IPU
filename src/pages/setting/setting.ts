import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController, MenuController, ViewController, LoadingController, AlertController } from 'ionic-angular';
import{ bigdata}from'../../app/model'
import * as moment from 'moment'; 
import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx' 

import { ProfilePage } from '../profile/profile';  
import { ProfileproviderPage } from '../profileprovider/profileprovider'; 
import { ProfileagentPage } from '../profileagent/profileagent'; 

import { NotificationPage } from '../notification/notification'; 
import { PopoverController } from 'ionic-angular'; 

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  chooseOptions 

  AskReferral
  InviteProviderTxt
  InviteProvider
  InviteUserTxt
  InviteUser
  PayRequest
  PublishProviderTxt
  PublishProvider

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController,public menuCtrl: MenuController,public toastCtrl:ToastController, public loadingCtrl:LoadingController,public http:Http,public security:SecurityProvider,public bdata:bigdata, public alertCtrl:AlertController,public popoverCtrl: PopoverController) {
    this.chooseOptions="Create" 
    this.GetLoadData(); 
  }

  GetLoadData(){  
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present(); 
    this.security.UserViews().subscribe(result => {
        loading.dismiss()
        if(result==false){
          this.toastCtrl.create({ message: `No record found.`, duration: 3000, position: 'top' }).present(); return;
        }
        else{ 
          this.AskReferral=result.messages.ask_referral
          this.InviteProviderTxt= result.messages.invite_provider
          this.InviteProvider= result.messages.invite_provider
          this.InviteUserTxt=result.messages.invite_user
          this.InviteUser=result.messages.invite_user
          this.PayRequest= result.messages.pay_request
          this.PublishProviderTxt=result.messages.publish_provider
          this.PublishProvider=result.messages.publish_provider
        }
    }, err => {
      loading.dismiss()
      this.toastCtrl.create({ message: `Please try again.`, duration: 4000, position: 'top' }).present(); return;
    });
  } 




  InviteUserEdit(){
 this.SendOTP();
  }

  SendOTP(){
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present();    
       this.security.sendOtp("", "update", localStorage["username"]).subscribe(result => {
         if (result === true) {
           loading.dismiss()
          this.SendEnterOTP();
         } else {
           loading.dismiss()
           this.toastCtrl.create({ message: `Sorry unable to send otp request. Please try again.!`, duration: 4000, position: 'top' }).present(); return;  
         }
       }, err => {
         console.log("err", err);
         loading.dismiss()
         this.toastCtrl.create({ message: `Sorry unable to send otp request. Please try again.!`, duration: 4000, position: 'top' }).present(); return;
       });
  }

  SendEnterOTP(){
    let alert = this.alertCtrl.create({
      title: 'You will receive an SMS with a code on your phone number',
      inputs: [{
          name: 'username',
          placeholder: 'Enter OTP'
        }
      ],
      buttons: [ {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {   console.log('Cancel clicked');  }
        },
        {
          text: 'Submit',
          handler: data => {
            console.log(data);
            if(data.username=="") {
              this.toastCtrl.create({ message: `OTP is required.`, duration: 4000, position: 'top' }).present(); return;
            }
            else{  this.VerifyOTP(data.username);   }
          }
        }
      ],
      enableBackdropDismiss: false
    });
    alert.present();
  }

  VerifyOTP(otp){
    
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present();    
       this.security.verifyOtp("update",otp,localStorage["username"]).subscribe(result => {
         if (result === true) {
           loading.dismiss()
          this.SaveSetting();
          this.toastCtrl.create({ message: `OTP verified successfully!`, duration: 4000, position: 'top' }).present(); 
         } else {
           loading.dismiss()
           this.toastCtrl.create({ message: `Sorry unable to send otp request. Please try again.!`, duration: 4000, position: 'top' }).present(); return;  
         }
       }, err => {
         console.log("err", err);
         loading.dismiss()
         this.toastCtrl.create({ message: `Sorry unable to send otp request. Please try again.!`, duration: 4000, position: 'top' }).present(); return;
       });
  }
  
  SaveSetting(){
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present(); 
    this.security.MessageSetting(this.AskReferral,this.InviteUserTxt,this.InviteProvider,this.PublishProvider,this.PayRequest).subscribe(result => {
        loading.dismiss()
        if(result==false){
          this.toastCtrl.create({ message: `Please try again.`, duration: 3000, position: 'top' }).present(); return;
        }
        else{
          this.toastCtrl.create({ message: `Your settings are updated successfully.`, duration: 3000, position: 'top' }).present(); 
          this.GetLoadData(); 
        }
    }, err => {
      loading.dismiss()
      this.toastCtrl.create({ message: `Please try again.`, duration: 4000, position: 'top' }).present(); return;
    }); 
  }

  ProfileBtn(){
    if(localStorage['ProviderUser']=="provider") { 
      // this.navCtrl.push(ProfileproviderPage);
      this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Settings" },{cssClass: 'custom-popover'}).present();   
      }
    if(localStorage['ProviderUser']=="user")     {  
     // this.navCtrl.push(ProfilePage);        
     this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Settings" },{cssClass: 'custom-popover'}).present();  
    }
    if(localStorage['ProviderUser']=="agent")    { 
       //this.navCtrl.push(ProfileagentPage); 
       this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Settings" },{cssClass: 'custom-popover'}).present();   
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

}
