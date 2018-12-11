import { Component , NgZone, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController, LoadingController,ActionSheetController, AlertController, Platform } from 'ionic-angular'; 
import { AddfilterPage } from '../addfilter/addfilter'; 
import{SecurityProvider}from'../../providers/security/security'
import { Http, Headers, RequestOptions } from '@angular/http';
import{Observable}from'rxjs/Rx'  
import {FormControl} from "@angular/forms";
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { InvitesPage } from '../invites/invites'; 
import { HomePage } from '../home/home';   
import { MyconnectionexpPage } from '../myconnectionexp/myconnectionexp';  

import { ProfilePage } from '../profile/profile';  
import { ProfileproviderPage } from '../profileprovider/profileprovider'; 
import { ProfileagentPage } from '../profileagent/profileagent'; 

import { NotificationPage } from '../notification/notification'; 
import { PopoverController } from 'ionic-angular';  

/**
 * Generated class for the OfficeequipmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({  
  selector: 'page-officeequipment',
  templateUrl: 'officeequipment.html',
})
export class OfficeequipmentPage { 
  providertap:boolean=false;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl; 
  public zoom: number;
  @ViewChild("search")
public searchElementRef;
selectService
searchQuery
FilterListArr
SortTxtval
SortTxt
FilterListArr1
ImageUrl 

ProviderAddress
ProviderWebsite 
ProviderPhone 
ProviderEmail
Providerlist 

count=0
IdDisplay
Preindex
displaynone:boolean=false
profession
UserName
image 

ProviderAddress1
ProviderWebsite1
ProviderPhone1
ProviderEmail1
profession1
UserName1
image1
count1:number=0;
IdDisplay1
Preindex1
displaynone1:boolean=false     

page:number=0;
UpcomingNext:number=0;
numberOfPagesUpcoming:number=1 


  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl:ToastController,public loadingCtrl: LoadingController,public http:Http,public security:SecurityProvider, public alertCtrl: AlertController, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone,public actionsheetCtrl:ActionSheetController,public popoverCtrl: PopoverController,public platform:Platform) {
    this.SortTxtval="badge";
    this.SortTxt="Badge";  
    this.FilterListArr=[];
    this.FilterListArr1=[]; 

    this.selectService=this.navParams.get("selectService");
    this.zoom = 4;
    this.latitude = localStorage['latitude'];
    this.longitude = localStorage['longitude'];
    //create search FormControl
    this.searchControl = new FormControl();
    //set current position

    this.latitude = 39.8282;
    this.longitude = -98.5795;

    this.IdDisplay="none";
    this.IdDisplay1="none"; 
     
    this.setCurrentPosition();   
    console.log("displaynone1 ==",this.displaynone1);   
    this.ServiceSrc(this.SortTxtval,this.page); 
  }
  ionViewWillEnter(){    this.ImageUrlLink();   }   
  ImageUrlLink(){    this.ImageUrl=this.security.ImageUrlLink();   }
private setCurrentPosition() {  
  if ("geolocation" in navigator) { 
      navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          console.log("latitude=",this.latitude) 
          console.log("longitude=",this.longitude)
          this.zoom = 12;
      },(err)=>{   console.log("err==",err); });
  }
} 

ServiceSrcDistance(lat,long,SortBy,page){ 

  let latlong='{"longitude":'+this.longitude+',"latitude":'+this.latitude+' }';

  this.searchQuery="services="+this.selectService+"&page="+page+"&orderBy="+SortBy+"&maxDistance=100&longlat="+latlong;   
   
let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
loading.present();  
this.security.GetNearProvider(this.searchQuery).subscribe(result => {
  loading.dismiss() 
  if (result === false) { } else { 
    if(result.length !=0) { this.FilterListArr=result; } 
    if(result.length ==0) { 
      this.FilterListArr=[];
      this.toastCtrl.create({ message: `No one available near you.`, duration: 4000, position: 'top' }).present(); return;
     } 
   } 
}, err => {  
  loading.dismiss()
  this.toastCtrl.create({ message: `No internet connection,Please try again!`, duration: 4000, position: 'top' }).present(); return;
 });

let searchQuery1="services="+this.selectService+"&page=0&orderBy="+SortBy+"&maxDistance=10&longlat="+latlong;    

this.security.GetNearProvider(searchQuery1).subscribe(result => {
  if (result === false) { } else { 
    if(result.length !=0) { this.FilterListArr1=result; }  
    if(result.length ==0) {   
      this.FilterListArr1=[];
      this.toastCtrl.create({ message: `No one available under 10 KM.`, duration: 4000, position: 'top' }).present(); return;
     } 
   } 
}, err => {  
  this.toastCtrl.create({ message: `No internet connection,Please try again!`, duration: 4000, position: 'top' }).present(); return;
 });

}

ServiceSrc(SortBy,page){

  this.searchQuery="services="+this.selectService+"&page="+page+"&orderBy="+SortBy;   
   
let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
loading.present();  
this.security.GetNearProvider(this.searchQuery).subscribe(result => {
  loading.dismiss() 
  if (result === false) { } else { 
    if(result.length !=0) { 
      let data=result;
      for(let i=0; i<data.length; i++) {
             this.FilterListArr.push(data[i]);
          }  
    } 
    if(result.length ==0) { 
      this.numberOfPagesUpcoming=this.UpcomingNext; 
      this.toastCtrl.create({ message: `No record found.`, duration: 4000, position: 'top' }).present(); return;
     } 
   } 
}, err => {  
  loading.dismiss()
  this.toastCtrl.create({ message: `No internet connection,Please try again!`, duration: 4000, position: 'top' }).present(); return;
 });
}


SortByData(){
  let actionsheet = this.actionsheetCtrl.create({
    title: 'Sort By',
    buttons: [
      {
        text: 'Badge',
        handler: () => {
          this.SortTxt="Badge"
          this.SortTxtval="badge"
          this.FilterListArr=[];
          this.page=0;
          this.ServiceSrc(this.SortTxtval,this.page);
          console.log("badge");
        }
      },
      {
      text: 'Distance',
      handler: () => {
        this.SortTxt="Distance"
        this.SortTxtval="distance" 
        this.FilterListArr=[];
        this.FilterListArr1=[]; 
        this.ServiceSrcDistance(this.latitude,this.longitude,this.SortTxtval,this.page);
        console.log("distance");
      },
    } ,
    {
      text: 'Reviews',
      handler: () => {
        this.SortTxt="Reviews"
        this.SortTxtval="reviews"
        this.page=0;
        this.FilterListArr=[];
        this.ServiceSrc(this.SortTxtval,this.page);
        console.log("reviews");
      }
    },
    {
      text: 'Rating',
      handler: () => {
        this.SortTxt="Rating"
        this.SortTxtval="rating" 
        this.page=0;
        this.FilterListArr=[];
        this.ServiceSrc(this.SortTxtval,this.page);  
        console.log("rating");
      }
    }
  
  ]
  })
  actionsheet.present(); 
}



 
doInfinite(infiniteScroll, movies){     
  if (movies == "distance") {
     
    infiniteScroll.complete();

  //   if (this.UpcomingNext < this.numberOfPagesUpcoming1) {
  //     setTimeout(() => { 
  //       this.UpcomingNext=this.UpcomingNext+1;
  //       this.numberOfPagesUpcoming1=this.numberOfPagesUpcoming1+1; 
  //       this.ServiceSrc(this.latitude,this.longitude,this.SortTxtval,this.UpcomingNext);
  //          infiniteScroll.complete(); 
  //   }, 500);
  // }
  // else{
  //   infiniteScroll.complete(); 
  // }
  } else {    
    if (this.UpcomingNext < this.numberOfPagesUpcoming) {     
      setTimeout(() => { 
        console.log("before=",this.UpcomingNext)
        console.log("before=",this.numberOfPagesUpcoming)
        this.UpcomingNext=this.UpcomingNext+1;
        this.numberOfPagesUpcoming=this.numberOfPagesUpcoming+1;
        console.log("after=",this.UpcomingNext)
        console.log("after=",this.numberOfPagesUpcoming) 
        this.ServiceSrc(this.SortTxtval,this.UpcomingNext);
         infiniteScroll.complete(); 
         }, 500);
        }  
        else{
          infiniteScroll.complete(); 
        } 
  }
}


  InviteUserBtn()    {  
    this.navCtrl.push(InvitesPage,{invitepublish:"invite",InviteProviderUser:"user"});
}


  FilterBtn(){   
          this.navCtrl.setRoot(AddfilterPage,{selectService:this.selectService});   
  }

 

  
  OpenCloseArrow(email,phone,website,address,index1,profession,UserName,image){    
    //this.providertap = !this.providertap;
    this.ProviderAddress=address 
    this.ProviderWebsite=website
    this.ProviderPhone =phone 
    this.ProviderEmail=email

    this.profession=profession
    this.UserName=UserName
    this.image=this.ImageUrl+image  
    this.count++
    let varStyle=document.getElementById("x_"+index1).style.display
    if( this.IdDisplay!=varStyle){ 
        document.getElementById("x_"+this.Preindex).style.display="none"
        this.Preindex=index1
        document.getElementById("x_"+index1).style.display="block";
        document.getElementById("arrowup_"+this.Preindex).style.display="inline-table" 
        document.getElementById("arrowdown_"+this.Preindex).style.display="none"
        this.IdDisplay=document.getElementById("x_"+index1).style.display
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
    this.Preindex=index1
    (<HTMLInputElement>document.getElementById("x_"+index1)).style.display="block";
    document.getElementById("arrowdown_"+this.Preindex).style.display="none";
    document.getElementById("arrowup_"+this.Preindex).style.display="inline-table";
    this.IdDisplay=(<HTMLInputElement>document.getElementById("x_"+index1)).style.display  
    }
}
OpenCloseArrow2(email,phone,website,address,index,profession,UserName,image){
  this.ProviderAddress1=address
  this.ProviderWebsite1=website
  this.ProviderPhone1 =phone 
  this.ProviderEmail1=email

  this.profession1=profession
  this.UserName1=UserName
  this.image1=this.ImageUrl+image 
  console.log("displaynone1 ==",this.displaynone1);   
  console.log("index ==",index);  
  this.displaynone1=true;   

}
  
OpenCloseArrow1(email,phone,website,address,index,profession,UserName,image){  
  this.ProviderAddress1=address
  this.ProviderWebsite1=website
  this.ProviderPhone1 =phone 
  this.ProviderEmail1=email

  this.profession1=profession
  this.UserName1=UserName
  this.image1=this.ImageUrl+image  
  this.count1++  

  console.log("IdDisplay1 ==",this.IdDisplay1);  
  console.log("btn click=",(<HTMLInputElement>document.getElementById("y_"+index)).style.display);            
  let varStyle=(<HTMLInputElement>document.getElementById("y_"+index)).style.display   
  if( this.IdDisplay1 !=varStyle){        
      document.getElementById("y_"+this.Preindex1).style.display="none"   
      this.Preindex1=index
      document.getElementById("y_"+index).style.display="inline-flex";  
      document.getElementById("arrowups_"+this.Preindex1).style.display="inline-table" 
      document.getElementById("arrowdowns_"+this.Preindex1).style.display="none"
      this.IdDisplay1=document.getElementById("y_"+index).style.display
      this.displaynone1=true; 
      return; 
  }
  if(this.displaynone1==true){
      document.getElementById("y_"+this.Preindex1).style.display="none"
      document.getElementById("arrowdowns_"+this.Preindex1).style.display="inline-table"
      document.getElementById("arrowups_"+this.Preindex1).style.display="none"
      this.IdDisplay1=document.getElementById("y_"+this.Preindex1).style.display
      this.displaynone1=false;
      this.ProviderAddress1=""
      this.ProviderWebsite1=""
      this.ProviderPhone1 ="" 
      this.ProviderEmail1=""
      return;
  }
  if(this.count1%2==0){
    console.log("index if con2==",index);    
    document.getElementById("y_"+this.Preindex1).style.display="none"
    document.getElementById("arrowdowns_"+this.Preindex1).style.display="inline-table"
    document.getElementById("arrowups_"+this.Preindex1).style.display="none"
    this.IdDisplay1=document.getElementById("y_"+this.Preindex1).style.display
    this.ProviderAddress1=""
    this.ProviderWebsite1=""
    this.ProviderPhone1 ="" 
    this.ProviderEmail1=""
  }
  if(this.count1%2==1){   
  this.Preindex1=index
  console.log("index if con1==",index);  
  document.getElementById("y_"+index).style.display="inline-flex"; 
  document.getElementById("arrowdowns_"+this.Preindex1).style.display="none"
  document.getElementById("arrowups_"+this.Preindex1).style.display="inline-table"
  this.IdDisplay1=document.getElementById("y_"+index).style.display
  }




} 

PublishBtn1()  {  
  this.security.Publish_click(this.UserName1).subscribe(result => {
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



  PublishBtn()  {       
    this.security.Publish_click(this.UserName).subscribe(result => {
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
   
 
 SeeDetails(index){
   console.log(index)
   let providerList
      providerList=this.FilterListArr1[index];
   this.navCtrl.push(MyconnectionexpPage,{ providerList:providerList })
   console.log(providerList)   
   }

   SeeDetails1(index){
    console.log(index) 
    let providerList=this.FilterListArr[index]; 
    this.navCtrl.push(MyconnectionexpPage,{ providerList:providerList })
    console.log(providerList)   
    }

   ProfileBtn(){
    if(localStorage['ProviderUser']=="provider") {  
      this.navCtrl.push(ProfileproviderPage);
      this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Office equipment" },{cssClass: 'custom-popover'}).present(); 
    }
    if(localStorage['ProviderUser']=="user")     {  
     // this.navCtrl.push(ProfilePage);      
     this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Office equipment" },{cssClass: 'custom-popover'}).present(); 
    }
    if(localStorage['ProviderUser']=="agent")    {  
      //this.navCtrl.push(ProfileagentPage); 
      this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Office equipment" },{cssClass: 'custom-popover'}).present(); 
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad OfficeequipmentPage');

    //this.platform.ready().then(() => {
     // this.platform.registerBackButtonAction(() => {  this.navCtrl.setRoot(HomePage);   },1); 
  //});    

  }

}
