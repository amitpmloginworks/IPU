import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController, LoadingController, AlertController } from 'ionic-angular';
import { CampaigndetailPage } from '../campaigndetail/campaigndetail'; 
import{ bigdata}from'../../app/model'
import * as moment from 'moment'; 
import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx' 
import { CampaignaddPage } from '../campaignadd/campaignadd';  

import { ProfilePage } from '../profile/profile';  
import { ProfileproviderPage } from '../profileprovider/profileprovider'; 
import { ProfileagentPage } from '../profileagent/profileagent';  

import { NotificationPage } from '../notification/notification'; 
import { PopoverController } from 'ionic-angular';    

/**
 * Generated class for the CampaignPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-campaign',
  templateUrl: 'campaign.html',
})
export class CampaignPage {   
  public detailbox 
  datetimes
  ImageUrl

  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController, public loadingCtrl:LoadingController,public http:Http,public security:SecurityProvider,public bdata:bigdata, public alertCtrl:AlertController,public popoverCtrl: PopoverController) {  
    this.detailbox=[];
    
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
      this.security.GetCampaigns().subscribe(result => {
          loading.dismiss()
          this.detailbox=[];
          if(result==false){
            this.toastCtrl.create({ message: `No record found.`, duration: 3000, position: 'top' }).present(); return;
          }
          else{
            for(let i=0;i<result.length;i++){
              var endtime=this.LocalDatetime();
              var Starttime = this.ServerTimestamp(result[i].campaign.startTime);
              let daytime=[];
              daytime=this.DiffTimestamp(Starttime,endtime);
              if(daytime[0].days !=0){   
                if(daytime[0].days ==1){   
                 this.datetimes="Started "+daytime[0].days+" day ago";
                }  
                else{
                  this.datetimes="Started "+daytime[0].days+" days ago";
                } 
              }
              else{
                if(daytime[0].hours !=0){ 
                  if(daytime[0].hours ==1){ 
                   this.datetimes="Started "+daytime[0].hours+" hour ago"; 
                  }
                  else{
                    this.datetimes="Started "+daytime[0].hours+" hours ago"; 
                  }   
                }
                else{
                  if(daytime[0].minutes !=0){ 
                    if(daytime[0].minutes ==1){ 
                     this.datetimes="Started "+daytime[0].minutes+" minute ago"; 
                    }
                    else{
                      this.datetimes="Started "+daytime[0].minutes+" minutes ago"; 
                    }   
                }
                  else{
                    if(daytime[0].seconds !=0){ 
                      if(daytime[0].seconds ==1){   
                      this.datetimes="Started "+daytime[0].seconds+" second ago"; 
                      }
                      else{
                        this.datetimes="Started "+daytime[0].seconds+" seconds ago"; 
                      } 
                    }
                    else{
                      this.datetimes="Started just now"; 
                    }
                  }
                }
              } 

              this.detailbox.push({ _id:result[i].campaign._id,title:result[i].campaign.title,description:result[i].campaign.description,"recentview":this.datetimes,"invitepeople":result[i].stats.invited+" people invited",invited:result[i].stats.invited,accepted:result[i].stats.accepted,reviewed:result[i].stats.reviewed });  
            }
          }
      }, err => {
        console.log("err", err);
        loading.dismiss()
        this.toastCtrl.create({ message: `Please try again.`, duration: 4000, position: 'top' }).present(); return;
      });
    }

  GotoNext(id,invited,accepted,reviewed){      this.navCtrl.push(CampaigndetailPage,{campaignId:id,invited:invited,accepted:accepted,reviewed:reviewed});     }
  

  AddCampaigns(){
    this.navCtrl.push(CampaignaddPage);
  }

  ionViewDidEnter(){
     console.log("enter"); 
     this.GetData();  
  }


 
  ProfileBtn(){
    if(localStorage['ProviderUser']=="provider") {  
      //this.navCtrl.push(ProfileproviderPage);    
      this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Campaign" },{cssClass: 'custom-popover'}).present(); 
     }
    if(localStorage['ProviderUser']=="user")     { 
       //this.navCtrl.push(ProfilePage);  
       this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Campaign" },{cssClass: 'custom-popover'}).present();      
         }  
    if(localStorage['ProviderUser']=="agent")    {  
      //this.navCtrl.push(ProfileagentPage);    
      this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Campaign" },{cssClass: 'custom-popover'}).present();  
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CampaignPage');
  }

}
