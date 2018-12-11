import { Component, NgZone, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController, LoadingController, AlertController, ActionSheetController } from 'ionic-angular';
import { CampaigndetailPage } from '../campaigndetail/campaigndetail'; 
import{ bigdata}from'../../app/model'
import * as moment from 'moment'; 
import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx'  
import { AgentfiltersPage } from '../agentfilters/agentfilters'; 
import { InvitesecondPage } from '../invitesecond/invitesecond'; 

import { ProfilePage } from '../profile/profile';  
import { ProfileproviderPage } from '../profileprovider/profileprovider'; 
import { ProfileagentPage } from '../profileagent/profileagent'; 
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms'; 

import { NotificationPage } from '../notification/notification'; 
import { PopoverController } from 'ionic-angular'; 

import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

/**
 * Generated class for the InvitefirstPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invitefirst',
  templateUrl: 'invitefirst.html',
})
export class InvitefirstPage {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl; 
  public zoom: number;
  @ViewChild("search")
public searchElementRef;

  surveyForm:any;
  ImageUrl

  answers
  Usertemp

  QuerySrc
  CampaignId
  page:number=0;
  numberOfPagesUpcoming:number=1

  AnswersArr
  GetAnswer
  ButtonTxt

count1:number=0;
IdDisplay1
Preindex1
displaynone1:boolean=false 

SortTxt
SortTxtval

srcbydistance:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController, public loadingCtrl:LoadingController,public http:Http,public security:SecurityProvider,public bdata:bigdata, public alertCtrl:AlertController, private formBuilder:FormBuilder,public popoverCtrl: PopoverController,public actionsheetCtrl:ActionSheetController) {  

    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    this.ButtonTxt="INVITE AGENT"; 

    this.SortTxt="IPU Badge"
    this.SortTxtval="badge"

    this.IdDisplay1="none"; 

    this.CampaignId=this.navParams.get("CampaignId") 
    this.QuerySrc=this.navParams.get("QuerySrc") 
    this.Usertemp=[];
    this.answers=[];
    this.AnswersArr=[];
    this.page=0; 
    this.srcbydistance=false; 
    this.GetData(this.page,this.QuerySrc,this.SortTxtval);
    this.setCurrentPosition();  
    
  }  

  private setCurrentPosition() {  
    if ("geolocation" in navigator) { 
        navigator.geolocation.getCurrentPosition((position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            console.log(this.latitude)
            console.log(this.longitude)
            this.zoom = 12;
        },(err)=>{   console.log("err==",err); });
    }
  } 

  DistanceSrc(lat,long,SortBy,page,querysrc){
    let latlong='{"longitude":'+this.longitude+',"latitude":'+this.latitude+' }';
    querysrc=querysrc+"&page="+page+"&orderBy="+SortBy+"&maxDistance=100&longlat="+latlong;
    this.srcbydistance=true; 
    this.SendToServer(querysrc);
  }
 
  SendToServer(QuerySrc){
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present();    
       this.security.GetPublishAgent(QuerySrc).subscribe(result => {
         if (result === false) { 
           loading.dismiss()
           this.toastCtrl.create({ message: `Please try again!`, duration: 4000, position: 'top' }).present(); return;  
         } else {
           loading.dismiss()
           if(result.length !=0){
           let BTemp=[];
           let BFinal=[];
           for(let j=0;j<result.length;j++){
            BTemp.push(result[j].badge);
           }
           BFinal = BTemp.reduce(function(a,b){ if (a.indexOf(b) < 0 ) a.push(b); return a; },[]);
          console.log("BFinal=",BFinal)
          for(let z=0;z<BFinal.length;z++){ 
            for(let i=0;i<result.length;i++)
            {
              if(BFinal[z]==result[i].badge)
              {
               this.Usertemp.push({ "id": result[i]._id,"image":result[i].image,"lastname":result[i].lastname,"name":result[i].name,"address":result[i].address,"email":result[i].email,"phone":result[i].phone,"agentstats":result[i].agentstats }); 
              }   
            }  
            if(z==BFinal.length-1){   
                this.answers.push({"badge":BFinal[z],"answers":this.Usertemp }); 
                this.Usertemp=[]; 
              
            }   
          }
        }
        else{    
          this.numberOfPagesUpcoming=this.page;  
        }
            console.log(this.Usertemp)   
           console.log(this.answers) 
           this.FormBuilderFn();   
         }
       }, err => { 
         loading.dismiss() 
         alert("Error in API="+ JSON.stringify(err));
         //this.toastCtrl.create({ message: `No internet connection,Please try again!`, duration: 4000, position: 'top' }).present(); 
         return;
       }); 
  }

  ionViewWillEnter(){    this.ImageUrlLink();   }  

  ImageUrlLink(){    this.ImageUrl=this.security.ImageUrlLink();   }

  GetData(page,QuerySrc,orderby){      
    QuerySrc=QuerySrc+"&orderBy="+orderby+"&page="+page;
    this.srcbydistance=false; 
    this.SendToServer(QuerySrc);
  }

  FormBuilderFn() { 
    this.surveyForm = this.formBuilder.group({
      answers: this.formBuilder.array([])
    })   
    for (var i = 0; i < this.answers.length; i++) {
        let question = this.formBuilder.group({
          question_id: [this.answers[i].badge, Validators.required],
          answer_by_user: this.formBuilder.array([])    
        });
        this.surveyForm.controls['answers'].push(question);
    } 
  }
 
  onChange(id, isChecked, index) {
    const answers = <FormArray>this.surveyForm.controls.answers.controls[index].controls.answer_by_user
    if(isChecked) {
      answers.push(new FormControl(id)) 
    } else {
      let idx = answers.controls.findIndex(x => x.value == id)
      answers.removeAt(idx)
    }
    this.GetAnswer=this.surveyForm.value
    console.log("GetAnswer=",this.GetAnswer) 
    if(this.GetAnswer.answers[0].answer_by_user.length==0){ 
      this.ButtonTxt="INVITE "+this.GetAnswer.answers[0].answer_by_user.length+" AGENT"; 
       return;
    }  
    this.ButtonTxt="INVITE "+this.GetAnswer.answers[0].answer_by_user.length+" AGENT";      
  }

  OpenCloseArrow1(index,pindex){   
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
        return;
    }
    if(this.count1%2==0){ 
      document.getElementById("y_"+this.Preindex1).style.display="none"
      document.getElementById("arrowdowns_"+this.Preindex1).style.display="inline-table"
      document.getElementById("arrowups_"+this.Preindex1).style.display="none"
      this.IdDisplay1=document.getElementById("y_"+this.Preindex1).style.display
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
  
  

  GotoFilter()  {
    this.navCtrl.push(AgentfiltersPage,{CampaignId:this.CampaignId})
  }

  SearchBtn(){
    if(this.GetAnswer==undefined){  
      this.toastCtrl.create({ message: `Please select at least one agent.`, duration: 6000, position: 'top' }).present();
       return;
    }
    if(this.GetAnswer.answers[0].answer_by_user.length==0){   
      this.toastCtrl.create({ message: `Please select at least one agent.`, duration: 6000, position: 'top' }).present();
       return;
    }  
    this.ButtonTxt="INVITE "+this.GetAnswer.answers[0].answer_by_user.length+" AGENT";   
    console.log(this.GetAnswer.answers[0].answer_by_user.toString()); 
    
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present(); 
    this.security.CampaignsInvite(this.CampaignId,this.GetAnswer.answers[0].answer_by_user).subscribe(result => {
        loading.dismiss()  
        if(result==false){
          this.toastCtrl.create({ message: `No record found.`, duration: 3000, position: 'top' }).present(); return;
        }
        else{
          this.toastCtrl.create({ message: `Users invited successfully.`, duration: 3000, position: 'top' }).present();

          return;
        }
    }, err => {
      console.log("err", err);
      loading.dismiss()
      this.toastCtrl.create({ message: `Please try again.`, duration: 4000, position: 'top' }).present(); return;
    });

  
  }
  
  NextPage(id){
    this.navCtrl.push(InvitesecondPage,{CampaignId:this.CampaignId,userid:id})
  }
  
  ProfileBtn(){
    if(localStorage['ProviderUser']=="provider") {  
      //this.navCtrl.push(ProfileproviderPage); 
      this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Invite agents" },{cssClass: 'custom-popover'}).present(); 
    }
    if(localStorage['ProviderUser']=="user")     { 
       //this.navCtrl.push(ProfilePage);  
       this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Invite agents" },{cssClass: 'custom-popover'}).present(); 
      }
    if(localStorage['ProviderUser']=="agent")    {  
      //this.navCtrl.push(ProfileagentPage); 
      this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Invite agents" },{cssClass: 'custom-popover'}).present(); 
    }
  }


  doInfinite(infiniteScroll){
        if (this.page < this.numberOfPagesUpcoming) {
        setTimeout(() => { 
          this.page=this.page+1;  
          this.InfiniteScroll(this.page,this.QuerySrc);  
          infiniteScroll.complete();  
      }, 500);
    }
    else {  
      infiniteScroll.complete();
    }
  }

  InfiniteScroll(page,QuerySrc){ 
    if(!this.srcbydistance) {  
      QuerySrc=QuerySrc+"&orderBy="+this.SortTxtval+"&page="+page;
    }

    else{   
      let latlong='{"longitude":'+this.longitude+',"latitude":'+this.latitude+' }';
      QuerySrc=QuerySrc+"&page="+page+"&orderBy="+this.SortTxtval+"&maxDistance=100&longlat="+latlong;
    }
   
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present();    
       this.security.GetPublishAgent(QuerySrc).subscribe(result => {
         if (result === false) { 
           loading.dismiss()
           this.toastCtrl.create({ message: `Please try again!`, duration: 4000, position: 'top' }).present(); return;  
         } else {
           loading.dismiss()
           if(result.length !=0){
           let BTemp=[];
           let BFinal=[];
           for(let j=0;j<result.length;j++){
            BTemp.push(result[j].badge);
           }
           BFinal = BTemp.reduce(function(a,b){ if (a.indexOf(b) < 0 ) a.push(b); return a; },[]);
          console.log("BFinal=",BFinal)
          for(let z=0;z<BFinal.length;z++){ 
            for(let i=0;i<result.length;i++)
            {
              if(BFinal[z]==result[i].badge)
              {
               this.Usertemp.push({ "_id": result[i]._id,"image":result[i].image,"lastname":result[i].lastname,"name":result[i].name,"address":result[i].address,"email":result[i].email,"phone":result[i].phone,"agentstats":result[i].agentstats });
              } 
            }  
            if(z==BFinal.length-1){  
                this.answers.push({"badge":BFinal[z],"secarr":this.Usertemp }); 
                this.Usertemp=[]; 
            }   
          }
        }
        else{
          this.numberOfPagesUpcoming=this.page;  
        }
            console.log(this.Usertemp) 
           console.log(this.answers)  
         }
       }, err => {
         console.log("err", err);
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
            this.SortTxt="IPU Badge"
            this.SortTxtval="badge"
            this.answers=[];
            this.page=0;
            this.GetData(this.page,this.QuerySrc,this.SortTxtval); 
            console.log("badge");
          }
        },
        {
        text: 'Distance',
        handler: () => {
          this.SortTxt="Distance"
          this.SortTxtval="distance"
          this.answers=[];
          this.page=0;  
          this.DistanceSrc(this.latitude,this.longitude,this.SortTxtval,this.page,this.QuerySrc); 
          console.log("distance");
        },
      } ,
      {
        text: 'Reviews',
        handler: () => {
          this.SortTxt="Reviews"
          this.SortTxtval="reviews"
          this.answers=[];
          this.page=0;
          this.GetData(this.page,this.QuerySrc,this.SortTxtval); 
          console.log("reviews");
        }
      },
      {
        text: 'Rating',
        handler: () => {
          this.SortTxt="Rating"
          this.SortTxtval="rating"
          this.answers=[];  
          this.page=0;  
          this.GetData(this.page,this.QuerySrc,this.SortTxtval); 
          console.log("rating");
        }
      }
      ,
      {  
        text: 'Grouping',
        handler: () => {
          this.SortTxt="Grouping"
          this.SortTxtval="grouping"
          this.answers=[];  
          this.page=0;  
          this.GetData(this.page,this.QuerySrc,this.SortTxtval); 
          console.log("Grouping");
        }
      }

      
    
    ]
    })
    actionsheet.present(); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitefirstPage');
  }

}
