import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ModalController, LoadingController, ToastController } from 'ionic-angular';
import { QuicksearchmodalPage } from '../quicksearchmodal/quicksearchmodal'; 
import { ProfilePage } from '../profile/profile';  
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx'
import { InvitesPage } from '../invites/invites'; 
import { BecomeproviderPage } from '../becomeprovider/becomeprovider';   
import { BecomeagentPage } from '../becomeagent/becomeagent'; 
import{ bigdata}from'../../app/model'
import { SearchservicePage } from '../searchservice/searchservice'; 
import { MyconnectionexpPage } from '../myconnectionexp/myconnectionexp'; 

/**
 * Generated class for the SearchproviderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-searchprovider',
  templateUrl: 'searchprovider.html',
})
export class SearchproviderPage { 
  providertap:boolean=true;

  ProviderAddress
  ProviderWebsite 
  ProviderPhone 
  ProviderEmail
  Providerlist 

  count=0
  IdDisplay
  Preindex
  displaynone:boolean=false

  profession
  UserName
  image
ProviderTemp;
ImageUrl
Balance:number=0;   
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public toastCtrl:ToastController,public loadingCtrl: LoadingController,public security:SecurityProvider,public bdata:bigdata) {

    if(this.bdata.UserData.earnings.length != 0) {   this.Balance=this.bdata.UserData.balance; }  
    if(this.bdata.UserData.earnings.length == 0) {  this.Balance=0; } 

    this.IdDisplay="none";
    this.ProviderTemp=[];
   this.LoadData();
  }
 
  LoadData(){   
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present();    
       this.security.ProviderAll().subscribe(result => {
         if (result === false) {  loading.dismiss(); } else { loading.dismiss();
          this.bdata.AllProviderSearch=result;
           this.Providerlist=result; 

          }
       }, err => {  
         console.log("err", err);
         loading.dismiss()
         this.toastCtrl.create({ message: `Please login with valid credentials!`, duration: 4000, position: 'top' }).present(); return;
       });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchproviderPage');
  }

  getItems(ev)  {   
    console.log(ev.target.value) 
    if(ev.target.value !=""){
/*
      this.security.GetQuickSearch(ev.target.value).subscribe(result => {
        if (result === false) {  this.Providerlist=[];    } 
        else {  this.Providerlist=result;  }
      }, err => {       });
*/
      this.security.ProviderSearch(ev.target.value).subscribe(result => {
        if (result === false) {      } 
        else {   this.Providerlist=result;  
         if(result.length==0) {      }
        }
      }, err => {   });   
    }
   // else    {  this.Providerlist=this.bdata.AllProviderSearch;    }

    if(ev.target.value =="" || ev.target.value ==undefined) {
      console.log("if condition..");
       this.Providerlist=this.ProviderTemp; 
      }
    //document.getElementsByClassName("searchbar-search-icon").style.display="none";
  } 
    

  ListClick(){
    let modalTips = this.modalCtrl.create(QuicksearchmodalPage,{image :  this.image,UserName : this.UserName,profession : this.profession,email : this.ProviderEmail,phone : this.ProviderPhone});  
    modalTips.onDidDismiss(data => {   });  modalTips.present();  
  }

  ProfileBtn(){  
    this.navCtrl.setRoot(ProfilePage);
  }
   


  OpenCloseArrow(email,phone,website,address,index,profession,UserName,image){  
    //this.providertap = !this.providertap;
    this.ProviderAddress=address
    this.ProviderWebsite=website
    this.ProviderPhone =phone 
    this.ProviderEmail=email

    this.profession=profession
    this.UserName=UserName
    this.image=this.ImageUrl+image  
    this.count++
    let varStyle=document.getElementById("x_"+index).style.display
    if( this.IdDisplay!=varStyle){ 
        document.getElementById("x_"+this.Preindex).style.display="none"
        this.Preindex=index
        document.getElementById("x_"+index).style.display="block";
        document.getElementById("arrowup_"+this.Preindex).style.display="inline-table" 
        document.getElementById("arrowdown_"+this.Preindex).style.display="none"
        this.IdDisplay=document.getElementById("x_"+index).style.display
        this.displaynone=true;
        return; 
    }
    if(this.displaynone==true){
        document.getElementById("x_"+this.Preindex).style.display="none"
        document.getElementById("arrowdown_"+this.Preindex).style.display="inline-table"
        document.getElementById("arrowup_"+this.Preindex).style.display="none"
        this.IdDisplay=document.getElementById("x_"+this.Preindex).style.display
        this.displaynone=false;
        this.ProviderAddress=""
        this.ProviderWebsite=""
        this.ProviderPhone ="" 
        this.ProviderEmail=""
        return;
    }
    if(this.count%2==0){
      document.getElementById("x_"+this.Preindex).style.display="none"
      document.getElementById("arrowdown_"+this.Preindex).style.display="inline-table"
      document.getElementById("arrowup_"+this.Preindex).style.display="none"
      this.IdDisplay=document.getElementById("x_"+this.Preindex).style.display
      this.ProviderAddress=""
      this.ProviderWebsite=""
      this.ProviderPhone ="" 
      this.ProviderEmail=""
    }
    if(this.count%2==1){
    this.Preindex=index
    document.getElementById("x_"+index).style.display="block";
    document.getElementById("arrowdown_"+this.Preindex).style.display="none"
    document.getElementById("arrowup_"+this.Preindex).style.display="inline-table"
    this.IdDisplay=document.getElementById("x_"+index).style.display
    }
}

 
SeeDetails(index){
console.log(index)
let providerList=this.Providerlist[index];
this.navCtrl.push(MyconnectionexpPage,{ providerList:providerList })
console.log(providerList)   
}

PublishBtn()  {  
 // this.navCtrl.push(InvitesPage,{invitepublish:"publish"});
  this.security.Publish_click(this.UserName).subscribe(result => {
    if (result === false) {
      this.toastCtrl.create({ message: `Please try again`, duration: 4000, position: 'top' }).present(); return;  
    } else {
      this.toastCtrl.create({ message: `Saved successfully.`, duration: 4000, position: 'top' }).present(); return;
    }
  }, err => {
    this.toastCtrl.create({ message: `Please try again`, duration: 4000, position: 'top' }).present(); return;
  });


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

ServiceSrcbtn(){     
  this.navCtrl.setRoot(SearchservicePage);  
}

ionViewWillEnter(){    this.ImageUrlLink();   }   
ImageUrlLink(){    this.ImageUrl=this.security.ImageUrlLink();   }

}
