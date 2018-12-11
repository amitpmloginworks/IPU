import { Component, NgZone, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NotificationPage } from '../notification/notification'; 
import { IonicPage, NavController, NavParams , ToastController, MenuController, ViewController, LoadingController, AlertController,PopoverController, ActionSheetController } from 'ionic-angular';
import{ bigdata}from'../../app/model'
import * as moment from 'moment'; 
import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx' 
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import {FormControl} from "@angular/forms";
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

/**
 * Generated class for the ProfileagentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profileagent',
  templateUrl: 'profileagent.html',
})
export class ProfileagentPage {
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  @ViewChild("search")
public searchElementRef;

  chooseOptions
  FirstName
  LastName
  email
  phoneNo

  image
  ImageUrl
  imagePath  

  Address 
  address
  Age    
  MaleFemale
  Family
  Kids
  Household
  onFamily:boolean=false;
  onHousehold:boolean=false;    
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController,public menuCtrl: MenuController,public toastCtrl:ToastController, public loadingCtrl:LoadingController,public http:Http,public security:SecurityProvider,public bdata:bigdata, public alertCtrl:AlertController,public popoverCtrl: PopoverController,public filetransfer: FileTransfer,public actionsheetCtrl:ActionSheetController,private camera: Camera, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {
    this.chooseOptions="Create"    
    this.GetLoadData(); 

    this.zoom = 4;
      this.latitude = 39.8282;
      this.longitude = -98.5795;
      //create search FormControl
      this.searchControl = new FormControl();
      //set current position
      this.setCurrentPosition();    
    this.imagePath="assets/icon/user.png"
  }

  onChangeFamily()  { this.onFamily=true;    }
  onChangeHousehold()  { this.onHousehold=true;    }

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
   
private setCurrentPosition() {  
  if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 12;
      });
  }
}

ionViewDidEnter() {  
   
}

segmentChanged(event)
{
  console.log(event.value)
  if(event.value=="publishagent")
  {
    this.googleMap();  
    return;
  }
}
 
  ionViewWillEnter(){    this.ImageUrlLink();   }    
  ImageUrlLink(){    this.ImageUrl=this.security.ImageUrlLink();   }

  GetLoadData(){  
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present(); 
    this.security.UserViews().subscribe(result => {
        loading.dismiss()
        if(result==false){
          this.toastCtrl.create({ message: `No record found.`, duration: 3000, position: 'top' }).present(); return;
        }
        else{
          this.imagePath= this.ImageUrl+result.image;        
          this.bdata.UserData=result;
          this.FirstName=result.name
          this.LastName= result.lastname
          this.email= result.email

          this.address=result.address;     
          this.Age=result.publishagent.birthday;   
          this.MaleFemale=result.publishagent.sex;   
          this.Family=result.publishagent.family_status;   
          this.Kids=result.publishagent.no_children;   
          this.Household=result.publishagent.household_income; 
          this.latitude = result.latitude;
          this.longitude = result.longitude; 
          this.phoneNo=result.phone  
          
          if(result.publishagent.length !=0){  
            if(result.publishagent.family_status !=""){ this.onFamily=true;  }
            if(result.publishagent.family_status ==""){ this.onFamily=false;  }
      
            if(result.publishagent.household_income !=""){ this.onHousehold=true;  }
            if(result.publishagent.household_income ==""){ this.onHousehold=false;  }
          }
        }
    }, err => {
      loading.dismiss()
      this.toastCtrl.create({ message: `Please try again.`, duration: 4000, position: 'top' }).present(); return;
    });
  }

  presentPopover() {      
   this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"My Profile" },{cssClass: 'custom-popover'}).present();
  }

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
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      targetHeight: 500,
      targetWidth: 500,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {
      this.image=imageData
      this.toastCtrl.create({ message: 'Image Uploaded successfully', duration: 3000, position: 'top' }).present();
      this.SendToServer();
      return;
    }, (err) => {
      this.toastCtrl.create({ message: 'No image selected', duration: 3000, position: 'top' }).present(); return;
    })
  }

  camera1(){
  this.camera.getPicture({
    quality: 75,
    destinationType:this.camera.DestinationType.FILE_URI,
    sourceType:this.camera.PictureSourceType.CAMERA,
    encodingType: this.camera.EncodingType.JPEG,
    targetHeight: 500,
    targetWidth: 500,
    saveToPhotoAlbum: false,
    correctOrientation: true
  }).then((imageData) => {
    this.image=imageData
    this.toastCtrl.create({ message: 'Image Uploaded successfully', duration: 3000, position: 'top' }).present(); 
    this.SendToServer();
    return;
  }, (err) => {
    this.toastCtrl.create({ message: 'No image selected', duration: 3000, position: 'top' }).present(); return;
  })
}

SendToServer(){
  let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
       loading.present(); 
       let filename = this.image.split('/').pop();
       const filetransfers: FileTransferObject = this.filetransfer.create();
       let options: FileUploadOptions = {
       fileKey: 'file',
       fileName: filename,
       chunkedMode: false,
       mimeType: "multipart/form-data",
       params: { 'upload_preset': 'c5neyvgt' }  
     }
     filetransfers.upload(this.image,'https://api.cloudinary.com/v1_1/dq9zfttmi/upload', options)
       .then((data) => {
        loading.dismiss()
         let imgProfile= JSON.parse(data.response).public_id
         this.security.Images(localStorage["username"],localStorage["token"],imgProfile).subscribe(result => {
          loading.dismiss()
          if(result==true){
            this.toastCtrl.create({ message: `Profile updated successfully!`, duration: 3000, position: 'top' }).present(); 
            this.GetLoadData();
            return;
          }
          if(result==false){
            this.toastCtrl.create({ message: `Error occured in uploading,please try again !`, duration: 3000, position: 'top' }).present(); return;
          }
      }, err => {
        loading.dismiss()
        this.toastCtrl.create({ message: `Please try again.`, duration: 4000, position: 'top' }).present(); return;
      });
      }, (err) => {
           loading.dismiss()
           this.toastCtrl.create({ message: `Please try again.`, duration: 4000, position: 'top' }).present(); return;  
      })
}




  SaveBtn(){ 
      this.SendOTP();
  }
 SendOTP(){
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present();    
       this.security.sendOtp("", "update", localStorage["username"]).subscribe(result => {
         if (result === true) {
           loading.dismiss()
          this.SendEnterOTP();
         } else {
           loading.dismiss()
           this.toastCtrl.create({ message: `Sorry unable to send otp request. Please try again.!`, duration: 4000, position: 'top' }).present(); return;  
         }
       }, err => {
         console.log("err", err);
         loading.dismiss()
         this.toastCtrl.create({ message: `Sorry unable to send otp request. Please try again.!`, duration: 4000, position: 'top' }).present(); return;
       });
  }

  SendEnterOTP(){
    let alert = this.alertCtrl.create({
      title: 'You will receive an SMS with a code on your phone number',
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
           
            if(this.chooseOptions=="Create"){
              this.ProfileUpdate(data.username); 
            }
            else{
              this.ProfileAgent(data.username); 
            }
              
          
          }
        }
      ],
      enableBackdropDismiss: false
    });
    alert.present();
  }
  
  ProfileUpdate(otp){
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present(); 
    this.security.UserViewPost(this.FirstName,this.LastName,"",this.phoneNo,this.email,otp).subscribe(result => {
        loading.dismiss()
        if(result==false){
          this.toastCtrl.create({ message: `No record found.`, duration: 3000, position: 'top' }).present(); return;
        }
        else{ 
          this.toastCtrl.create({ message: `Your profile are updated successfully.`, duration: 3000, position: 'top' }).present(); 
          return;
        }
    }, err => {
      loading.dismiss()
      this.toastCtrl.create({ message: `Please try again.`, duration: 4000, position: 'top' }).present(); return;
    });
  }

  ProfileAgent(otp){  
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present();  
    this.security.SaveAsPublishAgent(otp,this.MaleFemale,parseInt(this.Age),this.Family,this.address,parseInt(this.Kids),this.Household,this.latitude,this.longitude).subscribe(result => {
        loading.dismiss()
        if(result==false){
          this.toastCtrl.create({ message: `No record found.`, duration: 3000, position: 'top' }).present(); return;
        }
        else{   
          this.toastCtrl.create({ message: `Your agent profile are updated successfully.`, duration: 3000, position: 'top' }).present(); 
          return;
        }
    }, err => {
      loading.dismiss()
      this.toastCtrl.create({ message: `Please try again.`, duration: 4000, position: 'top' }).present(); return;
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileagentPage');
  }

}
