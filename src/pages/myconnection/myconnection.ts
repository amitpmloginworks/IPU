import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController, LoadingController, AlertController } from 'ionic-angular';
import { CampaigndetailPage } from '../campaigndetail/campaigndetail'; 
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
 * Generated class for the MyconnectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myconnection',
  templateUrl: 'myconnection.html',
})
export class MyconnectionPage {
  connectionArr 
  connectionArrT
  ImageUrl     
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController, public loadingCtrl:LoadingController,public http:Http,public security:SecurityProvider,public bdata:bigdata, public alertCtrl:AlertController,public popoverCtrl: PopoverController) {
    this.GetLoadData();
    this.connectionArrT=[]
  }
  ionViewWillEnter(){    this.ImageUrlLink();   }   
  ImageUrlLink(){    this.ImageUrl=this.security.ImageUrlLink();   } 

  GetLoadData(){
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present(); 
    this.security.GetConnections(localStorage["username"],localStorage["token"]).subscribe(result => {
        loading.dismiss()
        if(result==false){
          this.toastCtrl.create({ message: `No record found.`, duration: 3000, position: 'top' }).present(); return;
        }
        else{
          this.connectionArr=result;  
          this.connectionArrT=result;   
        }
    }, err => {
      console.log("err", err);
      loading.dismiss()  
      this.toastCtrl.create({ message: `Please try again.`, duration: 4000, position: 'top' }).present(); return;
    });
  } 
  
  
  getItems(ev)  {   
    console.log(ev.target.value) 
    if(ev.target.value ==undefined) {
      this.connectionArr=this.connectionArrT; 
      return; 
      }
    if(ev.target.value !="" || ev.target.value != undefined){ 
      this.connectionArr= this.connectionArrT.filter((item) => {
        return (item.full_name.toLowerCase().indexOf(ev.target.value.toLowerCase()) > -1);
      })
    }
    if(ev.target.value =="" || ev.target.value ==undefined) {
      this.connectionArr=this.connectionArrT;  
      }
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyconnectionPage');
  }

}
