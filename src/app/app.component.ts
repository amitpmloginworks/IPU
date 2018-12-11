import { Component , ViewChild} from '@angular/core';
import { Platform , Nav, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Deeplinks } from '@ionic-native/deeplinks';

import { Http, Request, Response, Headers, RequestOptions, RequestMethod, HttpModule } from '@angular/http';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CodePage } from '../pages/code/code'; 
import { RegisterPage } from '../pages/register/register'; 
import { InvitesPage } from '../pages/invites/invites'; 
import { NotificationallPage } from '../pages/notificationall/notificationall'; 
import { BalancePage } from '../pages/balance/balance';   
import { InvitesecondPage } from '../pages/invitesecond/invitesecond'; 
import { InvitefirstPage } from '../pages/invitefirst/invitefirst';   
import { SettingPage } from '../pages/setting/setting';  
import { ProfilePage } from '../pages/profile/profile';  
import { ProfileproviderPage } from '../pages/profileprovider/profileprovider';    
import { CampaignPage } from '../pages/campaign/campaign';  
import { CampaigndetailPage } from '../pages/campaigndetail/campaigndetail';      
import { OfferPage } from '../pages/offer/offer';  
import { OfferSinglePage } from '../pages/offer-single/offer-single';  
import { ResetpasswordPage } from '../pages/resetpassword/resetpassword';  
import { BecomeproviderPage } from '../pages/becomeprovider/becomeprovider';   
import { BecomeagentPage } from '../pages/becomeagent/becomeagent';   
import { SearchservicePage } from '../pages/searchservice/searchservice';  
import { OfficeequipmentPage } from '../pages/officeequipment/officeequipment';    
import { SinglechatPage } from '../pages/singlechat/singlechat';   
import { AddfilterPage } from '../pages/addfilter/addfilter';  
import { DashboardPage } from '../pages/dashboard/dashboard';  
import { MyconnectionPage } from '../pages/myconnection/myconnection';  
import { MyconnectionpayPage } from '../pages/myconnectionpay/myconnectionpay';  
import { MyconnectionexpPage } from '../pages/myconnectionexp/myconnectionexp';   
import { ReviewsPage } from '../pages/reviews/reviews';  
import { NotificationPage } from '../pages/notification/notification';   
import { SocialfeedPage } from '../pages/socialfeed/socialfeed';  
import { ProvidertapPage } from '../pages/providertap/providertap';   
import { UserPage } from '../pages/user/user';  
import { UnregisteredPage } from '../pages/unregistered/unregistered'; 
import { NativeStorage } from '@ionic-native/native-storage';   
import { SearchproviderPage } from '../pages/searchprovider/searchprovider'; 

