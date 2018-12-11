import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController, LoadingController, AlertController } from 'ionic-angular';
import { CampaigndetailPage } from '../campaigndetail/campaigndetail'; 
import{ bigdata}from'../../app/model'
import * as moment from 'moment'; 
import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx' 

import { ProfilePage } from '../profile/profile';  
import { ProfileproviderPage } from '../profileprovider/profileprovider'; 
import { ProfileagentPage } from '../profileagent/profileagent';  

/**
 * Generated class for the BalancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-balance',
  templateUrl: 'balance.html', 
})
export class BalancePage {
  ImageUrl
  ReviewArr
  Usernames
  Balance:number=0;   
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController, public loadingCtrl:LoadingController,public http:Http,public security:SecurityProvider,public bdata:bigdata, public alertCtrl:AlertController){
    this.LoadData()  
  }

  
  ServerDateTime(nowDate) {
    return moment(nowDate).format("DD MMMM YYYY");  
    }   

  ionViewWillEnter(){    this.ImageUrlLink();   }   
  ImageUrlLink(){    this.ImageUrl=this.security.ImageUrlLink();   }

  LoadData(){
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present(); 
    this.security.UserViews().subscribe(result => {
        loading.dismiss()
        this.ReviewArr=[];
        if(result==false){
          this.toastCtrl.create({ message: `No record found.`, duration: 3000, position: 'top' }).present(); return;
        }
        else{
            if(result.earnings.length != 0) {  this.Balance=result.balance; }  
            if(result.earnings.length == 0) {  this.Balance=0; } 
          if(result.earnings.length==0){
            this.toastCtrl.create({ message: `No record found.`, duration: 3000, position: 'top' }).present();
            return;
          }  
          this.Usernames=result._id
          for(let i=0;i<result.earnings.length;i++){
            let DateValue=this.ServerDateTime(result.earnings[i].time);
            let DateValue1 = DateValue.split(" ");
            let DateValue2;
            if(DateValue1[0]=='1'){
              DateValue2=DateValue1[0]+"st "+DateValue1[1];
            }
            if(DateValue1[0]=='2'){
              DateValue2=DateValue1[0]+"nd "+DateValue1[1];
            }
            if(DateValue1[0]=='1'){
              DateValue2=DateValue1[0]+"rd "+DateValue1[1];
            }
            else{
              DateValue2=DateValue1[0]+"th "+DateValue1[1];
            }
            this.ReviewArr.push({amount:result.earnings[i].amount,message:result.earnings[i].message,user2:result.earnings[i].user2,username:result.earnings[i].username,_id:result.earnings[i]._id,dateonly:DateValue2}) 
            DateValue="";
            DateValue2="";
          }
        }
    }, err => {
      loading.dismiss()
      this.toastCtrl.create({ message: `Please try again.`, duration: 4000, position: 'top' }).present(); return;
    });
  }

  ProfileBtn(){
    if(localStorage['ProviderUser']=="provider") {  this.navCtrl.push(ProfileproviderPage);  }
    if(localStorage['ProviderUser']=="user")     {  this.navCtrl.push(ProfilePage);          }
    if(localStorage['ProviderUser']=="agent")    {  this.navCtrl.push(ProfileagentPage);     }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BalancePage');
  }

}
