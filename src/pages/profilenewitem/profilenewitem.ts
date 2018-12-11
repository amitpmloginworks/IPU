import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController, MenuController, LoadingController, AlertController,PopoverController, ActionSheetController, ModalController, ViewController } from 'ionic-angular';
import{ bigdata}from'../../app/model'
import * as moment from 'moment'; 
import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx' 
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

/**
 * Generated class for the ProfilenewitemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profilenewitem',
  templateUrl: 'profilenewitem.html',
})
export class ProfilenewitemPage {

  image
  LocalimgPath
  ServicePrice:any="";
  ServiceTittle:any="";

  constructor(public navCtrl: NavController, public navParams: NavParams,public popoverCtrl: PopoverController,  public modalCtrl:ModalController, public viewCtrl:ViewController,public menuCtrl: MenuController,public toastCtrl:ToastController, public loadingCtrl:LoadingController,public http:Http,public security:SecurityProvider,public bdata:bigdata, public alertCtrl:AlertController,public filetransfer: FileTransfer,public actionsheetCtrl:ActionSheetController,private camera: Camera) {

    this.LocalimgPath="Browse for file"; 

  }
  
  close(){
    this.viewCtrl.dismiss();
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
      this.LocalimgPath=imageData 
      this.toastCtrl.create({ message: 'Image Uploaded successfully', duration: 3000, position: 'top' }).present();
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
    this.LocalimgPath=imageData
    this.toastCtrl.create({ message: 'Image Uploaded successfully', duration: 3000, position: 'top' }).present(); 
 
    return;
  }, (err) => {
    this.toastCtrl.create({ message: 'No image selected', duration: 3000, position: 'top' }).present(); return;
  })
}



SavedBTn(){ 
  
  if(this.image=="" || this.image==undefined){
    this.toastCtrl.create({ message: `Image is required.`, duration: 3000, position: 'top' }).present(); return;
  }
  

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
         let imgProfile= JSON.parse(data.response).public_id
 
         this.security.PortfolioProvider(imgProfile,this.ServiceTittle,this.ServicePrice).subscribe(result => {   
          loading.dismiss()
          if(result==true){
            loading.dismiss()
            this.toastCtrl.create({ message: `New Portfolio saved successfully!`, duration: 3000, position: 'top' }).present(); 
            this.image=""
            this.LocalimgPath=""
            this.ServiceTittle=""
            this.ServicePrice="" 
            this.viewCtrl.dismiss();
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilenewitemPage');
  }

}
