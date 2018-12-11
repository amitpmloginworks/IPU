import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController , ToastController, LoadingController, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx'

import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { OfficeequipmentPage } from '../officeequipment/officeequipment';  

import { ProfilePage } from '../profile/profile';  
import { ProfileproviderPage } from '../profileprovider/profileprovider'; 
import { ProfileagentPage } from '../profileagent/profileagent'; 

import { NotificationPage } from '../notification/notification'; 
import { PopoverController } from 'ionic-angular'; 

/**
 * Generated class for the SearchservicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({ 
  selector: 'page-searchservice',
  templateUrl: 'searchservice.html',
})
export class SearchservicePage {
  surveyForm:any;
  public answers=[];
  public mainanswers=[];
  public srcanswers=[];
  public AnswersArr = [];
  GetAnswer
  ServiceList
  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController, public toastCtrl:ToastController,public loadingCtrl: LoadingController,public http:Http,public security:SecurityProvider,public alertCtrl:AlertController, private formBuilder:FormBuilder,public popoverCtrl: PopoverController) {     
 

    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present();    
       this.security.GetServices().subscribe(result => {
         if (result === false) {
           loading.dismiss();
           this.toastCtrl.create({ message: `Please Enter Valid credentials!`, duration: 4000, position: 'top' }).present(); return;
         } else {
           loading.dismiss()
           let count=0;
           for(let i=0;i<result.length;i++)
           {
             if(count==i)
             {
              this.AnswersArr.push({ "id": result[i] }); 
             }
             count=count+1;
           }
            this.answers.push({"id":"val","answers":this.AnswersArr });
            this.mainanswers=this.answers
            this.srcanswers=this.answers
          this.FormBuilderFn();
         }
       }, err => {
         loading.dismiss()
         this.toastCtrl.create({ message: `Please Enter valid credentials!!`, duration: 4000, position: 'top' }).present(); return;
       });


  }
  
  FormBuilderFn() { 
    this.surveyForm = this.formBuilder.group({
      answers: this.formBuilder.array([])
    })   
    for (var i = 0; i < this.answers.length; i++) {
        let question = this.formBuilder.group({
          question_id: [this.answers[i].id, Validators.required],
          answer_by_user: this.formBuilder.array([])
        });
        this.surveyForm.controls['answers'].push(question);
    }  
  }
 
  onChange(id, isChecked, index) {
    const answers = <FormArray>this.surveyForm.controls.answers.controls[index].controls.answer_by_user
    if(isChecked) {
      answers.push(new FormControl(id)) 
    } else {
      let idx = answers.controls.findIndex(x => x.value == id)
      answers.removeAt(idx)
    }
    this.GetAnswer=this.surveyForm.value
  }

  SearchBtn(){ 
    if(this.GetAnswer==undefined){
      this.toastCtrl.create({ message: `Please select services.`, duration: 6000, position: 'top' }).present();
       return;
    }
    if(this.GetAnswer.answers[0].answer_by_user.length==0){ 
      this.toastCtrl.create({ message: `Please select services.`, duration: 6000, position: 'top' }).present();
       return;
    }  
    this.ServiceList=this.GetAnswer.answers[0].answer_by_user.toString();
    this.navCtrl.setRoot(OfficeequipmentPage,{ selectService:this.ServiceList })      
  }


  getItems(ev){
    if(ev.target.value !="")  {
      let temparr=[];
      this.srcanswers=this.srcanswers[0].answers.filter((mitem) => {
       return (mitem.id.toLowerCase().indexOf(ev.target.value.toLowerCase()) > -1);
      })
      temparr.push({"id":"val","answers":this.srcanswers });
      this.answers=temparr;
      this.srcanswers=temparr; 
    }
    if(ev.target.value =="" || ev.target.value ==undefined) {
      this.answers=this.mainanswers;  
      this.srcanswers=this.mainanswers;    
    }
  }

  ProfileBtn(){
    if(localStorage['ProviderUser']=="provider") {  
      //this.navCtrl.push(ProfileproviderPage); 
      this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Search service" },{cssClass: 'custom-popover'}).present(); 
     }
    if(localStorage['ProviderUser']=="user")     {  
     // this.navCtrl.push(ProfilePage); 
     this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Search service" },{cssClass: 'custom-popover'}).present();       
       }
    if(localStorage['ProviderUser']=="agent")    { 
      // this.navCtrl.push(ProfileagentPage); 
      this.popoverCtrl.create(NotificationPage,{ showBackdrop: true, enableBackdropDismiss: true,PageNav:"Search service" },{cssClass: 'custom-popover'}).present();   
        }
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchservicePage');
  }

     



}
