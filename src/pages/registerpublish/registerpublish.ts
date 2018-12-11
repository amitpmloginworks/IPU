import { Component, NgZone, ElementRef, OnInit, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, LoadingController, ActionSheetController } from 'ionic-angular';
import { CodePage } from '../code/code'; 
import { LoginPage } from '../login/login';
import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx'
import {FormControl} from "@angular/forms";
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

/**
 * Generated class for the RegisterpublishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registerpublish',
  templateUrl: 'registerpublish.html',
})
export class RegisterpublishPage {
  masks:any;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  @ViewChild("search")
public searchElementRef;
FirstName
LastName
email
Password
MobileNo
Username
types

Address
Age
MaleFemale
Family
Kids
Household

image='assets/imgs/Group692.png'
ImageUrl
phoneNo

onFamily:boolean=false;
onHousehold:boolean=false;  
  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController,public toastCtrl:ToastController, public loadingCtrl:LoadingController,public http:Http,public security:SecurityProvider, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone,public filetransfer: FileTransfer,public actionsheetCtrl:ActionSheetController,private camera: Camera) {
 
    this.FirstName=this.navParams.get("FirstName");
    this.LastName=this.navParams.get("LastName");
      this.email=this.navParams.get("email");
      this.Password=this.navParams.get("Password");
     this.MobileNo=this.navParams.get("MobileNo");
      this.Username=this.navParams.get("Username");
      this.types=this.navParams.get("types");

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

  onChangeFamily(){
    this.onFamily=true;
  }
  onChangeHousehold()  { this.onHousehold=true;    }

  uploadpicture(){
    let actionsheet = this.actionsheetCtrl.create({
      title: 'Image Upload!',
      buttons: [{
        text: 'Upload From Gallery',
        handler: () => {
            this.gallery() 
        },
      } ,
      {
        text: 'Take A Snap',
        handler: () => {
         this.camera1()
        }
      }]
    })
    actionsheet.present(); 
  }

  
  gallery() {
    this.camera.getPicture({
      quality: 75,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      targetHeight: 500,
      targetWidth: 500,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {
      this.image="data:image/jpeg;base64,"+imageData 
      return;
    }, (err) => {
      this.toastCtrl.create({ message: 'No image selected', duration: 3000, position: 'top' }).present(); return;
    })
  }

  camera1(){
  this.camera.getPicture({
    quality: 75,
    destinationType:this.camera.DestinationType.DATA_URL,
    sourceType:this.camera.PictureSourceType.CAMERA,
    encodingType: this.camera.EncodingType.JPEG,
    targetHeight: 500,
    targetWidth: 500,
    saveToPhotoAlbum: false,
    correctOrientation: true
  }).then((imageData) => {
    this.image="data:image/jpeg;base64,"+imageData 
    return;
  }, (err) => {
    this.toastCtrl.create({ message: 'No image selected', duration: 3000, position: 'top' }).present(); return;
  })
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
                //set latitude, longitude and zoom
                this.Address=place.formatted_address; 
                this.latitude = place.geometry.location.lat();
                this.longitude = place.geometry.location.lng();
                this.zoom = 12;
            });
        });
    });
}

ionViewWillEnter(){    this.ImageUrlLink();   }   
ImageUrlLink(){    this.ImageUrl=this.security.ImageUrlLink();   }


   
private setCurrentPosition() {  
  if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 12;
      });
  }
}
GotoNext() {     
  if(this.image  == "" || this.image == undefined || this.image=="assets/imgs/Group692.png") {
    this.toastCtrl.create({ message: `Image is required.`, duration: 6000, position: 'top' }).present(); return;
  }
  if(this.phoneNo  == "" || this.phoneNo == undefined) {
    this.toastCtrl.create({ message: `Phone Number is required.`, duration: 6000, position: 'top' }).present(); return;
  }
  this.MobileNo=this.phoneNo.replace(/\D+/g, '');

  // if(!this.noWhitespaceValidator(this.MobileNo)) {   
  //   this.toastCtrl.create({ message: `Phone Number cannot contain whitespace`, duration: 4000, position: 'top' }).present();
  //     return false;  
  // }
     
  let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
  loading.present();    
     this.security.sendOtp(this.MobileNo, "registerPublishAgent", this.Username).subscribe(result => {
       if (result === true) {
         loading.dismiss()
         this.navCtrl.push(CodePage,{FirstName:this.FirstName,
           LastName:this.LastName,
           email:this.email, 
           Password:this.Password,
           MobileNo:this.MobileNo,
           Username:this.Username,ProfessionArr:"",CategoryArr:"",Website:"", Address:this.Address,latitude:this.latitude,longitude:this.longitude,types:this.types,Age:this.Age,MaleFemale:this.MaleFemale,Family:this.Family,Kids:this.Kids,Household:this.Household,ImgUpload:this.image}); 
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

public noWhitespaceValidator(val) {
  var re = /^\S{3,}$/;
  return re.test(val);
}

ionViewDidEnter() {
  this.menu.swipeEnable(false);
  this.googleMap();
}
ionViewWillLeave() {  
  this.menu.swipeEnable(true);
 }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterpublishPage');
  }

}
