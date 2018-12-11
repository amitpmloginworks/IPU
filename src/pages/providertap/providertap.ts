import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController ,ToastController, Navbar, Platform} from 'ionic-angular';
import{ bigdata}from'../../app/model'  
import { HomePage } from '../home/home';
import { InvitesPage } from '../invites/invites'; 
import { BecomeproviderPage } from '../becomeprovider/becomeprovider';   
import { BecomeagentPage } from '../becomeagent/becomeagent'; 
import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx' 

import { ProfilePage } from '../profile/profile';  
import { ProfileproviderPage } from '../profileprovider/profileprovider'; 
import { ProfileagentPage } from '../profileagent/profileagent'; 
import { MyconnectionexpPage } from '../myconnectionexp/myconnectionexp'; 

/**
 * Generated class for the ProvidertapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage() 
@Component({
  selector: 'page-providertap',
  templateUrl: 'providertap.html',
})
export class ProvidertapPage {
  @ViewChild (Navbar) navBar : Navbar; // add this line
  providertap:boolean=true;
  flag:boolean=false; 
  Srcres: boolean=false

  Username
  ProviderArrList=[];
  SrcArrUsername;

  ProviderAddress
  ProviderWebsite 
  ProviderPhone 
  ProviderEmail
  Providerlist 

  count=0
  IdDisplay
  Preindex
  displaynone:boolean=false

  myInput
  providerId
  statsReview
  StatsAvg 
  constructor(public navCtrl: NavController, public navParams: NavParams,public bdata:bigdata, public toastCtrl:ToastController,public loadingCtrl: LoadingController,public http:Http,public security:SecurityProvider, public platform:Platform) {
    this.IdDisplay="none";
    this.Username=localStorage['username']  
    //this.ProviderArrList=this.bdata.ProviderSearch;
    this.SrcArrUsername=this.navParams.get("ProviderUsername"); 
      this.myInput=this.navParams.get("ProviderUsername") 
    //this.ProviderArrList=this.bdata.ProviderSearch.filter((item) => {
     // return (item._id.toLowerCase().indexOf(this.SrcArrUsername.toLowerCase()) > -1);
   // })
    //this.getItems(this.ProviderArrList);
    console.log("this.Providerlist After==",this.ProviderArrList)
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present();   
    this.security.GetProvider(this.SrcArrUsername).subscribe(result => {    loading.dismiss();
      if (result === false) {  }
       else {  
       this.ProviderArrList.push({address:result.address,badge:result.badge,email:result.email,gallery:result.gallery,agent_reviews:result.agent_reviews,image:result.image,
        lastname:result.lastname,lastseen:result.lastseen,latitude:result.latitude,
        longitude:result.longitude,name:result.name,pay_received:result.pay_received,
        phone:result.phone,portfolio:result.portfolio,providing:result.providing,referral:result.referral,stats:result.stats,_id:result._id
      })   
       console.log(result)
       if(result.length==0) {    }
      }
    }, err => {    loading.dismiss(); 
    });
    


  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProvidertapPage');  
       // this.navBar.backButtonClick = (e:UIEvent) => {    this.navCtrl.pop();   };
       this.platform.ready().then(() => {
        this.platform.registerBackButtonAction(() => {
          this.navCtrl.setRoot(HomePage);    
        },1); 
   });
  }
  
  getItems(ev) {
    if(ev.target.value !="")  {
      //this.flag=true;  this.Srcres=true;

      this.security.ProviderSearch(ev.target.value).subscribe(result => {
        if (result === false) {
         //this.flag=false; this.Srcres=false;
        } else {
       //  this.flag=true; this.Srcres=true;
         this.ProviderArrList=result
         console.log(result)
         console.log("this.bdata.ProviderSearch==",this.bdata.ProviderSearch)
         if(result.length==0) {
           //this.flag=false; this.Srcres=false;
          }
        }
      }, err => {
        console.log("err", err);
        this.flag=false; this.Srcres=false;
      });

    }
    if(ev.target.value =="" || ev.target.value ==undefined) {
      //this.flag=false; this.Srcres=false;
    }
    //document.getElementsByClassName("searchbar-search-icon").style.display="none";
  }

  BackNav(){
    this.navCtrl.setRoot(HomePage)
  }

  ProviderBtn(){
    this.navCtrl.push(BecomeproviderPage);
  }

  PublishAgentBtn(){
    this.navCtrl.push(BecomeagentPage);
  }

  PublishClickBtn(){
    this.security.Publish_click(this.Username).subscribe(result => {
      if (result === false) {
        this.toastCtrl.create({ message: `Please try again`, duration: 4000, position: 'top' }).present(); return;  
      } else {
        this.toastCtrl.create({ message: `Saved successfully.`, duration: 4000, position: 'top' }).present(); 
        return;
      }
    }, err => {
      this.toastCtrl.create({ message: `Please try again`, duration: 4000, position: 'top' }).present(); return;
    });  
  }

  InvitePublishBtn(index){     
    let providerId=this.ProviderArrList[index]._id;      
  //this.navCtrl.push(InvitesPage,{invitepublish:"publish"});
  this.security.Publish_click(providerId).subscribe(result => {
    if (result === false) {
      this.toastCtrl.create({ message: `Please try again`, duration: 4000, position: 'top' }).present(); return;  
    } else {
      //this.toastCtrl.create({ message: `Saved successfully.`, duration: 4000, position: 'top' }).present(); 
      this.navCtrl.push(InvitesPage,{invitepublish:"publish",ButtonTxt:"",providerId:providerId}); 
      return;
    }
  }, err => {
    this.toastCtrl.create({ message: `Please try again`, duration: 4000, position: 'top' }).present(); return;
  });
  }

    
  InviteUserBtn(){
    this.navCtrl.push(InvitesPage,{invitepublish:"invite",InviteProviderUser:"user"});
  }


  
  OpenCloseArrow(email,phone,website,address,index,providerId) {    
    //this.providertap = !this.providertap;
    this.ProviderAddress=address
    this.ProviderWebsite=website
    this.ProviderPhone =phone 
    this.ProviderEmail=email
    this.providerId=providerId

    this.StatsAvg=this.ProviderArrList[index].stats.avg_score.toFixed(1)
    this.statsReview=this.ProviderArrList[index].stats.reviews

    this.count++
    let varStyle=document.getElementById("x_"+index).style.display
    if( this.IdDisplay!=varStyle){ 
        document.getElementById("x_"+this.Preindex).style.display="none"
        this.Preindex=index
        document.getElementById("x_"+index).style.display="block";
        document.getElementById("arrowup_"+this.Preindex).style.display="inline-table" 
        document.getElementById("arrowdown_"+this.Preindex).style.display="none"
        this.IdDisplay=document.getElementById("x_"+index).style.display
        this.displaynone=true;
        return; 
    }
    if(this.displaynone==true){
        document.getElementById("x_"+this.Preindex).style.display="none"
        document.getElementById("arrowdown_"+this.Preindex).style.display="inline-table"
        document.getElementById("arrowup_"+this.Preindex).style.display="none"
        this.IdDisplay=document.getElementById("x_"+this.Preindex).style.display
        this.displaynone=false;
        this.ProviderAddress=""
        this.ProviderWebsite=""
        this.ProviderPhone ="" 
        this.ProviderEmail=""
        return;
    }
    if(this.count%2==0){
      document.getElementById("x_"+this.Preindex).style.display="none"
      document.getElementById("arrowdown_"+this.Preindex).style.display="inline-table"
      document.getElementById("arrowup_"+this.Preindex).style.display="none"
      this.IdDisplay=document.getElementById("x_"+this.Preindex).style.display
      this.ProviderAddress=""
      this.ProviderWebsite=""
      this.ProviderPhone ="" 
      this.ProviderEmail=""
    }
    if(this.count%2==1){  
    this.Preindex=index
    document.getElementById("x_"+index).style.display="block";
    document.getElementById("arrowdown_"+this.Preindex).style.display="none"
    document.getElementById("arrowup_"+this.Preindex).style.display="inline-table"
    this.IdDisplay=document.getElementById("x_"+index).style.display
    }
}

ProfileBtn(){
    if(localStorage['ProviderUser']=="provider") {  this.navCtrl.push(ProfileproviderPage);  }
    if(localStorage['ProviderUser']=="user")     {  this.navCtrl.push(ProfilePage);          }
    if(localStorage['ProviderUser']=="agent")    {  this.navCtrl.push(ProfileagentPage);     }
}

SeeDetailBtn(index){    
  let providerList
    providerList=this.ProviderArrList[index]; 
    console.log("providerList==",providerList)      
  this.navCtrl.push(MyconnectionexpPage,{ providerId:providerList._id,providerList:"providertap" })
}



}
