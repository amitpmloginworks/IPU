import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController, LoadingController, AlertController } from 'ionic-angular';
import { CampaigndetailPage } from '../campaigndetail/campaigndetail'; 
import{ bigdata}from'../../app/model'
import * as moment from 'moment'; 
import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx'

import { NotificationPage } from '../notification/notification'; 
import { PopoverController } from 'ionic-angular'; 
 
/**
 * Generated class for the ReviewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reviews',
  templateUrl: 'reviews.html',
})
export class ReviewsPage {  
  ImageUrl
  ReviewArrTemp
  ReviewArr
  Usernames
  SrcProviderId:any="";
  SrcBy:any="";
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController, public loadingCtrl:LoadingController,public http:Http,public security:SecurityProvider,public bdata:bigdata, public alertCtrl:AlertController,public popoverCtrl: PopoverController){
    this.SrcProviderId=this.navParams.get("SrcProviderId")
    this.SrcBy=this.navParams.get("SrcBy") // provider  agent
    this.LoadData()   
  }
  
  ProfileBtn(){
    if(localStorage['ProviderUser']=="provider") { 
       //this.navCtrl.push(ProfileproviderPage); 
       this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"My connections" },{cssClass: 'custom-popover'}).present(); 
       }
    if(localStorage['ProviderUser']=="user")     {  
      //this.navCtrl.push(ProfilePage);     
      this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"My connections" },{cssClass: 'custom-popover'}).present(); 
    }
    if(localStorage['ProviderUser']=="agent")    {  
      //this.navCtrl.push(ProfileagentPage);
      this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"My connections" },{cssClass: 'custom-popover'}).present();   
       }
  }

  ServerDateTime(nowDate) {
    return moment(nowDate).format("DD.MM.YYYY"); 
    }   

  ionViewWillEnter(){    this.ImageUrlLink();   }   
  ImageUrlLink(){    this.ImageUrl=this.security.ImageUrlLink();   }

  LoadData(){
    this.ReviewArr=[];
        this.ReviewArrTemp=[]; 
    if(this.SrcBy=="provider"){
      this.ReviewArrTemp=this.navParams.get("SrcReviewarr")  
      this.ReviewArr=this.ReviewArrTemp  
      this.Usernames=this.SrcProviderId
      return;
    }   
    
    
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present(); 
    this.security.UserViews().subscribe(result => {
        loading.dismiss()
        if(result==false){
          this.toastCtrl.create({ message: `No record found.`, duration: 3000, position: 'top' }).present(); return;
        }
        else{ 
          if(result.pay_received.length==0){
            this.Usernames=result._id
            this.toastCtrl.create({ message: `No record found.`, duration: 3000, position: 'top' }).present(); 
            return;
          }  
          this.Usernames=result._id
          for(let i=0;i<result.pay_received.length;i++){
            console.log(this.ServerDateTime(result.pay_received[i].timestamp)) 
            let DateValue=this.ServerDateTime(result.pay_received[i].timestamp);    
            this.ReviewArrTemp.push({amount:result.pay_received[i].amount,payment_id:result.pay_received[i].payment_id,rate:result.pay_received[i].rate,referral_badge:result.pay_received[i].referral_badge,referral_img:result.pay_received[i].referral_img,referral_str:result.pay_received[i].referral_str,review:result.pay_received[i].review,source:result.pay_received[i].source,source_badge:result.pay_received[i].source_badge,source_img:result.pay_received[i].source_img,source_str:result.pay_received[i].source_str,target:result.pay_received[i].target,target_badge:result.pay_received[i].target_badge,target_img:result.pay_received[i].target_img,target_services:result.pay_received[i].target_services,target_str:result.pay_received[i].target_str,title:result.pay_received[i].title,dateonly:DateValue})   
            DateValue="";
          }
            if(this.SrcBy=="agent"){
              this.ReviewArr=this.ReviewArrTemp.filter((item) => {
                return (item.source.toLowerCase().indexOf(this.SrcProviderId.toLowerCase()) > -1);
              })  
              this.ReviewArrTemp=[];  
              return; 
            }
            else{
              this.ReviewArr=this.ReviewArrTemp  
            }
        }
    }, err => {
      loading.dismiss()
      this.toastCtrl.create({ message: `Please try again.`, duration: 4000, position: 'top' }).present(); return;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewsPage');
  }

}
