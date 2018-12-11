import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from '@ionic-native/native-storage'; 
import { HttpModule } from '@angular/http'; 
import {RlTagInputModule} from 'angular2-tag-input';
import { AgmCoreModule } from '@agm/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Deeplinks } from '@ionic-native/deeplinks';
import { GoogleLoginProvider, AuthServiceConfig } from "angular4-social-login"; 
import { AuthService } from 'angular4-social-login';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Contacts } from '@ionic-native/contacts';

import { MyApp } from './app.component';  
import{ bigdata}from './model'


import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login'; 
import { CodePage } from '../pages/code/code'; 
import { RegisterPage } from '../pages/register/register'; 
import { InvitesPage } from '../pages/invites/invites'; 
import { NotificationallPage } from '../pages/notificationall/notificationall'; 
import { BalancePage } from '../pages/balance/balance';  
import { InvitefirstPage } from '../pages/invitefirst/invitefirst'; 
import { InvitesecondPage } from '../pages/invitesecond/invitesecond'; 
import { SettingPage } from '../pages/setting/setting'; 
import { ProfilePage } from '../pages/profile/profile'; 
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
import { QuicksearchmodalPage } from '../pages/quicksearchmodal/quicksearchmodal'; 
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
import { SecurityProvider } from '../providers/security/security'; 
import { SearchproviderPage } from '../pages/searchprovider/searchprovider';   
import { RegisterproviderPage } from '../pages/registerprovider/registerprovider'; 
import { RegisterpublishPage } from '../pages/registerpublish/registerpublish';  
import { RegistermainPage } from '../pages/registermain/registermain';
import { RegprovidersrcPage } from '../pages/regprovidersrc/regprovidersrc'; 
import { HomeproviderPage } from '../pages/homeprovider/homeprovider';  
import { ProfileproviderPage } from '../pages/profileprovider/profileprovider';   
import { ProfilenewitemPage } from '../pages/profilenewitem/profilenewitem'; 
import { ContactlistPage } from '../pages/contactlist/contactlist';  
import { ProfileagentPage } from '../pages/profileagent/profileagent'; 
import { AgentfiltersPage } from '../pages/agentfilters/agentfilters'; 
import { CampaignaddPage } from '../pages/campaignadd/campaignadd'; 

import { Base64 } from '@ionic-native/base64';

import { TextMaskModule } from 'angular2-text-mask';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CallNumber } from '@ionic-native/call-number'; 

export function provideConfig() {
  return config;
}

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("1056180665798-qaq4v6kcgqeu45hm83mh8kc2a2moa3o1")
  }
]);

@NgModule({
  declarations: [ 
    MyApp,
    HomePage,
    LoginPage,
    CodePage ,
    RegisterPage,
    InvitesPage,
    NotificationallPage,
    BalancePage,
    InvitesecondPage,
    InvitefirstPage,
    ProfilePage,
    SettingPage,
    CampaignPage,
    CampaigndetailPage,
    OfferPage,
    OfferSinglePage,
    ResetpasswordPage,
    BecomeproviderPage,
    BecomeagentPage,
    SearchservicePage,
    OfficeequipmentPage,
    SinglechatPage,
    AddfilterPage,
    QuicksearchmodalPage,
    DashboardPage,
    MyconnectionPage,
    MyconnectionpayPage,
    MyconnectionexpPage,
    ReviewsPage,
    NotificationPage,
    SocialfeedPage,
    ProvidertapPage,
    UserPage,
    UnregisteredPage,
    SearchproviderPage,
    RegisterproviderPage,
    RegisterpublishPage,
    RegistermainPage,
    RegprovidersrcPage,
    HomeproviderPage,
    ProfileproviderPage,
    ProfilenewitemPage,
    ContactlistPage,
    ProfileagentPage,
    AgentfiltersPage,
    CampaignaddPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    RlTagInputModule,
    TextMaskModule,
    AgmCoreModule.forRoot({
        apiKey: "AIzaSyCnahpwY4LRTYlzEHnER3B_Y8NR1HzmrVE",
        libraries: ["places"]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,  
    CodePage,
    RegisterPage, 
    InvitesPage,
    NotificationallPage,
    BalancePage,
    InvitesecondPage,
    InvitefirstPage,
    ProfilePage,
    SettingPage,
    CampaignPage, 
    CampaigndetailPage,
    OfferPage,
    OfferSinglePage,
    ResetpasswordPage,
    BecomeproviderPage,
    BecomeagentPage,
    SearchservicePage,
    OfficeequipmentPage,
    SinglechatPage,
    AddfilterPage,
    QuicksearchmodalPage,
    DashboardPage,
    MyconnectionPage,
    MyconnectionpayPage,
    MyconnectionexpPage,
    ReviewsPage,
    NotificationPage,
    SocialfeedPage,
    ProvidertapPage,
    UserPage,
    UnregisteredPage ,
    SearchproviderPage,
    RegisterproviderPage,
    RegisterpublishPage,
    RegistermainPage, 
    RegprovidersrcPage,
    HomeproviderPage,
    ProfileproviderPage,
    ProfilenewitemPage,
    ContactlistPage,
    ProfileagentPage,
    AgentfiltersPage,
    CampaignaddPage  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlus,
    NativeStorage,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SecurityProvider,
    Deeplinks,
    bigdata,
    Camera,
    FileTransfer,
    FileTransferObject,
    File,
    Contacts,
    Base64, 
    InAppBrowser,
    CallNumber,
    AuthService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ]
})
export class AppModule {}
