import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController, LoadingController, ActionSheetController } from 'ionic-angular';
import * as moment from 'moment'; 
import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx'
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import{ bigdata}from'../../app/model'

import { ProfilePage } from '../profile/profile';  
import { ProfileproviderPage } from '../profileprovider/profileprovider'; 
import { ProfileagentPage } from '../profileagent/profileagent'; 

import { NotificationPage } from '../notification/notification'; 
import { PopoverController } from 'ionic-angular'; 

/**
 * Generated class for the SocialfeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({ 
  selector: 'page-socialfeed',
  templateUrl: 'socialfeed.html',
})
export class SocialfeedPage {
  datetimes 
  PostTxt
  socialList 
  image  
  UserIcon  
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController, public loadingCtrl:LoadingController,public http:Http,public security:SecurityProvider,public filetransfer: FileTransfer,public actionsheetCtrl:ActionSheetController,private camera: Camera,public bdata:bigdata,public popoverCtrl: PopoverController) {
    this.UserIcon=this.bdata.UserData.image; 
    this.image="";
   this.socialList=[];
    this.Getdata();
  }

  ServerTimestamp(nowDate) {
    return moment(nowDate).format("DD/MM/YYYY HH:mm:ss");
    }

    LocalDatetime() {
      return moment().format("DD/MM/YYYY HH:mm:ss");
      }

    ConvertTimestamp() {
      return moment().unix();;
      }

      DiffTimestamp(Starttime,endtime){
        let datetime=[];
        var ms = moment(endtime,"DD/MM/YYYY HH:mm:ss").diff(moment(Starttime,"DD/MM/YYYY HH:mm:ss"));
        var d = moment.duration(ms);
        datetime.push({days:d.days(),hours:d.hours(),minutes:d.minutes(),seconds:d.seconds()});
        return datetime;
      }

       
      PostBtn(){
        if(this.PostTxt == "" || this.PostTxt == undefined) {
          this.toastCtrl.create({ message: `Tittle is required.`, duration: 6000, position: 'top' }).present(); return;
        } 
       
        if(this.image == "") {
          this.toastCtrl.create({ message: `Image is required.`, duration: 6000, position: 'top' }).present(); return;
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
        loading.dismiss()
         let imgProfile= JSON.parse(data.response).public_id
         this.security.UserPosts(localStorage["username"],this.PostTxt,imgProfile).subscribe(result => {
          loading.dismiss()
          
          if(result==true){
            this.toastCtrl.create({ message: `Post uploaded successfully!`, duration: 3000, position: 'top' }).present(); 
            this.image="";
            this.PostTxt="";
            this.Getdata();
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

      uploadpicture()
      {
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
          this.toastCtrl.create({ message: 'Image Uploaded successfully', duration: 3000, position: 'top' }).present(); return;
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
        this.toastCtrl.create({ message: 'Image Uploaded successfully', duration: 3000, position: 'top' }).present(); return;
      }, (err) => {
        this.toastCtrl.create({ message: 'No image selected', duration: 3000, position: 'top' }).present(); return;
      })
    }


      Getdata(){ 
        let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
        loading.present(); 
        this.security.socialFeed().subscribe(result => {
            loading.dismiss() 
            this.socialList=[];
            if(result==false){
              this.toastCtrl.create({ message: `No record found.`, duration: 3000, position: 'top' }).present(); return;
            }
            else{
              for(let i=0;i<result.length;i++){
                var endtime=this.LocalDatetime();
                var Starttime = this.ServerTimestamp(result[i].post_time);
                let daytime=[];
                daytime=this.DiffTimestamp(Starttime,endtime);
                if(daytime[0].days !=0){     this.datetimes=daytime[0].days+"d ago";        }
                else{
                  if(daytime[0].hours !=0){  this.datetimes=daytime[0].hours+"h ago";       }
                  else{
                    if(daytime[0].minutes !=0){  this.datetimes=daytime[0].minutes+"m ago";      }
                    else{
                      if(daytime[0].seconds !=0){  this.datetimes=daytime[0].seconds+"s ago";      }
                      else{
                        this.datetimes="Just Now"; 
                      }
                    }
                  }
                }
                this.socialList.push({ _id:result[i]._id,user:result[i].user,post_time:result[i].post_time,post_text:result[i].post_text,image:result[i].image,"recentview":this.datetimes,"usricon":this.UserIcon,username:result[i].user });  
              }
            }
        }, err => {
          console.log("err", err);
          loading.dismiss()
          this.toastCtrl.create({ message: `Please try again.`, duration: 4000, position: 'top' }).present(); return;
        });
      }


      ProfileBtn(){
        if(localStorage['ProviderUser']=="provider") {  
          //this.navCtrl.push(ProfileproviderPage);
          this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Social Feed" },{cssClass: 'custom-popover'}).present(); 
          }
        if(localStorage['ProviderUser']=="user")     {  
          //this.navCtrl.push(ProfilePage); 
          this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Social Feed" },{cssClass: 'custom-popover'}).present();     
              }
        if(localStorage['ProviderUser']=="agent")    { 
           //this.navCtrl.push(ProfileagentPage);    
           this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Social Feed" },{cssClass: 'custom-popover'}).present();  
          }
      }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SocialfeedPage');
  }

}