import { RegisterproviderPage } from '../pages/registerprovider/registerprovider'; 
import { RegisterpublishPage } from '../pages/registerpublish/registerpublish';  
import { RegistermainPage } from '../pages/registermain/registermain';    
import { RegprovidersrcPage } from '../pages/regprovidersrc/regprovidersrc'; 
import { HomeproviderPage } from '../pages/homeprovider/homeprovider'; 
import{ bigdata}from'../app/model'   
import{SecurityProvider}from'../providers/security/security'
import{Observable}from'rxjs/Rx'
import { Events, App } from 'ionic-angular';
import { ContactlistPage } from '../pages/contactlist/contactlist';  
import { ProfileagentPage } from '../pages/profileagent/profileagent';  
import { AgentfiltersPage } from '../pages/agentfilters/agentfilters'; 
import { CampaignaddPage } from '../pages/campaignadd/campaignadd'; 
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts'; 

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav)nav:Nav 
  @ViewChild(Nav) navChild:Nav;
  rootPage
  //rootPage:any = LoginPage;     
  provideruser  
  pages: Array<{title: string, component: any,logo:string,status:string}>;
  pages1: Array<{title: string, component: any,logo:string}>;
  ProviderStatus:boolean=false;
  UserStatus:boolean=false;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private nativeStorage: NativeStorage, public deeplinks: Deeplinks,public security:SecurityProvider,public bdata:bigdata, public toastCtrl:ToastController,public events: Events, private contacts: Contacts,public http: Http, public loadingCtrl: LoadingController, public alertCtrl: AlertController,public app: App) { 
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();  
  
  
	
     // setTimeout(() => {   splashScreen.hide();    }, 100);
      
      let env = this;

//this.nativeStorage.getItem('UserInfo').then(() => { this.rootPage=HomePage;	},() =>{ this.rootPage=LoginPage; }); 
  

platform.registerBackButtonAction(() => {
  let nav = this.app.getActiveNav();
  if (nav.canGoBack()){ //Can we go back?
      nav.pop();
  }else{
    let alert = this.alertCtrl.create({
      message: 'ARE YOU SURE YOU WANT TO EXIT THE APP',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Buy clicked');
          }
        },
        {
          text: 'Exit App',
          handler: () => {
            platform.exitApp(); 
          }
        }
      ]
    });
    alert.present();
  }
});  


    if(localStorage['username']==null || localStorage['username']==undefined) {  this.rootPage=LoginPage;    } 
    else  { 
      console.log("localStorage['ProviderUser'] ==",localStorage['ProviderUser'])
      this.provideruser=localStorage['ProviderUser']; 
      if(localStorage['ProviderUser']=="provider") {
        this.UserToServerData();  
        }
        if(localStorage['ProviderUser']=="user" || localStorage['ProviderUser']=="agent")    { 
          this.UserToServerData();
        }
        if(localStorage['ProviderUser']==null || localStorage['ProviderUser']==undefined) {  this.rootPage=LoginPage;  localStorage.clear();   } 
       }  
 
      //   AmitRajpoot  Admin@123  
 
      // https://office.loginworks.com/products/files/doceditor.aspx?fileid=12209&doc=Y2xLK1NsOFZwNTRDcS8zMUlMUmM0azROR3lDQURyTW1hVVFGM05jQnorUT0_IjEyMjA5Ig2

      //  doc       http://ipublishu.com:9009/docs/swagger-ui/index.html?url=/assets/swagger.json#!/routes/login

      // latest design  https://drive.google.com/file/d/1j_tJ5WfnpzQGhDNvCnhFiooj3mTSjFqs/view

      //  doc       https://xd.adobe.com/spec/9b795743-ac7f-4822-6cc5-dc6cbc09ecf7-ed48/

      //  new doc   https://xd.adobe.com/spec/4f0ea5d8-e3e1-499a-728b-e543570c0b30-393f/

      //  https://docs.google.com/document/d/12oqQkwmVUxA3HSIC9rYMwa9OoCC2TjE3NyYwBE1Es-Y/edit

      // https://docs.google.com/document/d/1BK6e5OEbYwloXno-1dNvjgELID-6dDaT7yCP07Hun1g/edit#

      
      this.events.subscribe('ProviderUser:datetimes', (user, time) => {
       console.log("event user="+user)  
       this.provideruser=user;  
     });   
  
      setTimeout(() => {   
       this.events.subscribe('ProviderUser:datetimes', (user, time) => {
         console.log("user=",user)  
        this.provideruser=user; 
        this.contactlist();     
if( user == 'provider'){ 
  this.ProviderStatus=true;
  this.UserStatus=false; 
  this.pages = [  
    // { title: 'Home', component:HomeproviderPage, logo:'assets/imgs/menuicons/home.png',status:this.provideruser},
    { title: 'Feed', component:SocialfeedPage, logo:'assets/imgs/menuicons/feed.png',status:this.provideruser}, 
    {title:'Dashboard',component:DashboardPage,logo:'assets/imgs/menuicons/dashboard.png',status:this.provideruser},
    { title: 'My Campaigns', component:CampaignPage, logo:'assets/imgs/menuicons/my_campaigns.png',status:this.provideruser},
    {title:'Profile',component:ProfileproviderPage,logo:'assets/imgs/menuicons/profile.png',status:this.provideruser},
    { title: 'My Connections', component:MyconnectionPage, logo:'assets/imgs/menuicons/my_connections.png',status:this.provideruser},
    { title: 'My Reviews', component:ReviewsPage, logo:'assets/imgs/menuicons/my_reviews.png',status:this.provideruser},
    { title: 'Settings', component:SettingPage, logo:'assets/imgs/menuicons/settings.png',status:this.provideruser},
  ];
}   

if( user=="agent"){
  this.UserStatus=true; 
  this.ProviderStatus=false; 
  this.pages = [ 
    // { title: 'Home', component:HomePage, logo:'assets/imgs/menuicons/home.png',status:this.provideruser},
    { title: 'Feed', component:SocialfeedPage, logo:'assets/imgs/menuicons/feed.png',status:this.provideruser},
    {title:'Search Provider',component:SearchservicePage,logo:'assets/imgs/menuicons/search_provider.png',status:this.provideruser},
    {title:'Dashboard',component:DashboardPage,logo:'assets/imgs/menuicons/dashboard.png',status:this.provideruser},
    { title: 'Offers', component:OfferPage, logo:'assets/imgs/menuicons/my_campaigns.png',status:this.provideruser },     
    {title:'Profile',component:ProfileagentPage,logo:'assets/imgs/menuicons/profile.png',status:this.provideruser}, 
    { title: 'My Connections', component:MyconnectionPage, logo:'assets/imgs/menuicons/my_connections.png',status:this.provideruser},
    { title: 'My Reviews', component:ReviewsPage, logo:'assets/imgs/menuicons/my_reviews.png',status:this.provideruser},
    { title: 'Settings', component:SettingPage, logo:'assets/imgs/menuicons/settings.png',status:this.provideruser},
  ];
}

if( user=="user"){ 
  this.UserStatus=true; 
  this.ProviderStatus=false;     
  this.pages = [ 
    // { title: 'Home', component:HomePage, logo:'assets/imgs/menuicons/home.png',status:this.provideruser},
    { title: 'Feed', component:SocialfeedPage, logo:'assets/imgs/menuicons/feed.png',status:this.provideruser},
    {title:'Search Provider',component:SearchservicePage,logo:'assets/imgs/menuicons/search_provider.png',status:this.provideruser},
    {title:'Dashboard',component:DashboardPage,logo:'assets/imgs/menuicons/dashboard.png',status:this.provideruser}, 
    {title:'Profile',component:ProfilePage,logo:'assets/imgs/menuicons/profile.png',status:this.provideruser},
    { title: 'My Connections', component:MyconnectionPage, logo:'assets/imgs/menuicons/my_connections.png',status:this.provideruser},
    { title: 'My Reviews', component:ReviewsPage, logo:'assets/imgs/menuicons/my_reviews.png',status:this.provideruser},
    { title: 'Settings', component:SettingPage, logo:'assets/imgs/menuicons/settings.png',status:this.provideruser},

  //  { title: 'Balance', component:BalancePage, logo:'assets/imgs/menuicons/my_reviews.png',status:this.provideruser},
  ];  
} 


        
      });

         this.navigationMenu(); 
         }, 2000);  
     

    });
  }

  navigationMenu(){

if(localStorage['ProviderUser'] == 'provider'){  
  this.ProviderStatus=true;
  this.UserStatus=false;   
      this.pages = [ 
        // { title: 'Home', component:HomeproviderPage, logo:'assets/imgs/menuicons/home.png',status:this.provideruser},
        { title: 'Feed', component:SocialfeedPage, logo:'assets/imgs/menuicons/feed.png',status:this.provideruser},  
        {title:'Dashboard',component:DashboardPage,logo:'assets/imgs/menuicons/dashboard.png',status:this.provideruser},
        { title: 'My Campaigns', component:CampaignPage, logo:'assets/imgs/menuicons/my_campaigns.png',status:this.provideruser},
        {title:'Profile',component:ProfileproviderPage,logo:'assets/imgs/menuicons/profile.png',status:this.provideruser},
        { title: 'My Connections', component:MyconnectionPage, logo:'assets/imgs/menuicons/my_connections.png',status:this.provideruser},
        { title: 'My Reviews', component:ReviewsPage, logo:'assets/imgs/menuicons/my_reviews.png',status:this.provideruser},
        { title: 'Settings', component:SettingPage, logo:'assets/imgs/menuicons/settings.png',status:this.provideruser}    
      ];
     this.contactlist();
    }   

    if(localStorage['ProviderUser']=="agent"){ 
      this.UserStatus=true;
      this.ProviderStatus=false;  
      this.pages = [ 
        // { title: 'Home', component:HomePage, logo:'assets/imgs/menuicons/home.png',status:this.provideruser},
        { title: 'Feed', component:SocialfeedPage, logo:'assets/imgs/menuicons/feed.png',status:this.provideruser},
        {title:'Search Provider',component:SearchservicePage,logo:'assets/imgs/menuicons/search_provider.png',status:this.provideruser},
        {title:'Dashboard',component:DashboardPage,logo:'assets/imgs/menuicons/dashboard.png',status:this.provideruser},
        { title: 'Offers', component:OfferPage, logo:'assets/imgs/menuicons/my_campaigns.png',status:this.provideruser },     
        {title:'Profile',component:ProfileagentPage,logo:'assets/imgs/menuicons/profile.png',status:this.provideruser}, 
        { title: 'My Connections', component:MyconnectionPage, logo:'assets/imgs/menuicons/my_connections.png',status:this.provideruser},
        { title: 'My Reviews', component:ReviewsPage, logo:'assets/imgs/menuicons/my_reviews.png',status:this.provideruser},
        { title: 'Settings', component:SettingPage, logo:'assets/imgs/menuicons/settings.png',status:this.provideruser},

      ];
      this.contactlist();
    }

    if(localStorage['ProviderUser']=="user"){ 
      this.UserStatus=true; 
      this.ProviderStatus=false;           
      this.pages = [ 
        // { title: 'Home', component:HomePage, logo:'assets/imgs/menuicons/home.png',status:this.provideruser},
        { title: 'Feed', component:SocialfeedPage, logo:'assets/imgs/menuicons/feed.png',status:this.provideruser},
        {title:'Search Provider',component:SearchservicePage,logo:'assets/imgs/menuicons/search_provider.png',status:this.provideruser},
        {title:'Dashboard',component:DashboardPage,logo:'assets/imgs/menuicons/dashboard.png',status:this.provideruser}, 
        {title:'Profile',component:ProfilePage,logo:'assets/imgs/menuicons/profile.png',status:this.provideruser},
        { title: 'My Connections', component:MyconnectionPage, logo:'assets/imgs/menuicons/my_connections.png',status:this.provideruser},
        { title: 'My Reviews', component:ReviewsPage, logo:'assets/imgs/menuicons/my_reviews.png',status:this.provideruser},
        { title: 'Settings', component:SettingPage, logo:'assets/imgs/menuicons/settings.png',status:this.provideruser},
       // { title: 'Balance', component:BalancePage, logo:'assets/imgs/menuicons/my_reviews.png',status:this.provideruser},
      ];  
      this.contactlist();
    } 
  }

  contactlist(){  
                 
          
    this.contacts.find(['displayName','phoneNumbers'], {filter: "", multiple: true})
    .then(data => {    
      let count=0; 
      let ContactsArr=[];   
        for(let i=0; i<data.length;i++){  
        if(count==i)
        {
          if(data[i].phoneNumbers != null){
            ContactsArr.push({ "phone": data[i].phoneNumbers[0].value,"full_name": data[i].displayName });
          }
      }
      count=count+1;
      }   
      ContactsArr=ContactsArr.filter((item) => { 
        var regex = new RegExp("\\?", "g"); 
       return (!regex.test(item.full_name));   
       })    
       ContactsArr=ContactsArr.filter((item) => { return item.full_name;  }) 
       ContactsArr=ContactsArr.filter((item) => { 
        var regex = new RegExp("/[^0-9]/g", "g");   
       return (!regex.test(item.full_name));      
       }) 
       ContactsArr=ContactsArr.filter((item) => { 
         var patt1 = /[1-9]/g; 
        return !item.full_name.match(patt1);
      }) 
    ContactsArr=ContactsArr.filter((item) => { 
       var patt1 = /^[a-zA-Z0-9_ ]*$/; 
       return patt1.test(item.full_name);  
       })    
      this.security.ConnectionsMobDb(ContactsArr).subscribe(result1 => { 
        if(result1==true){  console.log("contact Success==", result1);    }
        if(result1==false){    } 
      }, err => {  
      });
      },err =>{    
        }); 
    
   



//       this.diagnostic.isContactsAuthorized()
//   .then((state) => {
//     if (state){
//       // Call your Contacts Code
//     } else {
//       // do something else
//     }  // https://forum.ionicframework.com/t/ionic-native-contacts-are-not-working/100707/30
// }).catch(e => console.error(e));
     

  }

  openPage(p){   
    if(p.title == 'Search Provider'){
      this.nav.setRoot(p.component); 
      return;
    }
    this.nav.push(p.component);   
  }

  HomeProvider(){  this.nav.setRoot(HomeproviderPage);     }

  HomeUser(){      this.nav.setRoot(HomePage);     }

  logout()  { 
    localStorage.clear(); 
    this.provideruser="";  
    this.nav.setRoot(LoginPage);  
    }

  OffersAgent()   {  this.nav.push(OfferPage);    }

  CampaignProvider()   {  this.nav.push(CampaignPage);    }  

  UserToServerData(){  
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present(); 
    this.security.UserViews().subscribe(result1 => { 
      loading.dismiss();   
      if (result1 === false) { 
        this.toastCtrl.create({ message: `No record found!`, duration: 4000, position: 'top' }).present(); return;
        } else {   
          if(localStorage['ProviderUser']=="provider") {
            this.bdata.UserData=result1;
            this.bdata.UserDataPublish=result1.publish_clicks; 
            this.rootPage=HomeproviderPage;                
            return;  
          }
          if(localStorage['ProviderUser']=="user" || localStorage['ProviderUser']=="agent") {
            this.bdata.UserData=result1;
            this.bdata.UserDataPublish=result1.publish_clicks;  
            this.rootPage=HomePage;    
            return;
          }         
       }
    }, err => {
      loading.dismiss(); 
      this.rootPage=LoginPage;  
      this.toastCtrl.create({ message: `No internet connection,Please try again!`, duration: 4000, position: 'top' }).present(); return;
    }); 
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Oops, your internet connection seems to be off',
      message: 'Keep calm and tap to retry once your internet is back',
      buttons: [
        {
          text: 'Retry',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }



}

