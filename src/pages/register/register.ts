import { Component, NgZone, ElementRef, OnInit, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, LoadingController } from 'ionic-angular';
import { CodePage } from '../code/code'; 
import { LoginPage } from '../login/login';
import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx'
import {FormControl} from "@angular/forms";
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { RegisterproviderPage } from '../registerprovider/registerprovider'; 
import { RegisterpublishPage } from '../registerpublish/registerpublish'; 
import { RegprovidersrcPage } from '../regprovidersrc/regprovidersrc'; 


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  masks:any;

  SocialLog;
  FirstName
  LastName
  email
  Password
  ConPassword
  MobileNo
  Username
  Website
  Address
 //919779308331

 Profession = [];
 Category=[];
 
 ProfessionArr = [  
  'AC Services' , 
  'Beauty & Spa' ,
  'Home Cleaning & Repairs' ,
 'Business Services' ,
 'Personal & More' ,
  'Weddings & Events'    
 ];

 CategoryArr = [
  "AC Service and Repair",
  "Refrigerator Repair",
  "Washing Machine Repair",
  "RO or Water Purifier Repair",
  "Geyser / Water Heater Repair",
  "Microwave Repair",
  "Chimney and Hob Servicing",
  "TV Repair",
  "Mobile Repair",
  "Laptop Repair",
  "iPhone, iPad, Mac Repair",

  "Salon at Home",
  "Spa at Home for Women",
  "Party Makeup Artist",
  "Bridal Makeup Artist",
  "Pre Bridal Beauty Packages",
  "Mehendi Artists",

  "Carpenter",
  "Plumber",
  "Electrician",
  "Pest Control",
  "Home Deep Cleaning",
  "Bathroom Deep Cleaning",
  "Sofa Cleaning",
  "Kitchen Deep Cleaning",
  "Carpet Cleaning",
  "Geyser / Water Heater Repair",
  "Washing Machine Repair",
  "AC Service and Repair",
  "Microwave Repair",
  "Refrigerator Repair",
  "Laptop Repair",
  "Mobile Repair",
  "RO or Water Purifier Repair",
  "TV Repair",
  "Chimney and Hob Servicing",
  "iPhone, iPad, Mac Repair",

  "CA for Small Business",
  "Web Designer & Developer",
  "Packers & Movers",
  "CA/CS for Company Registration",
  "CCTV Cameras and Installation",
  "Graphics Designer",
  "Lawyer",
  "Outstation Taxi",
  "CA for Income Tax Filing",
  "Visa Agency",
  "Real Estate Lawyer",
  "Corporate Event Planner",
  "GST Registration & Migration Services",
  "Vastu Shastra Consultants",

  "Astrologer",
  "Baby Portfolio Photographer",
  "Packers & Movers",
  "Monthly Tiffin Service",
  "Passport Agent",
  "Home Tutor",
  "Mathematics Tutor",
  "Commerce Home Tutor",
  "Outstation Taxi",

  "Birthday Party Planner",
  "Bridal Makeup Artist",
  "Wedding Planner",
  "Wedding Photographer",
  "Party Makeup Artist",
  "Pre-Wedding Shoot",
  "Event Photographer",
  "Mehendi Artists",
  "Astrologer",
  "Wedding Choreographe",
  "Party Caterer",
  "DJ",
  "Wedding Caterers",
  "Corporate Event Planner",
  "Pre Bridal Beauty Packages"
];
public latitude: number;
public longitude: number;
public searchControl: FormControl;
public zoom: number;

