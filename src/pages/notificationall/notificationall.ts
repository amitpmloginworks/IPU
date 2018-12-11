import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController, MenuController, ViewController, LoadingController, AlertController } from 'ionic-angular';
import{ bigdata}from'../../app/model'
import * as moment from 'moment'; 
import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx' 


/**
 * Generated class for the NotificationallPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notificationall',
  templateUrl: 'notificationall.html',
})
export class NotificationallPage {
  detailbox1=[]  
  ImageUrl 
  finalImgUrl
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController,public menuCtrl: MenuController,public toastCtrl:ToastController, public loadingCtrl:LoadingController,public http:Http,public security:SecurityProvider,public bdata:bigdata, public alertCtrl:AlertController){
    this.GetLoadData();

  }

  GetLoadData(){  
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present(); 
    this.security.UserViews().subscribe(result => {
        loading.dismiss()
        this.detailbox1=[];
        if(result==false){
          this.toastCtrl.create({ message: `No record found.`, duration: 3000, position: 'top' }).present(); return;
        }
        else{
          this.detailbox1=result.notifications;
          console.log(result.notifications); 
            this.finalImgUrl=this.ImageUrl+result.image;
        }
    }, err => {
      loading.dismiss()
      this.toastCtrl.create({ message: `Please try again.`, duration: 4000, position: 'top' }).present(); return;
    });
  }  


  ionViewWillEnter(){    this.ImageUrlLink();   }   
  ImageUrlLink(){    this.ImageUrl=this.security.ImageUrlLink();   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationallPage');
  }

}
