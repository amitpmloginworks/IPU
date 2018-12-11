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
 * Generated class for the OfferSinglePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-offer-single',
  templateUrl: 'offer-single.html',
})
export class OfferSinglePage {
  campaignId
  ImageUrl

  InviteImg 
  InviteName 
  title
  description
  ProfessionName
  campaignImg
  Badgetypes:number=0;
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController, public loadingCtrl:LoadingController,public http:Http,public security:SecurityProvider,public bdata:bigdata, public alertCtrl:AlertController,public popoverCtrl: PopoverController) {
this.campaignId=this.navParams.get("campaignId");
    this.GetData(); 
  }

  ionViewWillEnter(){    this.ImageUrlLink();   }   

  ImageUrlLink(){    this.ImageUrl=this.security.ImageUrlLink();   }

  ServerTimestamp(nowDate) {
    return moment(nowDate).format("DD/MM/YYYY HH:mm:ss");
    }

    LocalDatetime() {
      return moment().format("DD/MM/YYYY HH:mm:ss");
      }

    ConvertTimestamp() {
      return moment().unix();;
      }

      DiffTimestamp(Starttime,endtime){
        let datetime=[];
        var ms = moment(endtime,"DD/MM/YYYY HH:mm:ss").diff(moment(Starttime,"DD/MM/YYYY HH:mm:ss"));
        var d = moment.duration(ms);
        datetime.push({days:d.days(),hours:d.hours(),minutes:d.minutes(),seconds:d.seconds()});
        return datetime;
      }
     
  GetData(){
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present(); 
    this.security.GetCampaignsById(this.campaignId).subscribe(result => {
        loading.dismiss()
        if(result==false){
          this.toastCtrl.create({ message: `No record found.`, duration: 3000, position: 'top' }).present(); return;
        }
        else{
           
          let count = Object.keys(result.campaign).length;
             console.log(Object.keys(result.campaign).length); 
             if(count <= 5) { 
              this.campaignImg="assets/icon/NoImageAvailable.jpg"      
            }  
            else{
              this.campaignImg=this.ImageUrl+result.campaign.image     
            } 
          this.title=result.campaign.title; 
          let ProviderName=result.campaign.provider  
          this.description=result.campaign.description;
          for(let i=0;i<result.stats.invited.length;i++){
            this.InviteImg=result.stats.invited[i].image;
            this.InviteName=result.stats.invited[i].name;

            this.security.GetProvider(ProviderName).subscribe(result => {
              loading.dismiss()
              if(result==false){    }
              else{
                this.ProfessionName=result.providing.services; 
                this.Badgetypes=result.badge;      
              }
          }, err => {   }
        );
  
          }
        }
    }, err => {
      console.log("err", err);
      loading.dismiss()
      this.toastCtrl.create({ message: `Please try again.`, duration: 4000, position: 'top' }).present(); return;
    });

  }


  

  AcceptBtn(){
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present(); 
    this.security.CampaignsAccept(this.campaignId).subscribe(result => {
        loading.dismiss()
        if(result==false){
          this.toastCtrl.create({ message: `Please try again`, duration: 3000, position: 'top' }).present(); return;
        }
        else{
          this.toastCtrl.create({ message: `Offer accepted successfully.`, duration: 3000, position: 'top' }).present(); return;
        }
    }, err => { 
      loading.dismiss()
      this.toastCtrl.create({ message: `Please try again.`, duration: 4000, position: 'top' }).present(); return;
    });
  }


  ProfileBtn(){
    if(localStorage['ProviderUser']=="provider") {  
      //this.navCtrl.push(ProfileproviderPage);  
      this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Offer detail" },{cssClass: 'custom-popover'}).present(); 
    }
    if(localStorage['ProviderUser']=="user")     {  
     // this.navCtrl.push(ProfilePage);      
     this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Offer detail" },{cssClass: 'custom-popover'}).present();
    }
    if(localStorage['ProviderUser']=="agent")    {  
      //this.navCtrl.push(ProfileagentPage);  
      this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Offer detail" },{cssClass: 'custom-popover'}).present();  
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfferSinglePage');
  }

}
