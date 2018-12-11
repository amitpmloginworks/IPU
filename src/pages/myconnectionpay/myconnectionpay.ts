import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController , ToastController, LoadingController, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx' 

import { ProfilePage } from '../profile/profile';  
import { ProfileproviderPage } from '../profileprovider/profileprovider'; 
import { ProfileagentPage } from '../profileagent/profileagent';

import { NotificationPage } from '../notification/notification'; 
import { PopoverController } from 'ionic-angular'; 
 

/**
 * Generated class for the MyconnectionpayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myconnectionpay',
  templateUrl: 'myconnectionpay.html',
})
export class MyconnectionpayPage {
  review;
  provider
  payer
  amount:number=0;
  referral
  rate:number=0
  title
  stripe_token:any="";

  images=["assets/imgs/myconnection/star.png",
  "assets/imgs/myconnection/star.png",
  "assets/imgs/myconnection/star.png",
  "assets/imgs/myconnection/star.png",
  "assets/imgs/myconnection/star.png",
]

RateReview

RateStatus:boolean=false;
ReviewStatus:boolean=false;
HeaderTittle
  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController, public toastCtrl:ToastController,public loadingCtrl: LoadingController,public http:Http,public security:SecurityProvider,public alertCtrl:AlertController,public popoverCtrl: PopoverController) {
 
    this.RateReview=this.navParams.get("RateReviewType");

        if(this.RateReview=="rate"){
          this.provider=this.navParams.get("provider");
         this.RateStatus=true;
         this.HeaderTittle="Review & rating"
        }
        if(this.RateReview=="review"){
          this.provider=this.navParams.get("provider");
          this.payer=localStorage["username"];
          this.referral=this.navParams.get("referral");
          this.title=this.navParams.get("title");
          this.ReviewStatus=true;
          this.HeaderTittle="Review & rating"
        }
   
  }


SaveBtn(){
  if(this.review == "" || this.review == undefined) {
    this.toastCtrl.create({ message: `Review is required.`, duration: 6000, position: 'top' }).present(); return;
  }  
  let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
  loading.present();    
     this.security.PayToPayer(this.payer,this.provider,this.referral,this.amount,this.rate,this.title,this.review,this.stripe_token).subscribe(result => {
       if (result === false) {
         loading.dismiss();
         this.toastCtrl.create({ message: `Please try again!`, duration: 4000, position: 'top' }).present(); return;
       } else {
         loading.dismiss()
         this.toastCtrl.create({ message: `Review added successfully.`, duration: 4000, position: 'top' }).present();
         this.navCtrl.pop();    
         return;
       }
     }, err => {
       loading.dismiss()
       this.toastCtrl.create({ message: `Please try again!`, duration: 4000, position: 'top' }).present(); return;
     });
}
      

  
SaveRateBtn(){
  if(this.review == "" || this.review == undefined) {
    this.toastCtrl.create({ message: `Review is required.`, duration: 6000, position: 'top' }).present(); return;
  }  
  let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
  loading.present();    
     this.security.RateUser(this.rate,this.review,this.provider).subscribe(result => {
       if (result === false) {
         loading.dismiss();
         this.toastCtrl.create({ message: `Please try again!`, duration: 4000, position: 'top' }).present(); return;
       } else {
         loading.dismiss()  
         this.toastCtrl.create({ message: `Rate added successfully.`, duration: 4000, position: 'top' }).present(); 
         this.navCtrl.pop();  
         return;
       }
     }, err => {
       loading.dismiss()
       this.toastCtrl.create({ message: `Please try again!`, duration: 4000, position: 'top' }).present(); return;
     });
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyconnectionpayPage');
  }


  giveRating(i){ 
    //var imageStr=  (<HTMLImageElement>document.querySelector("image_"+i)).src    
var imageStr= (<HTMLInputElement>document.getElementById("image_"+i)).src 
console.log(imageStr) 
var ratingImage=imageStr.search("star.png");
if(ratingImage!=-1){
  for(var j=0; j<=i; j++){
   (<HTMLInputElement>document.getElementById("image_"+j)).src = "assets/imgs/myconnection/yellow_star_rating.png";
    //document.getElementById('img').setAttribute( 'src', 'assets/imgs/myconnection/yellow_star_rating.png' );
  }
}
else{
  for(var j=this.images.length-1; j>i; j--){     
    (<HTMLInputElement>document.getElementById("image_"+j)).src = "assets/imgs/myconnection/star.png";
   // document.getElementById('img').setAttribute( 'src', 'assets/imgs/myconnection/star.png' );
  }
}
this.rate=i+1;
}


    ProfileBtn(){
      if(localStorage['ProviderUser']=="provider") { 
         //this.navCtrl.push(ProfileproviderPage); 
         this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:this.HeaderTittle },{cssClass: 'custom-popover'}).present(); 
        }
      if(localStorage['ProviderUser']=="user")     { 
         //this.navCtrl.push(ProfilePage);     
         this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:this.HeaderTittle },{cssClass: 'custom-popover'}).present(); 
        }
      if(localStorage['ProviderUser']=="agent")    {  
        //this.navCtrl.push(ProfileagentPage);  
        this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:this.HeaderTittle },{cssClass: 'custom-popover'}).present();   
      }
    }


}
