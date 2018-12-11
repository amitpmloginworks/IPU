import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, LoadingController, AlertController , Events } from 'ionic-angular';  
import { HomePage } from '../home/home';
import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx'
import { HomeproviderPage } from '../homeprovider/homeprovider'; 
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import{ bigdata}from'../../app/model'


/**
 * Generated class for the CodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-code',
  templateUrl: 'code.html',
})
export class CodePage { 
  OTPCode
  FirstName
  LastName
  email
  Password
  MobileNo
  Username
  ProfessionArr=[];
  CategoryArr=[];
 
  longitude:number=0;
  latitude:number=0;
  Website
  Address
  MobileNoWithoutCode
  OnlyCode
  services:any="";
  referral:any="";
  types

  sex 
  birthday
   family_status
    no_children
     household_income
     connectionArr
     ImgUpload
  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController ,public toastCtrl:ToastController, public loadingCtrl:LoadingController,public http:Http,public security:SecurityProvider,public alertCtrl:AlertController,public events: Events,public filetransfer: FileTransfer,private camera: Camera,public bdata:bigdata) {
    this.connectionArr=[];

    this.ImgUpload=this.navParams.get("ImgUpload"); 
   this.FirstName=this.navParams.get("FirstName"); 
    this.LastName=this.navParams.get("LastName");
      this.email=this.navParams.get("email");
      this.Password=this.navParams.get("Password");
     this.MobileNo=this.navParams.get("MobileNo");
      this.Username=this.navParams.get("Username");
      this.ProfessionArr=this.navParams.get("ProfessionArr");
      this.CategoryArr=this.navParams.get("CategoryArr");
      this.Website=this.navParams.get("Website");
      this.Address=this.navParams.get("Address");
      this.latitude=this.navParams.get("latitude");
      this.longitude=this.navParams.get("longitude");
      this.types=this.navParams.get("types");  
  
      this.OnlyCode = this.MobileNo.substring(0,2);       
      this.MobileNoWithoutCode = this.MobileNo.replace(this.OnlyCode.trim()," ");
      localStorage['latitude']= this.latitude
      localStorage['longitude']= this.longitude
      this.services= this.navParams.get("ServiceList"); 
      this.sex=this.navParams.get("MaleFemale"); 
      this.birthday=this.navParams.get("Age"); 
      this.family_status=this.navParams.get("Family"); 
      this.no_children=this.navParams.get("Kids");  
      this.household_income=this.navParams.get("Household"); 

      let fullname=this.FirstName+" "+this.LastName;
      this.connectionArr.push({phone:this.MobileNo,full_name:fullname})
      console.log("this.types=",this.types) 
  }


  MobCheck(vale)  { 
  if(vale.length==6) 
  {
    return false;
  }
}

  GotoNext()  {  
    if(this.OTPCode == "" || this.OTPCode == undefined ) {
      this.toastCtrl.create({ message: `OTP is required.`, duration: 6000, position: 'top' }).present(); return;
    } 
    if(this.OTPCode.length < 6 ) {
      this.toastCtrl.create({ message: `OTP is required.`, duration: 6000, position: 'top' }).present(); return;
    } 
  
    if(this.types=="registerPublishAgent"){
      this.SendToPublishAgent();  
      return;
    } 
    if(this.types=="register"){
          this.RegisterPopup();
      return;
    }
    if(this.types=="registerProvider"){ 
      this.SendToProvider();  
      return;
    }
  }

  RegisterPopup()
  {
    let alert = this.alertCtrl.create({
      title: 'Enter Referral',
      inputs: [  {   name: 'username',     placeholder: 'Enter Referral'  }  ],
      buttons: [ {   text: 'Cancel',    role: 'cancel',   handler: data => {  console.log('Cancel clicked');  } },
        {
          text: 'Submit',
          handler: data => {
           if(data.username=="") {
            this.toastCtrl.create({ message: `Referral is required.`, duration: 4000, position: 'top' }).present(); return false;
            }
              this.SendToRegister(data.username);
          }
        }
      ],
      enableBackdropDismiss: false
    });
    alert.present();
  }

  SendToRegister(referral) 
  { 
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present(); 
    this.security.register(this.OTPCode,this.Username, this.Password,this.FirstName, this.LastName,this.email,  referral).subscribe(result => {
        
        console.log(result);
        if(result.status==1){
          localStorage["token"]=result.res.token;
          localStorage['username']=this.Username;
          localStorage['password']=this.Password; 

          this.security.ConnectionsMobDb(this.connectionArr).subscribe(result1 => {
            loading.dismiss()    
            if(result1==true){
              localStorage['ProviderUser']="user"
              this.events.publish('ProviderUser:datetimes',"user", Date.now()); 
              this.navCtrl.setRoot(HomePage); 
            }
            if(result1==false){
              this.toastCtrl.create({ message: `Internal server error, please try again.`, duration: 4000, position: 'top' }).present(); return;
            }
        }, err => {
          console.log("err", err);
          loading.dismiss()
          this.toastCtrl.create({ message: `No internet connection, please try again.`, duration: 4000, position: 'top' }).present(); return;
        });

        }
        if(result.status==2){
          loading.dismiss()
          this.toastCtrl.create({ message: `Username taken!`, duration: 6000, position: 'top' }).present(); return;
        }
        if(result.status==3){
          loading.dismiss()
          this.toastCtrl.create({ message: `Referral must be a valid user!`, duration: 6000, position: 'top' }).present(); return;
        }
        if(result.status==4){
          loading.dismiss() 
          this.toastCtrl.create({ message: `Please Enter Valid credentials!`, duration: 6000, position: 'top' }).present(); return;
        }
    }, err => {
      console.log("err", err);
      loading.dismiss()
      this.toastCtrl.create({ message: `Please Enter Valid credentials!`, duration: 4000, position: 'top' }).present(); return;
    });
  }
  SendToProvider()  {
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present(); 
    this.security.registerProvider(this.OTPCode,this.Username, this.Password,this.FirstName, this.LastName,this.email, this.ProfessionArr,this.CategoryArr, this.services,this.MobileNo, this.Website,this.Address, this.referral,this.longitude, this.latitude).subscribe(result => {  
        if(result.status==1){
          loading.dismiss()  
          localStorage["token"]=result.res.token;
          localStorage['username']=this.Username;
          localStorage['password']=this.Password;

          let loading1=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
          loading1.present(); 
          this.security.ConnectionsMobDb(this.connectionArr).subscribe(result1 => {   
            if(result1==true){  
              let filename = this.ImgUpload.split('/').pop();
              const filetransfers: FileTransferObject = this.filetransfer.create();
              let options: FileUploadOptions = {
              fileKey: 'file',
              fileName: filename,
              chunkedMode: false,
              mimeType: "multipart/form-data",
              params: { 'upload_preset': 'c5neyvgt' }  
            }
            filetransfers.upload(this.ImgUpload,'https://api.cloudinary.com/v1_1/dq9zfttmi/upload', options)
              .then((data) => {
                let imgProfile= JSON.parse(data.response).public_id
                this.security.Images(localStorage["username"],localStorage["token"],imgProfile).subscribe(result2 => { 
                 if(result2==true){ 
                  loading1.dismiss()  
                   }
                 if(result2==false){    loading1.dismiss();     }
             }, err => { loading1.dismiss();   });
             }, (err) => {  loading1.dismiss();    })

               }
            if(result1==false){ loading1.dismiss();   }
        }, err => {
          console.log("err", err);
          loading1.dismiss(); 
        });

        
        this.events.publish('ProviderUser:datetimes',"provider", Date.now()); 
        localStorage['ProviderUser']="provider" 

        this.security.UserViews().subscribe(result1 => {   
          if (result1 === false) {     } 
          else { 
              if(localStorage['ProviderUser']=="provider") {
                this.bdata.UserData=result1;
                this.bdata.UserDataPublish=result1.publish_clicks;                
              }
              if(localStorage['ProviderUser']=="user" || localStorage['ProviderUser']=="agent") {
                this.bdata.UserData=result1;
                this.bdata.UserDataPublish=result1.publish_clicks;  
              }         
           }
        }, err => {    }); 
        this.navCtrl.setRoot(HomeproviderPage); 

        }
        if(result.status==2){ 
          loading.dismiss() 
          this.toastCtrl.create({ message: `Username taken!`, duration: 6000, position: 'top' }).present(); return;
        }
        if(result.status==3){
          loading.dismiss() 
          this.toastCtrl.create({ message: `Referral must be a valid user!`, duration: 6000, position: 'top' }).present(); return;
        }
        if(result.status==4){
          loading.dismiss() 
          if(result.res==409){ 
            this.toastCtrl.create({ message: `Username taken!`, duration: 6000, position: 'top' }).present(); return;
          }
          if(result.res==406){
            this.toastCtrl.create({ message: `Referral must be a valid user!`, duration: 6000, position: 'top' }).present(); return;
          }
          else{
            this.toastCtrl.create({ message: `Please Enter Valid credentials!`, duration: 6000, position: 'top' }).present(); return;
          }
          
        }
    }, err => {
      console.log("err", err);
      loading.dismiss()
      this.toastCtrl.create({ message: `Please Enter Valid credentials!`, duration: 4000, position: 'top' }).present(); return;
    });
  }


  SendToPublishAgent(){
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present(); 
    this.security.registerPublishAgent(this.OTPCode,this.Username, this.Password,this.FirstName, this.LastName,this.email, this.sex,this.birthday, this.family_status,this.no_children, this.household_income,this.MobileNo,this.Address, this.referral,this.longitude, this.latitude).subscribe(result => {
       
        if(result.status==1){
          loading.dismiss()
          localStorage["token"]=result.res.token;
          localStorage['username']=this.Username;
          localStorage['password']=this.Password; 

          this.events.publish('ProviderUser:datetimes',"agent", Date.now()); 
          localStorage['ProviderUser']="agent"; 

          let loading1=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
          loading1.present(); 
          this.security.ConnectionsMobDb(this.connectionArr).subscribe(result1 => {
            loading.dismiss()    
            if(result1==true){ 
           
              let filename = this.ImgUpload.split('/').pop();
              const filetransfers: FileTransferObject = this.filetransfer.create();
              let options: FileUploadOptions = {
              fileKey: 'file',
              fileName: filename,
              chunkedMode: false,
              mimeType: "multipart/form-data",
              params: { 'upload_preset': 'c5neyvgt' }  
            } 
            filetransfers.upload(this.ImgUpload,'https://api.cloudinary.com/v1_1/dq9zfttmi/upload', options)
              .then((data) => {
                let imgProfile= JSON.parse(data.response).public_id
                this.security.Images(localStorage["username"],localStorage["token"],imgProfile).subscribe(result2 => {
                 if(result2==true){     loading1.dismiss() 
                }
                 if(result2==false){    loading1.dismiss()  }
             }, err => {     loading1.dismiss()  });
             }, (err) => {     loading1.dismiss()  })

               }
            if(result1==false){     loading1.dismiss()   }
        }, err => {  console.log("err", err);    loading1.dismiss()   });
         

        this.security.UserViews().subscribe(result1 => {   
          if (result1 === false) {     } 
          else { 
              if(localStorage['ProviderUser']=="provider") { 
                this.bdata.UserData=result1;
                this.bdata.UserDataPublish=result1.publish_clicks;                
              }
              if(localStorage['ProviderUser']=="user" || localStorage['ProviderUser']=="agent") {
                this.bdata.UserData=result1;
                this.bdata.UserDataPublish=result1.publish_clicks;  
              }         
           }
        }, err => {    }); 
 
                       
        this.navCtrl.setRoot(HomePage); 

        }
        if(result.status==2){
          loading.dismiss()
          this.toastCtrl.create({ message: `Username taken!`, duration: 6000, position: 'top' }).present(); return;
        }
        if(result.status==3){
          loading.dismiss()
          this.toastCtrl.create({ message: `Referral must be a valid user!`, duration: 6000, position: 'top' }).present(); return;
        }
        if(result.status==4){
          loading.dismiss()
          this.toastCtrl.create({ message: `Please Enter Valid credentials!`, duration: 6000, position: 'top' }).present(); return;
        }
    }, err => {
      console.log("err", err);
      loading.dismiss()
      this.toastCtrl.create({ message: `Please Enter Valid credentials!`, duration: 4000, position: 'top' }).present(); return;
    });
  }



  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewWillLeave() {
    this.menu.swipeEnable(true);
   } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad CodePage');
  }

}
