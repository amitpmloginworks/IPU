import { Component , NgZone, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController, LoadingController, AlertController } from 'ionic-angular';
import{SecurityProvider}from'../../providers/security/security'
import { Http, Headers, RequestOptions } from '@angular/http';
import{Observable}from'rxjs/Rx'
import {FormControl} from "@angular/forms";
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

import { ProfilePage } from '../profile/profile';  
import { ProfileproviderPage } from '../profileprovider/profileprovider'; 
import { ProfileagentPage } from '../profileagent/profileagent'; 

import { NotificationPage } from '../notification/notification'; 
import { PopoverController } from 'ionic-angular'; 


/**
 * Generated class for the BecomeagentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-becomeagent',
  templateUrl: 'becomeagent.html',
})
export class BecomeagentPage { 

  masks: any;

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl; 
  public zoom: number;
  @ViewChild("search")
public searchElementRef;

Address
age
FamilyStatus
NoOfKids
Household
phoneNo 
Sex

onHousehold:boolean=false;
onFamilyStatus:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl:ToastController,public loadingCtrl: LoadingController,public http:Http,public security:SecurityProvider, public alertCtrl: AlertController, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone,public popoverCtrl: PopoverController) {
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
    //create search FormControl
    this.searchControl = new FormControl();
    //set current position
    this.setCurrentPosition();   

    this.masks = { 
      phoneNo: ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/,/\d/,/\d/, '-', /\d/,/\d/, /\d/, /\d/, /\d/]
  };  

  }

  onChangeHousehold(HouseVal){
    this.onHousehold=true; 
  }
  
  onChangeFamilyStatus(FamilyVal){
    this.onFamilyStatus=true; 
  }

  googleMap(){
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
    //create search FormControl
    this.searchControl = new FormControl();
    //set current position
    this.setCurrentPosition();
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
        let nativeHomeInputBox = document.getElementById('txtHome').getElementsByTagName('input')[0];
        let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
            types: ["address"]
        });
        autocomplete.addListener("place_changed", () => {
            this.ngZone.run(() => {
                //get the place result
                let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                //verify result
                if (place.geometry === undefined || place.geometry === null) {
                    return;
                }
                this.Address=place.formatted_address; 
                //set latitude, longitude and zoom
                this.latitude = place.geometry.location.lat();
                this.longitude = place.geometry.location.lng();
                this.zoom = 12;
            });
        });
    });
}
   

private setCurrentPosition() {  
  if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 12;
      });
  }
}

SexSelect(radioVal){
  this.Sex=radioVal;   
}

SendBtn(){ 
  
  console.log(this.phoneNo.replace(/\D+/g, ''))
  
  if(this.Address=="" || this.Address==undefined){
    this.toastCtrl.create({ message: `Address is required.`, duration: 6000, position: 'top' }).present();
     return;
  }
  if(this.age=="" || this.age==undefined){
    this.toastCtrl.create({ message: `Website is required.`, duration: 6000, position: 'top' }).present();
     return;
  }
  if(this.Sex=="" || this.Sex==undefined){
    this.toastCtrl.create({ message: `Phone Number is required.`, duration: 6000, position: 'top' }).present();
     return;
  }
  if(this.FamilyStatus=="" || this.FamilyStatus==undefined){ 
    this.toastCtrl.create({ message: `Description is required.`, duration: 6000, position: 'top' }).present();
     return;
  }   
  if(this.NoOfKids=="" || this.NoOfKids==undefined){ 
    this.toastCtrl.create({ message: `Description is required.`, duration: 6000, position: 'top' }).present();
     return;
  }
  if(this.Household=="" || this.Household==undefined){ 
    this.toastCtrl.create({ message: `Description is required.`, duration: 6000, position: 'top' }).present();
     return;
  }

  let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
  loading.present();    
     this.security.sendOtp("", "update", localStorage["username"]).subscribe(result => {
       if (result === true) { 
         loading.dismiss()
        this.SendEnterOPT();
       } else {
         loading.dismiss()
         this.toastCtrl.create({ message: `Please try again!`, duration: 4000, position: 'top' }).present(); return;  
       }
     }, err => {
       console.log("err", err);
       loading.dismiss()
       this.toastCtrl.create({ message: `No internet connection,Please try again!`, duration: 4000, position: 'top' }).present(); return;
     });
}


SendEnterOPT(){
  let alert = this.alertCtrl.create({
    title: 'You will receive an SMS with a code on your phone number.',
    inputs: [{
        name: 'username',
        placeholder: 'Enter OTP'
      }
    ],
    buttons: [ {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {   console.log('Cancel clicked');  }
      },
      {
        text: 'Submit',
        handler: data => {
          console.log(data);
          if(data.username=="") {
            this.toastCtrl.create({ message: `OTP is required.`, duration: 4000, position: 'top' }).present(); return;
          }
          else{  this.SendToServer(data.username);   }
        }
      }
    ],
    enableBackdropDismiss: false
  });
  alert.present();
}
     
SendToServer(otp){ 
  let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
  loading.present();    
     this.security.SaveAsPublishAgent(otp,this.Sex,this.age,this.FamilyStatus,this.Address,this.NoOfKids,this.Household,this.latitude,this.longitude).subscribe(result => {
       if (result === true) {
         loading.dismiss();
         this.toastCtrl.create({ message: `Saved successfully.`, duration: 4000, position: 'top' }).present(); return;
       } else {
         loading.dismiss()
         this.toastCtrl.create({ message: `Invalid token, please try again.`, duration: 4000, position: 'top' }).present(); return;
       }
     }, err => {
       console.log("err", err);
       loading.dismiss()
       this.toastCtrl.create({ message: `No internet connection, please try again.`, duration: 4000, position: 'top' }).present(); return;
     });
}  

ProfileBtn(){ 
  if(localStorage['ProviderUser']=="provider") {  
    //this.navCtrl.push(ProfileproviderPage);
    this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Become a publish agent" },{cssClass: 'custom-popover'}).present(); 
  }
  if(localStorage['ProviderUser']=="user")     {  
    //this.navCtrl.push(ProfilePage);   
    this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Become a publish agent" },{cssClass: 'custom-popover'}).present(); 
  }
  if(localStorage['ProviderUser']=="agent")    { 
     //this.navCtrl.push(ProfileagentPage);     
     this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Become a publish agent" },{cssClass: 'custom-popover'}).present(); 
    }
}



ionViewDidEnter() {
  this.googleMap();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad BecomeagentPage');
  }

}
