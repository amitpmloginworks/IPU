import { Component } from '@angular/core';
import { NavController , ToastController, LoadingController, ModalController, Platform } from 'ionic-angular';
import { InvitesPage } from '../invites/invites'; 
import { BecomeproviderPage } from '../becomeprovider/becomeprovider';   
import { BecomeagentPage } from '../becomeagent/becomeagent'; 
import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx'
import{ bigdata}from'../../app/model'
import { ProvidertapPage } from '../providertap/providertap'; 
import { ProfilePage } from '../profile/profile'; 
import { UserPage } from '../user/user';  
import { UnregisteredPage } from '../unregistered/unregistered';  
import * as moment from 'moment'; 

import { ProfileproviderPage } from '../profileprovider/profileprovider'; 
import { ProfileagentPage } from '../profileagent/profileagent'; 
import { MyconnectionexpPage } from '../myconnectionexp/myconnectionexp';  

import { NotificationPage } from '../notification/notification'; 
import { PopoverController } from 'ionic-angular'; 


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage { 

  providertap:boolean=false;
  flag:boolean=false; 
  Srcres: boolean=false
  Srcresultlist

  ProviderAddress
   ProviderWebsite 
   ProviderPhone 
   ProviderEmail
   Providerlist 


   count=0
   IdDisplay
   Preindex
   displaynone:boolean=false
 
   Providerlist1 
   Providerlist2 
   Providerlist3

   ProviderAvgscore
   ProviderReviews 

   ImageUrl
   UserName 
   myInput
  constructor(public navCtrl: NavController, public toastCtrl:ToastController,public loadingCtrl: LoadingController,public http:Http,public security:SecurityProvider,public bdata:bigdata, public modalCtrl:ModalController,public platform:Platform,public popoverCtrl: PopoverController) {
    this.Providerlist3=[];
    this.Providerlist=[];
        console.log( "Token==",localStorage['token']);
        console.log( "username==",localStorage['username']);
      this.IdDisplay="none";
      this.LoadData();  
      this.security.GetDashboard().subscribe(result => { 
        if (result === false) {   } else {     
              this.bdata.ChartArr=result.chart  
           }
      }, err => {
        this.toastCtrl.create({ message: `Please login with valid credentials!`, duration: 4000, position: 'top' }).present(); return;
      });

   
      let backAction =  platform.registerBackButtonAction(() => {
        console.log(" Div close");
        this.flag=false; this.Srcres=false;
      this.myInput="";
       backAction();    
      },2)  

  }


  LoadData(){
    console.log("Load Data");  
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present(); 

    this.security.UserViews().subscribe(result1 => { 
      loading.dismiss();  
      if (result1 === false) { 
        this.toastCtrl.create({ message: `No record found!`, duration: 4000, position: 'top' }).present(); return;
        } else {  
        this.bdata.UserDataPublish=result1.publish_clicks;
        this.RecentProvider();
       }
    }, err => {
      loading.dismiss();  
      this.toastCtrl.create({ message: `Please try again!`, duration: 4000, position: 'top' }).present(); return;  
    });  
  }

  RecentProvider(){
    if(this.bdata.UserDataPublish.length !=0){
      for(let i=0;i<this.bdata.UserDataPublish.length;i++) {
     let filtertarget =this.bdata.UserDataPublish[i].target;
     // this.Providerlist2 = this.Providerlist1.filter((item) => { return (item._id.toLowerCase().indexOf(filtertarget.toLowerCase()) > -1);   })
     if( filtertarget !="chetan_user3"){   
     this.security.GetProvider(filtertarget).subscribe(result => { 
      if (result === false) {   } 
      else { 
        this.Providerlist.push({address:result.address,badge:result.badge,email:result.email,gallery:result.gallery,image:result.image,lastname:result.lastname,lastseen:result.lastseen,name:result.name,pay_received:result.pay_received,phone:result.phone,providing:result.providing,referral:result.referral,stats:result.stats,_id:result._id})  
     }
    }, err => {  return; }
  );
}
      }
     } 
  }

  InviteUserBtn()    {
      this.navCtrl.push(InvitesPage,{invitepublish:"invite",InviteProviderUser:"user"});
  }

  PublishAgentBtn(){
    this.navCtrl.push(BecomeagentPage);
  }
  ProviderBtn(){
    this.navCtrl.push(BecomeproviderPage);
  }
  SeeDetailBtn(index){        
    this.navCtrl.push(MyconnectionexpPage,{ providerId:this.Providerlist[index]._id,providerList:"providertap" })
  }

  PublishBtn()  {
    // this.navCtrl.push(InvitesPage,{invitepublish:"publish"});
     this.security.Publish_click(this.UserName).subscribe(result => {
       if (result === false) {
         this.toastCtrl.create({ message: `Please try again`, duration: 4000, position: 'top' }).present(); return;  
       } else {
         this.toastCtrl.create({ message: `Saved successfully.`, duration: 4000, position: 'top' }).present(); 
         this.Providerlist=[];
         this.LoadData();
         return;
       }
     }, err => {
       this.toastCtrl.create({ message: `Please try again`, duration: 4000, position: 'top' }).present(); return;
     });
   
   
   }

  getItems(ev)    {
    if(ev.target.value !="")  { 
          /*
         this.security.ProviderSearch(ev.target.value).subscribe(result => {
           if (result === false) {   this.flag=false; this.Srcres=false;  } 
           else {
            this.flag=true;
            this.Srcres=true;
            this.Srcresultlist=result
            this.bdata.ProviderSearch=result;
            if(result.length==0) {   this.flag=false; this.Srcres=false;  }
           }
         }, err => {  this.flag=false; this.Srcres=false; });
         */
        this.security.GetQuickSearch(ev.target.value).subscribe(result => {
          if (result === false) { this.flag=false; this.Srcres=false;  } 
          else {  
            this.flag=true;
            this.Srcres=true;
            this.Srcresultlist=result
             if(result.length==0) {   this.flag=false; this.Srcres=false;  }
          }
        }, err => {       });
    }
    if(ev.target.value =="" || ev.target.value ==undefined) {
      this.flag=false; this.Srcres=false;
    }
    //document.getElementsByClassName("searchbar-search-icon").style.display="none";
  }
  
  SrcResult(ProviderUsername,UsrType,UsrFullN)  {
    //    let modalTips = this.modalCtrl.create(ProvidertapPage,{ProviderUsername:ProviderUsername});
   //     modalTips.onDidDismiss(data => {  this.LoadData(); });  modalTips.present(); 
         
          if(UsrType=='provider'){
            this.navCtrl.setRoot(ProvidertapPage,{ProviderUsername:ProviderUsername});   
          } 
          if(UsrType=='user'){ 
            this.navCtrl.push(UserPage,{ProviderUsername:ProviderUsername,UsrFullN:UsrFullN}); 
          } 
          if(UsrType=='unregistered'){      
            this.navCtrl.push(UnregisteredPage,{ProviderUsername:ProviderUsername,UsrFullN:UsrFullN}); 
          } 
  }
  
  OpenCloseArrow(email,phone,website,address,index,Avgscore,Reviews,UserName){  
      //this.providertap = !this.providertap;
      this.ProviderAddress=address
      this.ProviderWebsite=website
      this.ProviderPhone =phone 
      this.ProviderEmail=email

      this.ProviderAvgscore =Avgscore 
      this.ProviderReviews=Reviews
      this.UserName=UserName

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
      if(localStorage['ProviderUser']=="provider") {  
       // this.navCtrl.push(ProfileproviderPage);
       this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Home" },{cssClass: 'custom-popover'}).present(); 
        }
      if(localStorage['ProviderUser']=="user")     {  
       // this.navCtrl.push(ProfilePage);      
       this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Home" },{cssClass: 'custom-popover'}).present(); 
      }
      if(localStorage['ProviderUser']=="agent")    {  this.navCtrl.push(ProfileagentPage);     }
    } 

  ionViewWillEnter(){    this.ImageUrlLink();   }   
  ImageUrlLink(){    this.ImageUrl=this.security.ImageUrlLink();   }

}
