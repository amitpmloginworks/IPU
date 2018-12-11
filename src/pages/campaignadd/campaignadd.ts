import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ActionSheetController,  ToastController, LoadingController, AlertController } from 'ionic-angular';
import * as moment from 'moment'; 

import { ProfilePage } from '../profile/profile';  
import { ProfileproviderPage } from '../profileprovider/profileprovider'; 
import { ProfileagentPage } from '../profileagent/profileagent'; 

import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx' 

import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import { NotificationPage } from '../notification/notification'; 
import { PopoverController } from 'ionic-angular';  
import { AgentfiltersPage } from '../agentfilters/agentfilters';    

/**
 * Generated class for the CampaignaddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-campaignadd',
  templateUrl: 'campaignadd.html',
})
export class CampaignaddPage {
  startDate
  endDate

  AskReferral
  AskReferralFix:any="";

  image:any="";
  LocalimgPath
  title  
  imgProfile
  private minyear : string = (new Date().getFullYear()).toString();  
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController, public loadingCtrl:LoadingController,public http:Http,public security:SecurityProvider, public alertCtrl:AlertController,public filetransfer: FileTransfer,private camera: Camera,public actionsheetCtrl:ActionSheetController,public popoverCtrl: PopoverController) {
    this.startDate= new Date().toISOString();
    this.endDate=new Date().toISOString();
    this.GetUserData();
    this.LocalimgPath="Browse for file"; 
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
      this.LocalimgPath=imageData.split('/').pop(); 
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
    this.LocalimgPath=imageData.split('/').pop();    
    this.toastCtrl.create({ message: 'Image Uploaded successfully', duration: 3000, position: 'top' }).present(); 
 
    return;
  }, (err) => {
    this.toastCtrl.create({ message: 'No image selected', duration: 3000, position: 'top' }).present(); return;
  })
}
  GetUserData()
  { 
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present(); 
    this.security.UserViews().subscribe(result => {
        loading.dismiss()
        if(result !=false){
         console.log(result);
         let linkc="http://www.ipublishu.com/signup?action=invite_user&referral="+result._id+"&type=User"; 
        let InviteUserTxt= result.messages.ask_referral.replace("[link]",linkc);
         this.AskReferralFix=InviteUserTxt; 
         this.AskReferral=this.AskReferralFix
        }
    }, err => {
      console.log("err", err);
      loading.dismiss()
      this.toastCtrl.create({ message: `Please Enter Valid credentials!`, duration: 4000, position: 'top' }).present(); return;
    });
  }


  ConvertTimestamp() {
    return moment().unix();;
    }

    ServerTimestamp(nowDate) {
      return moment(nowDate).format("DD/MM/YYYY HH:mm:ss");
      }
 
    SaveBtn(){
            
      var date1 = new Date(this.startDate);
      var date2 = new Date(this.endDate); 

    if(this.title==undefined || this.title == ""){
      this.toastCtrl.create({ message: `Please Enter Title.`, duration: 4000, position: 'top' }).present(); return; 
    }

    if(this.image==undefined || this.image == ""){ 
      this.toastCtrl.create({ message: `Campaign image is required.`, duration: 4000, position: 'top' }).present(); return; 
    }
    
    if(this.AskReferral==undefined || this.AskReferral == ""){ 
      this.toastCtrl.create({ message: `Campaign Description is required.`, duration: 4000, position: 'top' }).present(); return;   
    }
              
      if (date1.getTime() > date2.getTime()) {
        console.log('date1 is greater than date2');
        this.toastCtrl.create({ message: `End date must be grater than start date.`, duration: 4000, position: 'top' }).present(); return;       
      }
 
      this.SendToServer(); 
    }


    SendToServer(){
      var date1 = new Date(this.startDate);
      var date2 = new Date(this.endDate);  

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
      this.imgProfile= JSON.parse(data.response).public_id
        
      let loading1=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
      loading1.present();      
         this.security.SaveCampaigns(this.title,this.AskReferral, date1.getTime(), date2.getTime(),this.imgProfile).subscribe(result => { 
           if (result === false) { 
             loading1.dismiss();
             this.toastCtrl.create({ message: `Please try again !`, duration: 4000, position: 'top' }).present();
              return;
           } else {
             loading1.dismiss()
             this.toastCtrl.create({ message: `New Campaign saved successfully !`, duration: 4000, position: 'top' }).present();
               
             this.LocalimgPath="Browse for file"
             this.image=""
             this.startDate= new Date().toISOString();
             this.endDate=new Date().toISOString();
             this.title="";
             this.AskReferral=this.AskReferralFix

             this.navCtrl.push(AgentfiltersPage,{CampaignId: result.id}); 
             return;
           }
         }, err => {
           loading1.dismiss() 
           this.toastCtrl.create({ message: `Please try again.`, duration: 4000, position: 'top' }).present(); return;
         });

      }, (err) => {
      loading.dismiss()
      this.toastCtrl.create({ message: `Large Image file size, please try again.`, duration: 4000, position: 'top' }).present(); return; 
      })
      }


      

    ProfileBtn(){
      if(localStorage['ProviderUser']=="provider") { 
         //this.navCtrl.push(ProfileproviderPage); 
         this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"New Campaign" },{cssClass: 'custom-popover'}).present(); 
         }
      if(localStorage['ProviderUser']=="user")     { 
         //this.navCtrl.push(ProfilePage);  
         this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"New Campaign" },{cssClass: 'custom-popover'}).present();   
      }
      if(localStorage['ProviderUser']=="agent")    {    
        //this.navCtrl.push(ProfileagentPage); 
        this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"New Campaign" },{cssClass: 'custom-popover'}).present();  
          }
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CampaignaddPage');
  }

}
