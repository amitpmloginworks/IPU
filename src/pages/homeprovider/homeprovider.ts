import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController,PopoverController } from 'ionic-angular';
import { InvitesPage } from '../invites/invites'; 
import { Http, Headers, RequestOptions } from '@angular/http';
import { SocialSharing } from '@ionic-native/social-sharing';

import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx'
import{ bigdata}from'../../app/model'

import { NotificationPage } from '../notification/notification';

import { DashboardPage } from '../dashboard/dashboard';  
import { ReviewsPage } from '../reviews/reviews'; 
import { MyconnectionpayPage } from '../myconnectionpay/myconnectionpay';   


/**
 * Generated class for the HomeproviderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({  
  selector: 'page-homeprovider',
  templateUrl: 'homeprovider.html',
})
export class HomeproviderPage { 

  RegReferral:number=0
  Balance:number=0
  CloseDeal:number=0;  
  recentfbArr=[]; 
  ImageUrl 
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl:ToastController,public loadingCtrl: LoadingController,public http:Http,public security:SecurityProvider,public bdata:bigdata,public popoverCtrl: PopoverController, public socialSharing:SocialSharing) {

    let imgpath="file:///storage/emulated/0/Android/data/io.ipu.app/cache/1540187540877.jpg"
    var imgpathl = imgpath.split('/').pop();      
    console.log("imgpathl==",imgpathl);     
    if(this.bdata.UserData.earnings.length != 0) {  this.Balance=this.bdata.UserData.balance; }  
    if(this.bdata.UserData.earnings.length == 0) {  this.Balance=0; } 
    
    console.log(localStorage['token'])
    console.log(localStorage['username'])

    this.security.GetDashboard().subscribe(result => { 
      if (result === false) {   } else {     
        this.RegReferral=result.referrals;
        this.CloseDeal= result.deals
            this.bdata.ChartArr=result.chart  
         }
    }, err => {
      console.log("err", err);
      this.toastCtrl.create({ message: `Please login with valid credentials!`, duration: 4000, position: 'top' }).present(); return;
    });

    // check provider login api called ...
    this.security.provider_login().subscribe(result => { 
      if (result === false) { } else { }
    }, err => {   });


  
    this.security.UserViews().subscribe(result => { 
      if (result === false) {   } else {     
        this.bdata.UserData=result;
        this.bdata.UserDataPublish=result.publish_clicks; 
        this.recentfbArr=result.pay_received
         }
    }, err => {
      console.log("err", err);
      this.toastCtrl.create({ message: `Please login with valid credentials!`, duration: 4000, position: 'top' }).present(); return;
    });

    
    var myString = 'Hi :) my : name is :) demo';
    var myCharacter = this.escapeSpecialChars(':)');
    var characterCount = 0;
    characterCount = (myString.match(new RegExp(myCharacter, 'g')) || []).length;
    console.log(myString.match(new RegExp(myCharacter, 'g')));
    console.log(characterCount);

  }
  
  RecentFBBtn(){
    this.navCtrl.push(ReviewsPage);
  }

  FBBtnAgent(AgentId){  
    this.navCtrl.push(ReviewsPage,{SrcBy:"agent",SrcProviderId:AgentId});
  }

  SeeDetailBtn(){
    this.navCtrl.push(DashboardPage);
  }

  PromoteYourself(){
    let linkc="http://www.ipublishu.com/signup?action=pay_request&referral="+this.bdata.UserData._id+"&type=Provider"; 
    let InvitesTxt= this.bdata.UserData.messages.invite_provider.replace("[link]",linkc);
   
    this.security.inviteUserView(localStorage['username']).subscribe(result => {
      if(result !=false){
        this.socialSharing.share(InvitesTxt)
        .then(() => {    }).catch(() => {  
          this.toastCtrl.create({ message: `Please try again.`, duration: 6000, position: 'top' }).present(); return;  
         });
         }
    }, err => { 
      this.toastCtrl.create({ message: `No internet connection,Please try again.`, duration: 6000, position: 'top' }).present(); return;  
      });

    console.log(InvitesTxt); 
  }

  InviteUser(){
  let linkc="http://www.ipublishu.com/signup?action=pay_request&referral="+this.bdata.UserData._id+"&type=Provider"; 
    let InvitesTxt= this.bdata.UserData.messages.ask_referral.replace("[link]",linkc);
  
    this.security.inviteUserView(localStorage['username']).subscribe(result => {
      if(result !=false){
        this.socialSharing.share(InvitesTxt)
        .then(() => {    }).catch(() => {  
          this.toastCtrl.create({ message: `Please try again.`, duration: 6000, position: 'top' }).present(); return;  
         });
         }
    }, err => { 
      this.toastCtrl.create({ message: `No internet connection,Please try again.`, duration: 6000, position: 'top' }).present(); return;  
      });

   // this.navCtrl.push(InvitesPage,{invitepublish:"invite",InviteProviderUser:"user"});
  }

  escapeSpecialChars(string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); 
  };  

  ionViewWillEnter(){    this.ImageUrlLink();   }   

  ImageUrlLink(){    this.ImageUrl=this.security.ImageUrlLink();   }

  fbRateUser(ProviderID){
   console.log(ProviderID); 
   this.navCtrl.push(MyconnectionpayPage,{provider:ProviderID,RateReviewType:"rate"}) 
  }

  presentPopover() {     
    this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Home" },{cssClass: 'custom-popover'}).present();
   }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeproviderPage');
  }

}
