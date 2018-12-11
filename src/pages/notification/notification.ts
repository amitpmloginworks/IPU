import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController, MenuController, ViewController, LoadingController, AlertController, Platform } from 'ionic-angular';
import { NotificationallPage } from '../notificationall/notificationall'; 
import{ bigdata}from'../../app/model'
import * as moment from 'moment'; 
import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx' 


/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  detailbox=[]  
  datetimes
  fullName
  Balance:number=0;
  totalrows:number=1;
  ImageUrl1 
  imagePath1
  HeaderTitle
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController,public menuCtrl: MenuController,public toastCtrl:ToastController, public loadingCtrl:LoadingController,public http:Http,public security:SecurityProvider,public bdata:bigdata, public alertCtrl:AlertController,public platform:Platform) {
    this.GetLoadData1();  
    this.HeaderTitle= navParams.get("PageNav") 
    this.ImageUrl1=this.security.ImageUrlLink(); 
    this.imagePath1=this.bdata.UserData.image; 
    let backAction = platform.registerBackButtonAction(() => {
      console.log("Notification page close");
      this.viewCtrl.dismiss();
      backAction();
      },2)
 
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


  GetLoadData1(){ 
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present(); 
    this.security.UserViews().subscribe(result => {
        loading.dismiss()
        this.detailbox=[];
        if(result==false){
          this.toastCtrl.create({ message: `No record found.`, duration: 3000, position: 'top' }).present(); return;
        }
        else{
          this.fullName=result.name +" "+result.lastname; 
          if(result.balance != undefined) {  this.Balance=result.balance; }  
          if(result.balance == undefined) {  this.Balance=0; }     
          this.totalrows=(result.notifications_new.length)-1;
          console.log(result.notifications_new)
          for(let i=0;i<result.notifications_new.length;i++){
            var endtime=this.LocalDatetime();  
            var Starttime = this.ServerTimestamp(result.notifications_new[i].time);
            let daytime=[];
            daytime=this.DiffTimestamp(Starttime,endtime);
            if(daytime[0].days !=0){   
              if(daytime[0].days ==1){   
               this.datetimes=daytime[0].days+" day ago"; 
              }  
              else{
                this.datetimes=daytime[0].days+" days ago";
              } 
            }
            else{
              if(daytime[0].hours !=0){ 
                if(daytime[0].hours ==1){ 
                 this.datetimes=daytime[0].hours+" hour ago"; 
                }
                else{
                  this.datetimes=daytime[0].hours+" hours ago"; 
                }   
              }
              else{
                if(daytime[0].minutes !=0){ 
                  if(daytime[0].minutes ==1){ 
                   this.datetimes=daytime[0].minutes+" minute ago"; 
                  }
                  else{
                    this.datetimes=daytime[0].minutes+" minutes ago"; 
                  }   
              }
                else{
                  if(daytime[0].seconds !=0){ 
                    if(daytime[0].seconds ==1){   
                    this.datetimes=daytime[0].seconds+" second ago"; 
                    }
                    else{
                      this.datetimes=daytime[0].seconds+" seconds ago"; 
                    } 
                  }
                  else{
                    this.datetimes="just now"; 
                  }
                }
              }
            }  
            this.detailbox.push({ _id:result.notifications_new[i]._id,title:result.notifications_new[i].message,subtitle:this.datetimes,username:result.notifications_new[i].username });    
          } 
        }
    }, err => {
      console.log("err", err);
      loading.dismiss()
      this.toastCtrl.create({ message: `Please try again.`, duration: 4000, position: 'top' }).present(); return;
    });


    this.security.notification_click().subscribe(result => {
      if(result==false){
      }
      else{
        console.log(result); 
      }
  }, err => {
    loading.dismiss()
    this.toastCtrl.create({ message: `Please try again.`, duration: 4000, position: 'top' }).present(); return;
  });
    
  

  }  
 
  GotoNext()  {    this.viewCtrl.dismiss();    this.navCtrl.setRoot(NotificationallPage);  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
    //this.menuCtrl.enable(true, "menu1"); 
    this.menuCtrl.isEnabled()
  }

  presentPopover()
  {
    this.viewCtrl.dismiss(); 
  }

}
