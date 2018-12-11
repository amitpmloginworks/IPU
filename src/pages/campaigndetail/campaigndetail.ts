import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { InvitefirstPage } from '../invitefirst/invitefirst'; 
import { AgentfiltersPage } from '../agentfilters/agentfilters';  
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
 * Generated class for the CampaigndetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-campaigndetail',
  templateUrl: 'campaigndetail.html',
})
export class CampaigndetailPage {

  public ImgInvite=[]
  public ImgInvitation=[]
  public ImgFeedback=[]  

  datetimes
  ImageUrl
  CampaignId

  invited
  accepted
  reviewed 
  tittle 
  datetime
  campaignImg
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController, public loadingCtrl:LoadingController,public http:Http,public security:SecurityProvider, public alertCtrl:AlertController,public popoverCtrl: PopoverController) {
    this.CampaignId=this.navParams.get("campaignId");
    this.invited=this.navParams.get("invited");
    this.accepted=this.navParams.get("accepted");
    this.reviewed=this.navParams.get("reviewed");
    this.GetData()   
  }

  ionViewWillEnter(){    this.ImageUrlLink();   }   
  ImageUrlLink(){    this.ImageUrl=this.security.ImageUrlLink();   }

  InviteAgentsBtn(){
     this.navCtrl.push(AgentfiltersPage,{CampaignId:this.CampaignId});
  }


  GetData(){  
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present(); 
    this.security.GetCampaignsById(this.CampaignId).subscribe(result => {
        loading.dismiss()
        console.log(result)
          this.ImgInvite=[]
          this.ImgInvitation=[]
          this.ImgFeedback=[] 
        if(result==false){
          this.toastCtrl.create({ message: `No record found.`, duration: 3000, position: 'top' }).present(); return;
        }
        else{   
            let count = Object.keys(result.campaign).length;
             console.log(Object.keys(result.campaign).length);   
if(count <= 5) {
  this.campaignImg="assets/icon/NoImageAvailable.jpg"     
  this.ImgInvite=result.stats.invited  
  this.ImgInvitation=result.stats.accepted
  this.ImgFeedback=result.stats.reviewed
  this.tittle=result.campaign.title
  this.datetime=this.ServerTimestamp(result.campaign.startTime)  
}  
else{
  this.campaignImg=this.ImageUrl+result.campaign.image     
  this.ImgInvite=result.stats.invited  
  this.ImgInvitation=result.stats.accepted
  this.ImgFeedback=result.stats.reviewed
  this.tittle=result.campaign.title
  this.datetime=this.ServerTimestamp(result.campaign.startTime)  
} 
      
        }
    }, err => {
      console.log("err", err);
      loading.dismiss()
      this.toastCtrl.create({ message: `Please try again.`, duration: 4000, position: 'top' }).present(); return;
    });
  }


  ProfileBtn(){
    if(localStorage['ProviderUser']=="provider") { 
       //this.navCtrl.push(ProfileproviderPage); 
       this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Campaign details" },{cssClass: 'custom-popover'}).present(); 
      }  
    if(localStorage['ProviderUser']=="user")     {  
      //this.navCtrl.push(ProfilePage);   
      this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Campaign details" },{cssClass: 'custom-popover'}).present();     
       }
    if(localStorage['ProviderUser']=="agent")    {  
      //this.navCtrl.push(ProfileagentPage);   
      this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Campaign details" },{cssClass: 'custom-popover'}).present(); 
    }
  }

  ServerTimestamp(nowDate) {
    return moment(nowDate).format("DD MMMM YYYY");  
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CampaigndetailPage');
  }

}