@ViewChild("search")
public searchElementRef;
types:any="register";
phoneNo
  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController,public toastCtrl:ToastController, public loadingCtrl:LoadingController,public http:Http,public security:SecurityProvider, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
    
      this.types=this.navParams.get("types");  // registerPublishAgent  //registerProvider // register
	  alert("types"+this.types)
      //this.types="registerProvider"; 
      console.log("this.types=",this.types) 
    this.SocialLog=this.navParams.get("SocialLog");
	alert("this.SocialLog"+this.SocialLog)
   // this.SocialLog="0";
    if(this.SocialLog=="1"){
      this.FirstName=this.navParams.get("UserFirstName");
      this.LastName=this.navParams.get("UserLastName");
      this.email=this.navParams.get("UserEmail");
    }


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
    

  GotoNext() {
    if(this.Username == "" || this.Username == undefined) {
      this.toastCtrl.create({ message: `Username is required.`, duration: 6000, position: 'top' }).present(); return;
    } 

    if(!this.noWhitespaceValidator(this.Username)) {   
      this.toastCtrl.create({ message: `Username cannot contain whitespace`, duration: 4000, position: 'top' }).present();
        return false;  
    } 

    if(this.FirstName == "" || this.FirstName == undefined) {
      this.toastCtrl.create({ message: `First Name is required.`, duration: 6000, position: 'top' }).present(); return;
    }

    if(!this.noWhitespaceValidator(this.FirstName)) {   
      this.toastCtrl.create({ message: `First Name cannot contain whitespace`, duration: 4000, position: 'top' }).present();
        return false;  
    } 

    if(this.LastName == "" || this.LastName == undefined) {
      this.toastCtrl.create({ message: `Last Name is required.`, duration: 6000, position: 'top' }).present(); return;
    } 
    if(!this.noWhitespaceValidator(this.LastName)) {   
      this.toastCtrl.create({ message: `Last Name cannot contain whitespace`, duration: 4000, position: 'top' }).present();
        return false;  
    } 
    if(this.email == "" || this.email == undefined) {
      this.toastCtrl.create({ message: `Email ID is required.`, duration: 6000, position: 'top' }).present(); return;
    } 
    if(!this.validateEmail(this.email)) {  
      this.toastCtrl.create({ message: `Please enter a valid email id.`, duration: 4000, position: 'top' }).present();
        return false;
    }
    if(!this.noWhitespaceValidator(this.email)) {   
      this.toastCtrl.create({ message: `Email ID cannot contain whitespace`, duration: 4000, position: 'top' }).present();
        return false;  
    } 
    if(this.Password == "" || this.Password == undefined) {
      this.toastCtrl.create({ message: `Password is required.`, duration: 6000, position: 'top' }).present(); return;
    }

    if(!this.noWhitespaceValidator(this.Password)) {   
      this.toastCtrl.create({ message: `Password cannot contain whitespace`, duration: 4000, position: 'top' }).present();
        return false;  
    }  

    if(this.Password.length<6){
      this.toastCtrl.create({ message: `Password must be atleast 6 characters longer. It must contain at least 1 lowercase alphabet, 1 uppercase alphabet, 1 number and 1 special character.`, duration: 6000, position: 'top' }).present();
       return;
    }
    if(!this.validateForm(this.Password)){
      this.toastCtrl.create({ message: `Password must be atleast 6 characters longer. It must contain at least 1 lowercase alphabet, 1 uppercase alphabet, 1 number and 1 special character.`, duration: 6000, position: 'top' }).present();
       return;
    }
    if(this.ConPassword == "" || this.ConPassword == undefined) {
      this.toastCtrl.create({ message: `Conform password is required.`, duration: 6000, position: 'top' }).present(); return;
    } 
    if(this.ConPassword != this.Password) {
      this.toastCtrl.create({ message: `Those passwords didn't match. Try again.`, duration: 6000, position: 'top' }).present(); return;
    } 
    
    if(this.types=="register" || this.types==undefined){
     
      if(this.phoneNo  == "" || this.phoneNo == undefined) {
        this.toastCtrl.create({ message: `Mobile Number is required.`, duration: 6000, position: 'top' }).present(); return;
      }

      // if(!this.noWhitespaceValidator(this.MobileNo)) {   
      //   this.toastCtrl.create({ message: `Mobile Number cannot contain whitespace`, duration: 4000, position: 'top' }).present();
      //     return false;  
      // } 

      this.MobileNo=this.phoneNo.replace(/\D+/g, '');
      this.OTPSend(); 
      return;
    }  
    if(this.types=="registerProvider"){     
      this.navCtrl.setRoot(RegprovidersrcPage,{FirstName:this.FirstName, LastName:this.LastName, email:this.email,Password:this.Password, ConPassword:this.ConPassword, MobileNo:this.MobileNo,Username:this.Username,ProfessionArr:"",CategoryArr:"",types:this.types});    
        return; 
    } 
  if(this.types=="registerPublishAgent"){
    this.navCtrl.setRoot(RegisterpublishPage,{FirstName:this.FirstName, LastName:this.LastName, email:this.email,Password:this.Password, ConPassword:this.ConPassword, MobileNo:this.MobileNo,Username:this.Username,ProfessionArr:"",CategoryArr:"",types:this.types,latitude: this.latitude,longitude: this.longitude});  
      return; 
  } 
}

validateForm(str){
  var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
  return re.test(str);
}
  
public noWhitespaceValidator(val) {
  var re = /^\S{3,}$/;
  return re.test(val);
}

validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


  OTPSend(){
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present();     
       this.security.sendOtp(this.MobileNo, "register", this.Username).subscribe(result => {
         if (result === true) {
           loading.dismiss()
           this.navCtrl.setRoot(CodePage,{  FirstName:this.FirstName,  LastName:this.LastName,
            email:this.email, Password:this.Password, MobileNo:this.MobileNo, Username:this.Username,
            ProfessionArr:"",CategoryArr:"",Website:"", Address:"",latitude:"",longitude:"",types:this.types  });      
         } else {
           loading.dismiss()
           this.toastCtrl.create({ message: `Please Enter Valid credentials!`, duration: 4000, position: 'top' }).present(); return;  
         }
       }, err => {
         console.log("err", err);
         loading.dismiss()
         this.toastCtrl.create({ message: `Please login with valid credentials!`, duration: 4000, position: 'top' }).present(); return;
       });
  }

  GotoPrevious(){
   this.navCtrl.setRoot(LoginPage); 
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false);
    this.googleMap();
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
                  let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                  if (place.geometry === undefined || place.geometry === null) {
                      return;
                  }
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



  ionViewWillLeave() {
    this.menu.swipeEnable(true);
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
