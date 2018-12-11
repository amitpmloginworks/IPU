import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { InvitesPage } from '../invites/invites'; 
import { BecomeproviderPage } from '../becomeprovider/becomeprovider';   
import { BecomeagentPage } from '../becomeagent/becomeagent'; 

import { HomePage } from '../home/home';

import { ProfilePage } from '../profile/profile';  
import { ProfileproviderPage } from '../profileprovider/profileprovider'; 
import { ProfileagentPage } from '../profileagent/profileagent'; 


/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  providertap:boolean=true;
  flag:boolean=false; 
  Srcres: boolean=false
  image

  myInput
  fullName 
  UsrName
  constructor(public navCtrl: NavController, public navParams: NavParams,public filetransfer: FileTransfer,private camera: Camera, public actionCtrl:ActionSheetController) {
this.myInput=navParams.get("UsrFullN");
this.fullName=navParams.get("UsrFullN");
this.UsrName=navParams.get("ProviderUsername");
  }


  BackNav(){ 
    this.navCtrl.setRoot(HomePage)
  }

  uploadpicture()
  {
    let actionsheet = this.actionCtrl.create({
      title: 'Image Upload!',
      buttons: [{
        text: 'Upload From Gallery',
        handler: () => {
    this.gallery()
        },
      }
        ,
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
      this.UploadImage();
    }, (err) => {
    alert(err)
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
    this.UploadImage();
  }, (err) => {
    alert(err)
  })
}

  UploadImage(){
    alert("uploadImg fun..");
    alert(this.image);
    const filetransfers: FileTransferObject = this.filetransfer.create();
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'filename.jpg',
      chunkedMode: false,
      mimeType: "image/jpg",
      params: {
        'upload_preset': 'c5neyvgt'
      }
    }
  
    filetransfers.upload(this.image,'https://api.cloudinary.com/v1_1/dq9zfttmi/upload', options)
      .then((data) => {
        let imgProfile= JSON.parse(data.response).public_id
         alert("1="+JSON.stringify(data))
      }, (err) => {
          alert('error'+JSON.stringify(err))    
      })
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }
   
  getItems(ev)
  {
    if(ev.target.value !="")
    {
      this.flag=true;
      this.Srcres=true;
    }
    if(ev.target.value =="" || ev.target.value ==undefined) {
      this.flag=false; this.Srcres=false;
    }
    //document.getElementsByClassName("searchbar-search-icon").style.display="none";
  }

  InviteUserBtn()    {
    this.navCtrl.push(InvitesPage,{invitepublish:"invite",InviteProviderUser:"user"});
}
PublishAgentBtn(){
  this.navCtrl.push(BecomeagentPage);
}
ProviderBtn(){
  this.navCtrl.push(BecomeproviderPage);
}

ProfileBtn(){
  if(localStorage['ProviderUser']=="provider") {  this.navCtrl.push(ProfileproviderPage);  }
  if(localStorage['ProviderUser']=="user")     {  this.navCtrl.push(ProfilePage);          }
  if(localStorage['ProviderUser']=="agent")    {  this.navCtrl.push(ProfileagentPage);     }
}



}
