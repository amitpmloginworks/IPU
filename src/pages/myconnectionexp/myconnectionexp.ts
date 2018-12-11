import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController , ToastController, LoadingController, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx' 
import { MyconnectionpayPage } from '../myconnectionpay/myconnectionpay';  

import { ProfilePage } from '../profile/profile';  
import { ProfileproviderPage } from '../profileprovider/profileprovider'; 
import { ProfileagentPage } from '../profileagent/profileagent';  
import * as moment from 'moment'; 
import { InvitesPage } from '../invites/invites';

import { NotificationPage } from '../notification/notification'; 
import { PopoverController } from 'ionic-angular';   

import { SocialSharing } from '@ionic-native/social-sharing';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { CallNumber } from '@ionic-native/call-number';
import { ReviewsPage } from '../reviews/reviews';    

/**
 * Generated class for the MyconnectionexpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myconnectionexp',
  templateUrl: 'myconnectionexp.html',
})
export class MyconnectionexpPage {   
  ImageUrl
  portfalioArr 

  providerList
  starrate
  StarArr

  UserProviderAgent:boolean=false;  
  portfalioArrlen:number=0;
  ProviderPost
  datetimes="";
  serviceListArr
  providerId
  providerListArr

  ProviderName
  providerImage
  providingServices
  StatsAvg
  statsReview
  ProviderEmail
  ProviderPhone
  ProviderWebsite
  ProviderAddress  

public Sharesubject  : string 	= 'Message from Social Sharing App';
public Sharemessage  : string 	= 'Good services';  
public Shareimage    : string	= 'http://res.cloudinary.com/dq9zfttmi/image/upload/f4nftuwnf131ew4tkgiq.png';
public Shareuri      : string	= '';
   
  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController, public toastCtrl:ToastController,public loadingCtrl: LoadingController,public http:Http,public security:SecurityProvider,public alertCtrl:AlertController,public popoverCtrl: PopoverController,public  appBrowser :InAppBrowser,public callNumber:CallNumber , public sharing:SocialSharing) {
    this.portfalioArr=[];
    this.StarArr=[];
    this.ProviderPost=[];
    this.serviceListArr=[];  
    this.providerListArr=this.navParams.get("providerList")
   
if(this.providerListArr== "providertap" ) { 
  this.providerId=this.navParams.get("providerId");
 }
 else{ 
  this.providerId=this.providerListArr._id   
 }

 console.log("this.providerId=",this.providerId); 
 this.providerImage="assets/icon/user.png" 
  
   
  }



  ServiceGetData(){
    this.serviceListArr=[];
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present();   
    this.security.GetProvider(this.providerId).subscribe(result => { 
        loading.dismiss() 
        if(result==false){  
         // this.toastCtrl.create({ message: `No record found.`, duration: 3000, position: 'top' }).present(); return;
        }
        else{
          this.providerList=result; 
          console.log("providerList=",this.providerList)       
          this.ProviderName=result.name+" "+result.lastname; 
          this.providerImage=this.ImageUrl+result.image;      
          this.providingServices=result.providing.services
          this.StatsAvg=result.stats.avg_score.toFixed(1)
          this.statsReview=result.stats.reviews
          this.ProviderEmail=result.email
          this.ProviderPhone=result.phone
          this.ProviderWebsite=result.providing.website
          this.ProviderAddress=result.address


          let ProviverService=result.providing.services.split(",");
          let EndorseArr=result.providing.endorsments;
          let EndorseArrTemp=result.providing.endorsments;
          let userPresent; 
          console.log("ProviverService=",ProviverService) 
          for(let i=0;i<ProviverService.length;i++){  
            EndorseArrTemp= EndorseArr.filter((item) => {
              return (item.service.toLowerCase().indexOf(ProviverService[i].toLowerCase()) > -1);
            })    
           
            userPresent = this.functiontofindIndexByKeyValue(EndorseArrTemp, "user", localStorage['username']); 
           console.log("userPresent==",userPresent);  
          this.serviceListArr.push({servicelist:ProviverService[i],servicepeople:EndorseArrTemp,userPresent:userPresent,lastcount:(EndorseArrTemp.length-4)})    
          userPresent=false;        
          }
          console.log("this.serviceListArr==",this.serviceListArr) 
           
          this.starrate=parseInt(result.stats.avg_score)
          for(let i=0;i<this.starrate;i++){  
            this.StarArr.push({image:"assets/imgs/myconnection/yellow_star.png"})
          }  
          console.log( this.StarArr)    
          this.portfalioArr=result.portfolio 
          if(this.portfalioArr.length !=0) {   this.portfalioArrlen=this.portfalioArr.length-3; }   
      
          if(this.starrate==0){
            this.StarArr.push({image:"assets/imgs/myconnection/star_outline.png"},{image:"assets/imgs/myconnection/star_outline.png"},{image:"assets/imgs/myconnection/star_outline.png"},{image:"assets/imgs/myconnection/star_outline.png"},{image:"assets/imgs/myconnection/star_outline.png"});
            return;
          }
          if(this.starrate==1){
            this.StarArr.push({image:"assets/imgs/myconnection/star_outline.png"},{image:"assets/imgs/myconnection/star_outline.png"},{image:"assets/imgs/myconnection/star_outline.png"},{image:"assets/imgs/myconnection/star_outline.png"});
            return;
          }
          if(this.starrate==2){
            this.StarArr.push({image:"assets/imgs/myconnection/yellow_star.png"},
            {image:"assets/imgs/myconnection/star_outline.png"},{image:"assets/imgs/myconnection/star_outline.png"}
          );
            return;
          }
          if(this.starrate==3){
            this.StarArr.push({image:"assets/imgs/myconnection/star_outline.png"},{image:"assets/imgs/myconnection/star_outline.png"});
            return;
          }
          if(this.starrate==4){
            this.StarArr.push({image:"assets/imgs/myconnection/star_outline.png"});
            return;
          }    
        }
    }, err => {
      console.log("err", err);
      loading.dismiss()  
      this.toastCtrl.create({ message: `Please try again.`, duration: 4000, position: 'top' }).present(); return;
    });
  }



   functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {
    for (var i = 0; i < arraytosearch.length; i++) {
      if (arraytosearch[i][key] == valuetosearch) {  return true;    }
    }
    return false;
    }




  ServiceBtn(ServiceTittle){  
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present(); 
    this.security.ProviderEndorse(this.providerId,ServiceTittle).subscribe(result => {
        loading.dismiss()
        if(result==false){
          this.toastCtrl.create({ message: `No record found.`, duration: 3000, position: 'top' }).present(); return;
        }
        else{  
          this.toastCtrl.create({ message: `Saved successfully.`, duration: 3000, position: 'top' }).present();
          this.serviceListArr=[]; 
          this.StarArr=[];     
          this.ServiceGetData(); 
          return;
        }
    }, err => {
      console.log("err", err);
      loading.dismiss()  
      this.toastCtrl.create({ message: `Please try again.`, duration: 4000, position: 'top' }).present(); return;
    });
  }

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

      PublishBtn()  {      
        this.security.Publish_click(this.providerId).subscribe(result => {
          if (result === false) {
            this.toastCtrl.create({ message: `Please try again`, duration: 4000, position: 'top' }).present(); return;  
          } else {
            this.toastCtrl.create({ message: `Saved successfully.`, duration: 4000, position: 'top' }).present(); return;
          }
        }, err => {
          this.toastCtrl.create({ message: `Please try again`, duration: 4000, position: 'top' }).present(); return;
        });  
        this.navCtrl.push(InvitesPage,{invitepublish:"publish"});
     }

  GetProviderData(ProviderId){
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present();   
    this.security.GetProviderPost(ProviderId).subscribe(result => {
        loading.dismiss()
        if(result==false){ 
         // this.toastCtrl.create({ message: `No record found.`, duration: 3000, position: 'top' }).present(); return;
        }
        else{
         
          for(let i=0;i<result.length;i++){
            var endtime=this.LocalDatetime();
            var Starttime = this.ServerTimestamp(result[i].post_time);
            let daytime=[];
            daytime=this.DiffTimestamp(Starttime,endtime);
            if(daytime[0].days !=0){     this.datetimes=daytime[0].days+"d ago";        }
            else{
              if(daytime[0].hours !=0){  this.datetimes=daytime[0].hours+"h ago";       }
              else{
                if(daytime[0].minutes !=0){  this.datetimes=daytime[0].minutes+"m ago";      }
                else{
                  if(daytime[0].seconds !=0){  this.datetimes=daytime[0].seconds+"s ago";      }
                  else{
                    this.datetimes="Just Now"; 
                  }
                }
              }
            }
            this.ProviderPost.push({ _id:result[i]._id,user:result[i].user,post_time:result[i].post_time,post_text:result[i].post_text,image:result[i].image,"recentview":this.datetimes });     
          }  
          
          console.log("ProviderPost=",this.ProviderPost) 

        }
    }, err => {
      console.log("err", err);
      loading.dismiss()  
      this.toastCtrl.create({ message: `Please try again.`, duration: 4000, position: 'top' }).present(); return;
    });
  }

  ionViewWillEnter(){   
     this.ImageUrlLink();  

     this.portfalioArr=[];
     this.StarArr=[];
     this.ProviderPost=[];
     this.serviceListArr=[];  
    this.GetProviderData(this.providerId)
    this.ServiceGetData(); 
   }   
  ImageUrlLink(){    this.ImageUrl=this.security.ImageUrlLink();   }


  SendToNextPage(){
    this.navCtrl.push(MyconnectionpayPage,{provider: this.providerList._id,referral: this.providerList.referral,title:"",RateReviewType:"review"})
  }

  ProfileBtn(){
    if(localStorage['ProviderUser']=="provider") { 
      //this.navCtrl.push(ProfileproviderPage);  
      this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:this.ProviderName },{cssClass: 'custom-popover'}).present(); 
      }
    if(localStorage['ProviderUser']=="user")     {  
      //this.navCtrl.push(ProfilePage); 
      this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:this.ProviderName },{cssClass: 'custom-popover'}).present();       
      }
    if(localStorage['ProviderUser']=="agent")    { 
      // this.navCtrl.push(ProfileagentPage);  
      this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:this.ProviderName },{cssClass: 'custom-popover'}).present();
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyconnectionexpPage');
    if(localStorage['ProviderUser']=="agent")    {  this.UserProviderAgent=true;     }
  }

  openEmail(emailAddress){
this.sharing.shareViaEmail('', '', [emailAddress]).then(() => { 
  console.log('share email');
}).catch(() => {
}); 
// this.sharing.canShareVia('com.google.android.gm', "Message via Gmail", null, emailAddress)
//   .then((data) =>{  
//     console.log('share email');      
// })
//   .catch((err) =>  {   alert("App is not available")   }); 
  }

  openLink(website){
console.log(website);
//setup options
const options:InAppBrowserOptions={
  zoom:'no'
}
//website="http://www.google.com"
 const browser = this.appBrowser.create("http://"+website,'_self',options);


//browser.close();

  }


  call(number){
console.log(number);   
this.callNumber.callNumber("+"+number, false)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }

  goToReviews(){   
    this.navCtrl.push(ReviewsPage,{SrcBy:"provider",SrcProviderId:this.providerId,SrcReviewarr:this.providerList.pay_received});
  }

  
  ShareSocial(InvitesImg,InvitesTxt){  
    this.Shareimage ="http://res.cloudinary.com/dq9zfttmi/image/upload/"+InvitesImg+".png"
    this.Sharemessage=InvitesTxt
     this.sharing.share(this.Sharemessage, this.Sharesubject, this.Shareimage, this.Shareuri)
        .then((data) =>
        {
           console.log('Shared via SharePicker');
        })
        .catch((err) =>
        {
           console.log('Was not shared via SharePicker');
        });
  }


 
}
