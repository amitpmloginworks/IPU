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

/**
 * Generated class for the InvitesecondPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invitesecond',
  templateUrl: 'invitesecond.html',
})
export class InvitesecondPage {
  detailimg=[]; 
  CampaignId
  userid
  UserArray=[]; 
  ImageUrl
  detailimgLen:number=0;  
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController, public loadingCtrl:LoadingController,public http:Http,public security:SecurityProvider,public bdata:bigdata, public alertCtrl:AlertController) {   
    this.CampaignId=this.navParams.get("CampaignId") 
    this.userid=this.navParams.get("userid")
    console.log(this.navParams.get("CampaignId"))
    console.log(this.navParams.get("userid"))   
    this.GetData(); 
  }
  ionViewWillEnter(){    this.ImageUrlLink();   }   
  ImageUrlLink(){    this.ImageUrl=this.security.ImageUrlLink();   }

  GetData(){
      let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
      loading.present(); 
      this.security.GetCampaignsById(this.CampaignId).subscribe(result => {
          loading.dismiss()
          console.log(result)
            this.detailimg=[]
          if(result==false){
            this.toastCtrl.create({ message: `No record found.`, duration: 3000, position: 'top' }).present(); return;
          }
          else{
            this.detailimg=result.stats.invited 
            this.detailimgLen=result.stats.invited.length    
          }
      }, err => {
        console.log("err", err);
        loading.dismiss()
        this.toastCtrl.create({ message: `Please try again.`, duration: 4000, position: 'top' }).present(); return;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitesecondPage');
  }
 


  GotoNext(){  
    this.UserArray.push(this.userid)  
        let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
        loading.present(); 
        this.security.CampaignsInvite(this.CampaignId,this.UserArray).subscribe(result => {
            loading.dismiss()
            if(result==false){
              this.toastCtrl.create({ message: `No record found.`, duration: 3000, position: 'top' }).present(); return;
            }
            else{
              this.toastCtrl.create({ message: `Users invited successfully.`, duration: 3000, position: 'top' }).present(); return;
            }
        }, err => {
          console.log("err", err);
          loading.dismiss()
          this.toastCtrl.create({ message: `Please try again.`, duration: 4000, position: 'top' }).present(); return;
        });
      
  }

  ProfileBtn(){
    if(localStorage['ProviderUser']=="provider") {  this.navCtrl.push(ProfileproviderPage);  }
    if(localStorage['ProviderUser']=="user")     {  this.navCtrl.push(ProfilePage);          }
    if(localStorage['ProviderUser']=="agent")    {  this.navCtrl.push(ProfileagentPage);     }
  }

}
