import { Component , NgZone, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController, LoadingController, AlertController } from 'ionic-angular'; 
import{SecurityProvider}from'../../providers/security/security'
import { Http, Headers, RequestOptions } from '@angular/http';
import{Observable}from'rxjs/Rx'
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { InvitefirstPage } from '../invitefirst/invitefirst'; 

import { ProfilePage } from '../profile/profile';  
import { ProfileproviderPage } from '../profileprovider/profileprovider'; 
import { ProfileagentPage } from '../profileagent/profileagent'; 
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { NotificationPage } from '../notification/notification'; 
import { PopoverController } from 'ionic-angular'; 

/**
 * Generated class for the AgentfiltersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agentfilters',
  templateUrl: 'agentfilters.html',
})
export class AgentfiltersPage {

age:any="";
FamilyStatus:any="";
badge:any="";
Reviews:any="";
ReferralDeal:any="";
Sex:any="";

QuerySrc

campaignid

onDeal:boolean=false;
onReviews:boolean=false;
onbadge:boolean=false;
onFamilyStatus:boolean=false;
onage:boolean=false;
onSex:boolean=false; 

SelectValidation:boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl:ToastController,public loadingCtrl: LoadingController,public http:Http,public security:SecurityProvider, public alertCtrl: AlertController, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone,public popoverCtrl: PopoverController) {
    this.campaignid=this.navParams.get("CampaignId"); 
    this.QuerySrc= "";  
    console.log(this.navParams.get("CampaignId")); 
  }

  onChangeDeal()  { this.onDeal=true;  this.SelectValidation=true;   }
  onChangeReviews()  { this.onReviews=true;   this.SelectValidation=true;  }
  onChangebadge()  { this.onbadge=true;   this.SelectValidation=true;  }
  onChangeFamilyStatus()  { this.onFamilyStatus=true;  this.SelectValidation=true;  }
  onChangeage()  { this.onage=true; this.SelectValidation=true;   }
  onChangeSex()  { this.onSex=true;   this.SelectValidation=true;  } 

SendBtn(){  
  if(!this.SelectValidation){   
    this.toastCtrl.create({ message: `Please select at least one.`, duration: 4000, position: 'top' }).present(); return;
  }
  if(this.Sex !=""){
    this.QuerySrc= this.QuerySrc+"&sex="+this.Sex;
  }
  if(this.age !=""){ 
    this.QuerySrc= this.QuerySrc+"&age_groups="+this.age;
  }
  if(this.badge !=""){
    this.QuerySrc= this.QuerySrc+"&minBadge="+this.badge
  }
  if(this.Reviews !=""){
    this.QuerySrc= this.QuerySrc+"&minReviews="+this.Reviews;
  }
  if(this.ReferralDeal !=""){
    this.QuerySrc= this.QuerySrc+"&minDeals="+this.ReferralDeal;
  }
  if(this.FamilyStatus !=""){ 
    this.QuerySrc= this.QuerySrc+"&family_status="+this.FamilyStatus;
  } 
  console.log("QuerySrc=",this.QuerySrc);          
  this.navCtrl.pop();   
  this.navCtrl.push(InvitefirstPage,{QuerySrc:this.QuerySrc,CampaignId:this.campaignid});
   
}
  

ProfileBtn(){
  if(localStorage['ProviderUser']=="provider") {  
    //this.navCtrl.push(ProfileproviderPage); 
    this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Agent Filters" },{cssClass: 'custom-popover'}).present(); 
  }
  if(localStorage['ProviderUser']=="user")     {  
    this.navCtrl.push(ProfilePage); 
    this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Agent Filters" },{cssClass: 'custom-popover'}).present(); 
    }
  if(localStorage['ProviderUser']=="agent")    {  
    //this.navCtrl.push(ProfileagentPage);  
    this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Agent Filters" },{cssClass: 'custom-popover'}).present();   
  }
}



  ionViewDidLoad() {
    console.log('ionViewDidLoad AgentfiltersPage');
  }

}
