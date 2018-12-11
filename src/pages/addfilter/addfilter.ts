import { Component  , NgZone, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ActionSheetController,PopoverController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx'
import { InvitesPage } from '../invites/invites'; 
import { MyconnectionexpPage } from '../myconnectionexp/myconnectionexp'; 

import {FormControl} from "@angular/forms";
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

import { ProfilePage } from '../profile/profile';  
import { ProfileproviderPage } from '../profileprovider/profileprovider'; 
import { ProfileagentPage } from '../profileagent/profileagent'; 

import { NotificationPage } from '../notification/notification';  


/**
 * Generated class for the AddfilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage() 
@Component({
  selector: 'page-addfilter',
  templateUrl: 'addfilter.html',
})
export class AddfilterPage { 
  
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl; 
  public zoom: number;
  @ViewChild("search")
public searchElementRef;
selectService
  
  Bages:any=""
  Reviews:any=""
  Rating:any=""
  DistanceLoc:any=""

  searchQuery:any=""

  srcQueryDist:any=""
  srcQueryRat:any=""
  srcQueryReview:any=""
  srcQueryBadge:any=""

  services:any=""
  longlat:any=""
  orderBy:any="" 
  page:number=0;
  UpcomingNext:number=0;

  FilterListArr
  ImageUrl 
  FilterDisplay:boolean=false

  SortTxt;
  SortTxtval
  FilterListArr1

  ProviderAddress
  ProviderWebsite
  ProviderPhone
  ProviderEmail
  profession
  UserName
  image
  count:number=0;
  IdDisplay
  Preindex
  displaynone:boolean=false  

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

  onDistanceLoc:boolean=false;
  onBages:boolean=false;
  onReviews:boolean=false;
  onRating:boolean=false;
  numberOfPagesUpcoming:number=1
  numberOfPagesUpcoming1:number=1
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl:ToastController,public loadingCtrl: LoadingController,public http:Http,public security:SecurityProvider,public actionsheetCtrl:ActionSheetController,public popoverCtrl: PopoverController) { 
    this.FilterListArr=[];
    this.FilterListArr1=[]
    
   this.SortTxt="Distance"
   this.SortTxtval="distance"   

   this.selectService=this.navParams.get("selectService");
   
   this.IdDisplay="none";
   this.IdDisplay1="none";   

   console.log("this.nav=",this.navParams.get("selectService"))
   this.zoom = 4;
   this.latitude = 39.8282;
   this.longitude = -98.5795;
   //create search FormControl
   this.searchControl = new FormControl();
   //set current position
   this.setCurrentPosition(); 
  } 
 
  private setCurrentPosition() {  
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            console.log(this.latitude)
            console.log(this.longitude)
            this.ServiceSrc(this.latitude,this.longitude,this.SortTxtval,this.page);
            this.zoom = 12;
        });
    }
  }
  
  ServiceSrc(lat,long,SortBy,page){   
    let latlong='{"longitude":'+this.longitude+',"latitude":'+this.latitude+' }';
    
    let searchQuery1="services="+this.selectService+"&page="+page+"&orderBy="+SortBy+"&maxDistance=10&longlat="+latlong;  
      
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present();  
     
    this.security.GetNearProvider(searchQuery1).subscribe(result => {
      loading.dismiss() 
      if (result === false) { } else { 
        if(result.length !=0) { 
          let data=result;
          for(let i=0; i<data.length; i++) {
                 this.FilterListArr1.push(data[i]);
              }
         }  
        if(result.length ==0) { 
          this.numberOfPagesUpcoming1=this.UpcomingNext;  
          this.toastCtrl.create({ message: `No one available under 10 KM.`, duration: 4000, position: 'top' }).present(); return;
         } 
       } 
    }, err => { 
      loading.dismiss()  
      this.toastCtrl.create({ message: `Please try again!`, duration: 4000, position: 'top' }).present(); return;
     });
    }

  ionViewWillEnter(){    this.ImageUrlLink();   }   

  ImageUrlLink(){    this.ImageUrl=this.security.ImageUrlLink();   }
 
    onChangeDist(id){
      this.FilterListArr=[];
      this.UpcomingNext=0
      this.onDistanceLoc=true;
      this.FilterDisplay=true;

       if(this.DistanceLoc !=""){ 
        let latlong='{"longitude":'+this.longitude+',"latitude":'+this.latitude+' }';
        this.srcQueryDist="services="+this.selectService+"&longlat="+latlong+"&orderBy="+this.SortTxtval;
        this.srcQueryDist=this.srcQueryDist+"&maxDistance="+this.DistanceLoc
       } 

      if(this.Bages !=""){
        this.srcQueryDist=this.srcQueryDist+"&minBadge="+this.Bages
       }
       if(this.Reviews !=""){
        this.srcQueryDist=this.srcQueryDist+"&minReviews="+this.Reviews
       }
       if(this.Rating !=""){
        this.srcQueryDist=this.srcQueryDist+"&minRating="+this.Rating
       } 
        this.SendToSeverSrc(this.srcQueryDist,this.page);
    }
    
  onChangeRating(id){ 
    this.FilterListArr=[];
    this.UpcomingNext=0
    this.FilterDisplay=true;
    this.onRating=true;     
    this.srcQueryRat="services="+this.selectService;
    if(this.Bages !=""){
      this.srcQueryRat=this.srcQueryRat+"&minBadge="+this.Bages
     }
     if(this.Reviews !=""){
      this.srcQueryRat=this.srcQueryRat+"&minReviews="+this.Reviews
     }
     if(this.Rating !=""){
      this.srcQueryRat=this.srcQueryRat+"&minRating="+this.Rating
     } 
     this.SendToSeverSrc(this.srcQueryRat,this.page);
  }

  onChangeReview(id){
    this.FilterListArr=[];
    this.UpcomingNext=0
    this.FilterDisplay=true;
    this.onReviews=true;
    this.srcQueryReview="services="+this.selectService;
    if(this.Bages !=""){
      this.srcQueryReview=this.srcQueryReview+"&minBadge="+this.Bages
     }
     if(this.Reviews !=""){
      this.srcQueryReview=this.srcQueryReview+"&minReviews="+this.Reviews
     }
     if(this.Rating !=""){
      this.srcQueryReview=this.srcQueryReview+"&minRating="+this.Rating
     }
     this.SendToSeverSrc(this.srcQueryReview,this.page);
  }

  onChangeBages(id){
    this.FilterListArr=[];
    this.UpcomingNext=0
    this.FilterDisplay=true;
    this.onBages=true;
    this.srcQueryBadge="services="+this.selectService;  
    if(this.Bages !=""){
      this.srcQueryBadge=this.srcQueryBadge+"&minBadge="+this.Bages
     }
     if(this.Reviews !=""){
      this.srcQueryBadge=this.srcQueryBadge+"&minReviews="+this.Reviews
     }
     if(this.Rating !=""){ 
      this.srcQueryBadge=this.srcQueryBadge+"&minRating="+this.Rating
     } 
     this.SendToSeverSrc(this.srcQueryBadge,this.page);
  } 

  SendToSeverSrc(srcQuery,page){ 
        srcQuery=srcQuery+"&page="+page;
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present();  
      this.security.GetNearProvider(srcQuery).subscribe(result => {
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
          this.toastCtrl.create({ message: `No data found.`, duration: 4000, position: 'top' }).present(); return;
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
      buttons: [{
        text: 'Distance',
        handler: () => {
          this.UpcomingNext=0
          this.FilterListArr=[];
          this.SortTxt="Distance"
          this.SortTxtval="distance"
          this.FilterListArr=[];
          this.FilterListArr1=[];      
          if(!this.FilterDisplay){
            this.ServiceSrc(this.latitude,this.longitude,this.SortTxtval,this.page);
          }
          else{
           if(this.srcQueryDist !=""){
            this.SendToSeverSrc(this.srcQueryDist,this.page);
           }
           if(this.srcQueryRat !=""){
            this.SendToSeverSrc(this.srcQueryRat,this.page);
           }
           if(this.srcQueryReview !=""){
            this.SendToSeverSrc(this.srcQueryReview,this.page);
           }
           if(this.srcQueryBadge !=""){
            this.SendToSeverSrc(this.srcQueryBadge,this.page);
           }

          }
        },
      } ,
      {
        text: 'Reviews',
        handler: () => { 
          this.UpcomingNext=0 
          this.FilterListArr=[];
          this.SortTxt="Reviews"
          this.SortTxtval="reviews"
          this.FilterListArr=[];
    this.FilterListArr1=[];   
          if(!this.FilterDisplay){
            this.ServiceSrc(this.latitude,this.longitude,this.SortTxtval,this.page);
          }
          else{
            if(this.srcQueryDist !=""){
             this.SendToSeverSrc(this.srcQueryDist,this.page);
            }
            if(this.srcQueryRat !=""){
             this.SendToSeverSrc(this.srcQueryRat,this.page);
            }
            if(this.srcQueryReview !=""){
             this.SendToSeverSrc(this.srcQueryReview,this.page);
            }
            if(this.srcQueryBadge !=""){
             this.SendToSeverSrc(this.srcQueryBadge,this.page);
            }
 
           }

        }
      },
      {
        text: 'Badge',
        handler: () => {
          this.UpcomingNext=0
          this.FilterListArr=[];
          this.SortTxt="Badge"
          this.SortTxtval="badge"
          this.FilterListArr=[];
    this.FilterListArr1=[];   
          if(!this.FilterDisplay){
            this.ServiceSrc(this.latitude,this.longitude,this.SortTxtval,this.page);
          }
          else{
            if(this.srcQueryDist !=""){
             this.SendToSeverSrc(this.srcQueryDist,this.page);
            }
            if(this.srcQueryRat !=""){
             this.SendToSeverSrc(this.srcQueryRat,this.page);
            }
            if(this.srcQueryReview !=""){
             this.SendToSeverSrc(this.srcQueryReview,this.page);
            }
            if(this.srcQueryBadge !=""){
             this.SendToSeverSrc(this.srcQueryBadge,this.page);
            }
 
           }
        }
      },
      {   
        text: 'Rating',
        handler: () => {
          this.UpcomingNext=0
          this.FilterListArr=[];
          this.SortTxt="Rating"
          this.SortTxtval="rating"
          this.FilterListArr=[];
    this.FilterListArr1=[];   
          if(!this.FilterDisplay){
            this.ServiceSrc(this.latitude,this.longitude,this.SortTxtval,this.page);
          }
          else{  
            if(this.srcQueryDist !=""){
             this.SendToSeverSrc(this.srcQueryDist,this.page);
            }
            if(this.srcQueryRat !=""){
             this.SendToSeverSrc(this.srcQueryRat,this.page);
            } 
            if(this.srcQueryReview !=""){
             this.SendToSeverSrc(this.srcQueryReview,this.page);
            }
            if(this.srcQueryBadge !=""){
             this.SendToSeverSrc(this.srcQueryBadge,this.page);
            }
           }  
        } 
      }
    ]
    })
    actionsheet.present(); 
  }

  LessBtn(){
    this.UpcomingNext=0; 
    this.numberOfPagesUpcoming1=0;  
    this.page=0;
    this.FilterDisplay=false;
    this.FilterListArr=[];
    this.FilterListArr1=[];            
    this.ServiceSrc(this.latitude,this.longitude,this.SortTxtval,this.page);  
  }




  OpenCloseArrow(email,phone,website,address,index,profession,UserName,image){  
    this.ProviderAddress=address
    this.ProviderWebsite=website
    this.ProviderPhone =phone 
    this.ProviderEmail=email

    this.profession=profession
    this.UserName=UserName
    this.image=this.ImageUrl+image  
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

OpenCloseArrow1(email,phone,website,address,index,profession,UserName,image){  
  this.ProviderAddress1=address
  this.ProviderWebsite1=website
  this.ProviderPhone1 =phone 
  this.ProviderEmail1=email

  this.profession1=profession
  this.UserName1=UserName
  this.image1=this.ImageUrl+image  
  this.count1++ 
  console.log((<HTMLInputElement>document.getElementById("y_"+index)).style.display);            
  let varStyle=(<HTMLInputElement>document.getElementById("y_"+index)).style.display   
  if( this.IdDisplay1 !=varStyle){        
      document.getElementById("y_"+this.Preindex1).style.display="none"
      this.Preindex1=index
      document.getElementById("y_"+index).style.display="block";
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
  console.log("index==",index);  
  document.getElementById("y_"+index).style.display="block";
  document.getElementById("arrowdowns_"+this.Preindex1).style.display="none"
  document.getElementById("arrowups_"+this.Preindex1).style.display="inline-table"
  this.IdDisplay1=document.getElementById("y_"+index).style.display
  }
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
  

SeeDetails(index){
  console.log(index)
  let providerList
  if(!this.FilterDisplay){
     providerList=this.FilterListArr1[index];
  }
  if(this.FilterDisplay){
    providerList=this.FilterListArr[index];
  }
  this.navCtrl.push(MyconnectionexpPage,{ providerList:providerList })
  console.log(providerList)   
  }

  SeeDetails1(index){
    console.log(index)
    let providerList
    if(!this.FilterDisplay){
       providerList=this.FilterListArr1[index];
    }
    if(this.FilterDisplay){
      providerList=this.FilterListArr[index];
    }
    this.navCtrl.push(MyconnectionexpPage,{ providerList:providerList })
    console.log(providerList)   
    }


  ProfileBtn(){  
    if(localStorage['ProviderUser']=="provider") { 
      // this.navCtrl.push(ProfileproviderPage);
       this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Office equipment" },{cssClass: 'custom-popover'}).present();  
      }
    if(localStorage['ProviderUser']=="user")     {  
      //this.navCtrl.push(ProfilePage);     
      this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Office equipment" },{cssClass: 'custom-popover'}).present();   
          }
    if(localStorage['ProviderUser']=="agent")    { 
       //this.navCtrl.push(ProfileagentPage);      
       this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Office equipment" },{cssClass: 'custom-popover'}).present();  
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddfilterPage');
  }


 
  doInfinite(infiniteScroll, movies){   
    if (movies == false) {
      if (this.UpcomingNext < this.numberOfPagesUpcoming1) {
        setTimeout(() => { 
          this.UpcomingNext=this.UpcomingNext+1;
          this.numberOfPagesUpcoming1=this.numberOfPagesUpcoming1+1; 
          this.ServiceSrc(this.latitude,this.longitude,this.SortTxtval,this.UpcomingNext);
             infiniteScroll.complete(); 
      }, 500);
    }
    else{
      infiniteScroll.complete(); 
    }
    } else { 
      if (this.UpcomingNext < this.numberOfPagesUpcoming) {     
        setTimeout(() => { 
          console.log("before=",this.UpcomingNext)
          console.log("before=",this.numberOfPagesUpcoming)
          this.UpcomingNext=this.UpcomingNext+1;
          this.numberOfPagesUpcoming=this.numberOfPagesUpcoming+1;
          console.log("after=",this.UpcomingNext)
          console.log("after=",this.numberOfPagesUpcoming) 
          if(this.srcQueryDist !=""){
            this.SendToSeverSrc(this.srcQueryDist,this.UpcomingNext);
           }
           if(this.srcQueryRat !=""){
            this.SendToSeverSrc(this.srcQueryRat,this.UpcomingNext);
           }
           if(this.srcQueryReview !=""){
            this.SendToSeverSrc(this.srcQueryReview,this.UpcomingNext);
           }
           if(this.srcQueryBadge !=""){
            this.SendToSeverSrc(this.srcQueryBadge,this.UpcomingNext);  
           }
           infiniteScroll.complete(); 
           }, 500);
          }
          else{
            infiniteScroll.complete(); 
          } 
    }
  }
 



}
