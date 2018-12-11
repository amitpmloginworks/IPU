import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController ,ActionSheetController, AlertController} from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx'

import { SocialSharing } from '@ionic-native/social-sharing';
import { ContactlistPage } from '../contactlist/contactlist'; 
import { ProfilePage } from '../profile/profile';  
import { ProfileproviderPage } from '../profileprovider/profileprovider'; 
import { ProfileagentPage } from '../profileagent/profileagent';     

/**
 * Generated class for the InvitesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invites',
  templateUrl: 'invites.html',
})
export class InvitesPage {  
  invitepublish
  headertxt
  inviteuser:boolean=false;
  inviteprovider:boolean=false;
  InviteProviderUser; 
  btntext
  publishs:boolean=false;  

  NgInviteUser
  NgInviteAgent
  NgInviteProvider
  Username

  PublishBtnTxt:any="";
  ProviderID:any="";
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController, public loadingCtrl:LoadingController,public http:Http,public security:SecurityProvider,public actionCtrl:ActionSheetController,public alertCtrl:AlertController,public socialSharing:SocialSharing) {
    this.Username=localStorage['username']
  
    this.invitepublish= this.navParams.get('invitepublish');
   // this.invitepublish= "publish";
    if(this.invitepublish=="invite")  
    {
      this.InviteProviderUser=this.navParams.get('InviteProviderUser');
     //this.InviteProviderUser="provider";
      this.btntext="SEND INVITE";
      if(this.InviteProviderUser=="provider") { 
         this.headertxt="Invite a provider";this.inviteprovider=true;
         this.InviteProvider();
      }
      if(this.InviteProviderUser=="user") { 
         this.headertxt="Invite a user";this.inviteuser=true
         this.InviteUser();
    }
    }

    if(this.invitepublish=="publish")
    {
      this.ProviderID=this.navParams.get('providerId')   
      this.PublishBtnTxt=this.navParams.get('ButtonTxt')
      if(this.PublishBtnTxt !="") {
        this.headertxt="PUBLISH "+this.Username; 
        this.btntext="INVITE";     
        this.publishs=true
        this.PublishProvider(); 
      }  
     else {
      this.headertxt="PUBLISH "+this.Username; 
      this.btntext="PUBLISH"; 
      this.publishs=true
      this.InviteAgent();
      } 
      
    }
   


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitesPage');
  }

  InviteUser()
  { 
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present(); 
    this.security.UserViews().subscribe(result => {
        loading.dismiss()
        if(result !=false){
         console.log(result);
         let linkc="http://www.ipublishu.com/signup?action=invite_user&referral="+result._id+"&type=User"; 
        let InviteUserTxt= result.messages.invite_user.replace("[link]",linkc);
         this.NgInviteUser=InviteUserTxt; 
        }
    }, err => {
      console.log("err", err);
      loading.dismiss()
      this.toastCtrl.create({ message: `Please Enter Valid credentials!`, duration: 4000, position: 'top' }).present(); return;
    });
  }

  InviteProvider() {
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present(); 
    this.security.UserViews().subscribe(result => {
        loading.dismiss()
        if(result !=false){
         console.log(result);
          let fullname="["+result.name+" "+result.lastname+"]";
          let linkShare="http://www.ipublishu.com/signup?action=invite_provider&type=Provider&referral="+result._id;
          let InviteUserTxtLink= result.messages.invite_provider.replace("[name]",fullname);
          let InviteUserTxt= InviteUserTxtLink.replace("[link]",linkShare);
          let UserName=result._id;  
          this.NgInviteProvider=InviteUserTxt+UserName;
        }
    }, err => {
      console.log("err", err);
      loading.dismiss()
      this.toastCtrl.create({ message: `Please Enter Valid credentials!`, duration: 4000, position: 'top' }).present(); return;
    });
  }

  InviteAgent() {
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present(); 
    this.security.UserViews().subscribe(result => {
        loading.dismiss()
        if(result !=false){
          console.log(result);
          let UserName=result._id;  
          let linkShare="http://www.ipublishu.com/signup?action=invite_provider&type=Provider&referral="+this.ProviderID;
          let inviteMsg= result.messages.publish_provider.replace("[name]",this.ProviderID);
          let InviteUserTxt= inviteMsg.replace("[link]",linkShare);  
           
          this.NgInviteAgent=InviteUserTxt; 
        }
    }, err => {
      console.log("err", err);
      loading.dismiss()
      this.toastCtrl.create({ message: `Please Enter Valid credentials!`, duration: 4000, position: 'top' }).present(); return;
    });
  }

PublishProvider() {
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present(); 
    this.security.UserViews().subscribe(result => {
        loading.dismiss()
        if(result !=false){
          console.log(result);
          let linkShare="http://www.ipublishu.com/signup?action=invite_provider&type=Provider&referral="+result._id;
          let InviteUserTxt= result.messages.invite_provider.replace("[link]",linkShare);
          let UserName=result._id;  
          this.NgInviteAgent=InviteUserTxt; 
        }
    }, err => {
      console.log("err", err);
      loading.dismiss()
      this.toastCtrl.create({ message: `Please Enter Valid credentials!`, duration: 4000, position: 'top' }).present(); return;
    });
  }

  copyTextBtn(referenceText){
    if(!referenceText || 0 === referenceText.length){
    console.log('if')
    this.toastCtrl.create({ message: `Please Enter Text`, duration: 4000, position: 'bottom' }).present();
    }
    else{ 
    console.log('else') 
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = referenceText;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    referenceText=''
    this.toastCtrl.create({ message: `Copied`, duration: 4000, position: 'top' }).present();
    }
  }


  InviteBtn(InvitesTxt){ 
      this.security.inviteUserView(this.Username).subscribe(result => {
        if(result !=false){
         // if(this.inviteuser==true){this.navCtrl.push(ContactlistPage,{InvitesTxt:InvitesTxt}); }
          this.socialSharing.share(InvitesTxt)
          .then(() => {    }).catch(() => {  
            this.toastCtrl.create({ message: `Please try again.`, duration: 6000, position: 'top' }).present(); return;   
           });
           }
      }, err => { 
        this.toastCtrl.create({ message: `No internet connection,Please try again.`, duration: 6000, position: 'top' }).present(); return;  
        });

  /*
    let actionsheet=this.actionCtrl.create({
      title: 'Send Invite',
          buttons: [{
            text: 'Send via phone',
            handler: () => {
            this.SendViaPhone(InvitesTxt)
            },
          },
          {
            text: 'Send via Email',
            handler: () => {
              this.SendViaEmail(InvitesTxt)
            }}
        ]
      })
      actionsheet.present()
  */
 
  }

  SendViaPhone(InvitesTxt){
    let alert = this.alertCtrl.create({
      title: 'Enter phone number',
      inputs: [  {   name: 'username', type:'number',  placeholder: 'Please enter your phone...'  }  ],
      buttons: [ {   text: 'Cancel',    role: 'cancel',   handler: data => {  console.log('Cancel clicked');  } },
        {
          text: 'Submit',
          handler: data => {
           if(data.username=="") {
            this.toastCtrl.create({ message: `Mobile number is required.`, duration: 4000, position: 'top' }).present(); return;
            }
              this.SendToInvite(InvitesTxt,"EMAIL",data.username);
          }
        }
      ],
      enableBackdropDismiss: false
    });
    alert.present();
  }

  SendViaEmail(InvitesTxt){
 let alert = this.alertCtrl.create({
      title: 'Enter email ID',
      inputs: [  {   name: 'username', type:'email', placeholder: 'Please enter your email...'  }  ],
      buttons: [ {   text: 'Cancel',    role: 'cancel',   handler: data => {  console.log('Cancel clicked');  } },
        {
          text: 'Submit',
          handler: data => {
           if(data.username=="") {
            this.toastCtrl.create({ message: `Email is required.`, duration: 4000, position: 'top' }).present(); return;
            }
              this.SendToInvite(InvitesTxt,"SMS",data.username);
          }
        }
      ],
      enableBackdropDismiss: false
    });
    alert.present();
  }

  SendToInvite(InvitesTxt,destinationType,destination){
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present();  
    this.security.inviteUser(InvitesTxt,destinationType,destination).subscribe(result => {
        loading.dismiss()
        console.log(result);
        if(result==true){
          this.toastCtrl.create({ message: `Message sent successfully.`, duration: 6000, position: 'top' }).present(); return;
        }
        else{
          this.toastCtrl.create({ message: `Try again.`, duration: 6000, position: 'top' }).present(); return;
        }
         
    }, err => {
      console.log("err", err);
      loading.dismiss()
      this.toastCtrl.create({ message: `Please Enter Valid credentials!`, duration: 4000, position: 'top' }).present(); return;
    });
  }

  ProfileBtn(){
    if(localStorage['ProviderUser']=="provider") {  this.navCtrl.push(ProfileproviderPage);  }
    if(localStorage['ProviderUser']=="user")     {  this.navCtrl.push(ProfilePage);          }
    if(localStorage['ProviderUser']=="agent")    {  this.navCtrl.push(ProfileagentPage);     }
  }



}
