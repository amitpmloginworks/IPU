import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController , ToastController, LoadingController, AlertController } from 'ionic-angular';
import { ResetpasswordPage } from '../resetpassword/resetpassword';  
import { RegisterPage } from '../register/register'; 
import { HomePage } from '../home/home';
import { GooglePlus } from '@ionic-native/google-plus';
import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx'
import { RegistermainPage } from '../registermain/registermain'; 
import { SocialSharing } from '@ionic-native/social-sharing';
import { AuthService, SocialUser, GoogleLoginProvider } from "angular4-social-login";
import{ bigdata}from'../../app/model'
import { HomeproviderPage } from '../homeprovider/homeprovider'; 
import { Events } from 'ionic-angular';  

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage { 
  UserEmail 
  UserFirstName 
  UserLastName 
  UserImgUrl
  password



  // constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController, private googlePlus: GooglePlus, public toastCtrl:ToastController,public loadingCtrl: LoadingController,public http:Http,public security:SecurityProvider,public alertCtrl:AlertController,public socialSharing:SocialSharing,private googleAuthService: AuthService) 
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController, private googlePlus: GooglePlus, public toastCtrl:ToastController,public loadingCtrl: LoadingController,public http:Http,public security:SecurityProvider,public alertCtrl:AlertController,public socialSharing:SocialSharing,
    private googleAuthService: AuthService,public bdata:bigdata,public events: Events) {

  }

  
  shareItem(item) {
    this.socialSharing.share("Check this item:  IPublishU://home/register/12")
    .then(() => {
    })
    .catch(() => {
    });
  }


  resetpass(){
    let alert = this.alertCtrl.create({
      title: 'Forget Password',
      inputs: [
        {
          name: 'username',
          placeholder: 'Enter Username'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
            console.log(data);
            if(data.username=="")
            {
              this.toastCtrl.create({ message: `Username is required.`, duration: 4000, position: 'top' }).present(); return;
            }
            else{ 
              let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
              loading.present();    
                 this.security.sendOtp("","password",data.username).subscribe(result => {
                  //this.navCtrl.setRoot(ResetpasswordPage);
                   if (result === true) {
                     loading.dismiss();
                        this.navCtrl.setRoot(ResetpasswordPage,{username:data.username });
                   } else {
                     loading.dismiss()
                     this.toastCtrl.create({ message: `Please Enter Valid credentials!`, duration: 4000, position: 'top' }).present(); return;
                   }
                 }, err => {
                   console.log("err", err);
                   loading.dismiss()
                   this.toastCtrl.create({ message: `Please Enter valid credentials!!`, duration: 4000, position: 'top' }).present(); return;
                 });
            
            }
          }
        }
      ],
      enableBackdropDismiss: false
    });
    alert.present();
   
  }


  GotoNext(username,password){
    if(username=="" || username==undefined){
      this.toastCtrl.create({ message: `Username is required.`, duration: 6000, position: 'top' }).present();
       return;
    }
    if(password=="" || password==undefined){
      this.toastCtrl.create({ message: `Password is required.`, duration: 6000, position: 'top' }).present();
       return;
    }
    /*
    if(password.length<6){
      this.toastCtrl.create({ message: `Password must be atleast 6 characters longer. It must contain at least 1 lowercase alphabet, 1 uppercase alphabet, 1 number and 1 special character.`, duration: 6000, position: 'top' }).present();
       return;
    }
    if(!this.validateForm(password)){
      this.toastCtrl.create({ message: `Password must be atleast 6 characters longer. It must contain at least 1 lowercase alphabet, 1 uppercase alphabet, 1 number and 1 special character.`, duration: 6000, position: 'top' }).present();
       return;
    }
*/
 let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
 loading.present();    
    this.security.login(username,password).subscribe(result => {
      if (result === true) {

        this.security.UserViews().subscribe(result1 => {  
          loading.dismiss()
             //this.security.providerLogin(localStorage.username, localStorage.token, params.referral).subscribe(res => {   });   
          if (result1 === false) { 
            this.toastCtrl.create({ message: `No record found!`, duration: 4000, position: 'top' }).present(); return;
            } else {  
            this.bdata.UserData=result1;  
            console.log("providing==",result1.providing);
            console.log("else 1"); 
            if(result1.publishagent !=undefined ) { 
              console.log("agent")   
              this.events.publish('ProviderUser:datetimes',"agent", Date.now()); 
                localStorage['ProviderUser']="agent"; 
                this.toastCtrl.create({ message: `Login successfully!`, duration: 4000, position: 'top' }).present(); 
                this.navCtrl.setRoot(HomePage);
                return;
            }

            if(result1.providing ==undefined ){ 
              console.log("user");   
              this.events.publish('ProviderUser:datetimes',"user", Date.now()); 
              localStorage['ProviderUser']="user";
              this.toastCtrl.create({ message: `Login successfully!`, duration: 4000, position: 'top' }).present(); 
              this.navCtrl.setRoot(HomePage);
              return;
            }
            if(result1.providing !=undefined ) { 
              this.events.publish('ProviderUser:datetimes',"provider", Date.now()); 
                localStorage['ProviderUser']="provider"; 
                this.toastCtrl.create({ message: `Login successfully!`, duration: 4000, position: 'top' }).present(); 
                this.navCtrl.setRoot(HomeproviderPage);
                return;
            }  
           }
        }, err => {
          this.toastCtrl.create({ message: `Please try again!`, duration: 4000, position: 'top' }).present(); return;
        });  
        
        
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

  validateForm(str){
    var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
    return re.test(str);
  }


  register(){
    this.navCtrl.push(RegistermainPage,{SocialLog:"0"});
  }

  register1(){
    this.navCtrl.push(RegisterPage,{SocialLog:"0",types:"register"});  
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }


  ionViewWillLeave() {
    this.menu.swipeEnable(true);
   } 

   GoogleLogin() {
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present();    
    this.googlePlus.login({})
      .then(res => {
        loading.dismiss()
        console.log("Google response=",res)
        alert(JSON.stringify(res));
        this.UserEmail=res.email;
        this.UserFirstName=res.givenName;
        this.UserLastName=res.familyName;
        this.UserImgUrl=res.imageUrl;
        this.security.googlelogin(res.email,res.accessToken).subscribe(result => {
          console.log("api resonse==",result);
            alert(JSON.stringify(result));
        }, err => {
          console.log("err", err);
          loading.dismiss()
          alert(JSON.stringify(err));
          this.toastCtrl.create({ message: err, duration: 4000, position: 'top' }).present(); return;
        });
       // this.navCtrl.push(RegisterPage,{SocialLog:"1",UserEmail:this.UserEmail,UserFirstName:this.UserFirstName,UserLastName:this.UserLastName,UserImgUrl:this.UserImgUrl});
      })
      .catch(err => {
        loading.dismiss()
        this.toastCtrl.create({ message: `Please try again !`, duration: 4000, position: 'top' }).present(); return;
       } );
  }
  

   GooglePlusLogin() {
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present();    
    //let loading=this.loadingCtrl.create({content:'Please Wait..'})
    this.googlePlus.login({})
      .then(res => {
        loading.dismiss()
        this.UserEmail=res.email;
        this.UserFirstName=res.givenName;
        this.UserLastName=res.familyName;
        this.UserImgUrl=res.imageUrl;
        this.navCtrl.push(RegisterPage,{SocialLog:"1",UserEmail:this.UserEmail,UserFirstName:this.UserFirstName,UserLastName:this.UserLastName,UserImgUrl:this.UserImgUrl});
      })
      .catch(err => {
        loading.dismiss()
        this.toastCtrl.create({ message: `Please try again !`, duration: 4000, position: 'top' }).present(); return;
       } );
  }


  signInWithGoogle() {
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present(); 
    this.googleAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.googleAuthService.authState.subscribe((user) => {
      alert("user=="+JSON.stringify(user));
      loading.dismiss()
      if (user != null) {
        alert("google authToken=="+user.authToken);
        alert("google email=="+user.email);
       let loading1=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
       loading1.present(); 
        this.security.googlelogin(user.email,user.authToken).subscribe(result => {
          loading1.dismiss()
          alert("result=="+JSON.stringify(result));
          this.toastCtrl.create({ message: 'Successfully logged in.', duration: 4000, position: 'top' }).present(); 
          
          return;
       }, err => {
          loading1.dismiss()
         this.toastCtrl.create({ message: 'Please login with valid credentials!', duration: 4000, position: 'top' }).present(); return;
        });
        this.googleAuthService.signOut();
      }
    },err =>{ loading.dismiss()
      this.toastCtrl.create({ message: 'Please login with valid credentials!', duration: 4000, position: 'top' }).present(); return;});
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }





}
