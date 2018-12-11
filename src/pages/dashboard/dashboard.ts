import { Component , ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Chart } from 'chart.js'; 
import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx'
import{ bigdata}from'../../app/model'

import { ProfilePage } from '../profile/profile';  
import { ProfileproviderPage } from '../profileprovider/profileprovider'; 
import { ProfileagentPage } from '../profileagent/profileagent';  

import { NotificationPage } from '../notification/notification'; 
import { PopoverController } from 'ionic-angular'; 

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  @ViewChild('barCanvas') barCanvas;
  barChart: any;

  ProviderUser:boolean=false;  // to identify user or provider 

  ProviderRegReferral:number=0
  ProviderBalance:number=0
  ProviderCloseDeal:number=0; 
  ProviderReferralView:number=0;
  ProviderEarning:number=0;
  ProviderProfileViews:number=0;  

  UserBalance:number=0;
  UserReferralView:number=0;
  UserInvite:number=0;
  UserReg:number=0;
  UserConnection:number=0;
  UserDeal:number=0;

  payviewsval0
  payviewsval1
  payviewsval2
  payviewsval3
  payviewsval4
  payviewsval5
  payviewsval6
  payviewsval7
  payviewsval8
  payviewsval9
  payviewsval10
  payviewsval11

  payment0
  payment1
  payment2
  payment3
  payment4
  payment5
  payment6
  payment7
  payment8
  payment9
  payment10
  payment11

  paymentval0
  paymentval1
  paymentval2
  paymentval3
  paymentval4
  paymentval5
  paymentval6
  paymentval7
  paymentval8
  paymentval9
  paymentval10
  paymentval11

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl:ToastController,public loadingCtrl: LoadingController,public http:Http,public security:SecurityProvider,public bdata:bigdata,public popoverCtrl: PopoverController) {

    if(localStorage['ProviderUser']=="user") {  
    this.UserBalance=this.bdata.UserData.balance;
    this.UserData();
    this.ProviderUser=false;
    }

    if(localStorage['ProviderUser']=="agent") {    
      this.UserBalance=this.bdata.UserData.balance;
      this.UserData();
      this.ProviderUser=false;
      }

    if(localStorage['ProviderUser']=="provider") {  
      this.ProviderUser=true;
      }  

      this.GetDashboardData(); 

  }

  UserData(){

    this.security.GetConnections(localStorage["username"],localStorage["token"]).subscribe(result => { 
      if (result === false) {   } else { 
        console.log("result==",result);     
        this.UserConnection=result.length;
         }
    }, err => {
      console.log("err", err);
      this.toastCtrl.create({ message: `Please login with valid credentials!`, duration: 4000, position: 'top' }).present(); return;
    });


    this.security.UserViews().subscribe(result => { 
      if (result === false) {   } else {     
        this.UserBalance=result.balance;
        this.bdata.UserData=result;
         }
    }, err => {
      console.log("err", err);
      this.toastCtrl.create({ message: `Please login with valid credentials!`, duration: 4000, position: 'top' }).present(); return;
    });
    
  }
 
  ionViewDidLoad() { 
          this.payment0=this.bdata.ChartArr[2].series[0].name
          this.payment1=this.bdata.ChartArr[2].series[1].name
          this.payment2=this.bdata.ChartArr[2].series[2].name
          this.payment3=this.bdata.ChartArr[2].series[3].name
          this.payment4=this.bdata.ChartArr[2].series[4].name
          this.payment5=this.bdata.ChartArr[2].series[5].name
          this.payment6=this.bdata.ChartArr[2].series[6].name
          this.payment7=this.bdata.ChartArr[2].series[7].name
          this.payment8=this.bdata.ChartArr[2].series[8].name
          this.payment9=this.bdata.ChartArr[2].series[9].name
          this.payment10=this.bdata.ChartArr[2].series[10].name
          this.payment11=this.bdata.ChartArr[2].series[11].name
  
          this.paymentval0=this.bdata.ChartArr[2].series[0].value
          this.paymentval1=this.bdata.ChartArr[2].series[1].value
          this.paymentval2=this.bdata.ChartArr[2].series[2].value
          this.paymentval3=this.bdata.ChartArr[2].series[3].value
          this.paymentval4=this.bdata.ChartArr[2].series[4].value
          this.paymentval5=this.bdata.ChartArr[2].series[5].value
          this.paymentval6=this.bdata.ChartArr[2].series[6].value
          this.paymentval7=this.bdata.ChartArr[2].series[7].value
          this.paymentval8=this.bdata.ChartArr[2].series[8].value
          this.paymentval9=this.bdata.ChartArr[2].series[9].value
          this.paymentval10=this.bdata.ChartArr[2].series[10].value
          this.paymentval1=this.bdata.ChartArr[2].series[11].value
  
         this.payviewsval0=this.bdata.ChartArr[3].series[0].value
          this.payviewsval1=this.bdata.ChartArr[3].series[1].value
          this.payviewsval2=this.bdata.ChartArr[3].series[2].value
          this.payviewsval3=this.bdata.ChartArr[3].series[3].value
          this.payviewsval4=this.bdata.ChartArr[3].series[4].value
          this.payviewsval5=this.bdata.ChartArr[3].series[5].value
          this.payviewsval6=this.bdata.ChartArr[3].series[6].value
          this.payviewsval7=this.bdata.ChartArr[3].series[7].value
          this.payviewsval8=this.bdata.ChartArr[3].series[8].value
          this.payviewsval9=this.bdata.ChartArr[3].series[9].value
          this.payviewsval10=this.bdata.ChartArr[3].series[10].value
          this.payviewsval11=this.bdata.ChartArr[3].series[11].value 
    var chart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data:{
          labels:[this.payment0
            ,this.payment1
            ,this.payment2
            ,this.payment3
            ,this.payment4
            ,this.payment5
            ,this.payment6
            ,this.payment7
            ,this.payment8
            ,this.payment9
            ,this.payment10
            ,this.payment11], 
          datasets:[
             {
         
           data:[this.paymentval0
            ,this.paymentval1
            ,this.paymentval2
            ,this.paymentval3
            ,this.paymentval4
            ,this.paymentval5
            ,this.paymentval6
            ,this.paymentval7
            ,this.paymentval8
            ,this.paymentval9
            ,this.paymentval10
            ,this.paymentval11], 
           backgroundColor:'#2699FB'
          },
          
          
              {
               
                  data: [this.payviewsval0
        ,this.payviewsval1
        ,this.payviewsval2
        ,this.payviewsval3
        ,this.payviewsval4
        ,this.payviewsval5
        ,this.payviewsval6
        ,this.payviewsval7
        ,this.payviewsval8
        ,this.payviewsval9
        ,this.payviewsval10
        ,this.payviewsval11],
                  backgroundColor: '#BCE0FD' // red
                },
              {
              
    
  
        
        type: 'line',
                     lineTension: 0.1,
                      backgroundColor: "#DBEBF6",
                      borderColor: "#ED906B",
                      borderCapStyle: 'butt',
                      borderDash: [],
                      borderDashOffset: 0.0,
                      borderJoinStyle: 'miter',
                      pointBorderColor: "#ffff",
                      pointBackgroundColor: "#ED906B",
                      pointBorderWidth: 1,
                      pointHoverRadius: 5,
                      pointHoverBackgroundColor: "rgba(75,192,192,1)",
                      pointHoverBorderColor: "rgba(220,220,220,1)",
                      pointHoverBorderWidth: 2,
                      pointRadius: 2
              }
          ]
      },options: {
         
          scales: {
            xAxes: [
              { stacked: true }
            ],
            yAxes: [
              {
              
              gridLines: {
                display: false,
            },
            ticks: {
              fontColor: "#2699FB", // this here
            },
          }
            ]
          },
          legend: {
              display: false,
          },
        }
      
   }); 
   chart.update();
  
    }

    GetDashboardData(){
      this.security.GetDashboard().subscribe(result => { 
        if (result === false) {   } else { 
          if(localStorage['ProviderUser']=="provider") { 
          this.ProviderRegReferral=result.referrals;
          this.ProviderCloseDeal= result.deals
          this.ProviderReferralView= result.referral_views
          this.ProviderEarning= result.earnings
          this.ProviderProfileViews= result.pay_views
          console.log(result.chart)
          console.log(result.chart[2].series[0].name) 
          this.bdata.ChartArr=result.chart   
          }
          if(localStorage['ProviderUser']=="user") {  
          this.UserReferralView=result.pay_views 
          this.UserInvite=result.referral_views
          this.UserReg=result.referrals  
          this.UserDeal=result.payments
          this.bdata.ChartArr=result.chart  
          }

          if(localStorage['ProviderUser']=="agent") {   
            this.UserReferralView=result.pay_views 
            this.UserInvite=result.referral_views
            this.UserReg=result.referrals  
            this.UserDeal=result.payments
            this.bdata.ChartArr=result.chart  
            }

           }
      }, err => {
        console.log("err", err);
        this.toastCtrl.create({ message: `Please login with valid credentials!`, duration: 4000, position: 'top' }).present(); return;
      }); 
    }

    ProfileBtn(){
      if(localStorage['ProviderUser']=="provider") { 
         //this.navCtrl.push(ProfileproviderPage); 
         this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Dashboard" },{cssClass: 'custom-popover'}).present(); 
        }
      if(localStorage['ProviderUser']=="user")     { 
         //this.navCtrl.push(ProfilePage); 
         this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Dashboard" },{cssClass: 'custom-popover'}).present(); 
        }
      if(localStorage['ProviderUser']=="agent")    {
         // this.navCtrl.push(ProfileagentPage);
         this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Dashboard" },{cssClass: 'custom-popover'}).present();   
        }
    } 

}
