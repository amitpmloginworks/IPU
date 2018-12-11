import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController , ToastController, LoadingController, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx'
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the ContactlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contactlist',
  templateUrl: 'contactlist.html',
})
export class ContactlistPage {
  surveyForm:any;
  public answers=[];
  public mainanswers=[];
  public srcanswers=[];
  public AnswersArr = [];
  GetAnswer
  ServiceList
  InvitesTxt
  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController, public toastCtrl:ToastController,public loadingCtrl: LoadingController,public http:Http,public security:SecurityProvider,public alertCtrl:AlertController, private formBuilder:FormBuilder, private contacts: Contacts,public socialSharing:SocialSharing) {
    this.InvitesTxt=navParams.get("InvitesTxt")
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present(); 

    this.contacts.find(['displayName','phoneNumbers'], {filter: "", multiple: true})
    .then(data => { 
      loading.dismiss(); 
      let count=0;  
      for(let i=0; i<data.length;i++){  
        if(count==i)
        {
          if(data[i].phoneNumbers != null){ 
            this.AnswersArr.push({ "id": data[i].phoneNumbers[0].value,"name": data[i].displayName });
          }
      }
      count=count+1;
      }
      this.answers.push({"id":"val","answers":this.AnswersArr });
      this.FormBuilderFn();
    },err =>{
      loading.dismiss();
      this.toastCtrl.create({ message: `Please try again.`, duration: 4000, position: 'top' }).present(); return;
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
 
  onChange(id,name, isChecked, index) {
    const answers = <FormArray>this.surveyForm.controls.answers.controls[index].controls.answer_by_user
    if(isChecked) {
      answers.push(new FormControl({"phone":id,"full_name":name})) 
    } else {
      let idx = answers.controls.findIndex(x => x.value == id)
      answers.removeAt(idx)
    }
    this.GetAnswer=this.surveyForm.value
    console.log(this.surveyForm.value)  
  }

  SearchBtn(){   
    console.log(this.GetAnswer); 
    if(this.GetAnswer == undefined){
      this.toastCtrl.create({ message: `Please select at least one.`, duration: 4000, position: 'top' }).present(); 
      return;
    }     
    if(this.GetAnswer.answers[0].answer_by_user.length == 0){
      this.toastCtrl.create({ message: `Please select at least one.`, duration: 4000, position: 'top' }).present(); 
      return;
    }

    this.ServiceList=this.GetAnswer.answers[0].answer_by_user; 
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading.gif" style="height:100px!important">`, cssClass: 'transparent' })
    loading.present();

  
    this.security.ConnectionsMobDb(this.ServiceList).subscribe(result1 => {
      loading.dismiss()    
      if(result1==true){
        this.socialSharing.share(this.InvitesTxt) 
        .then(() => {    }).catch(() => {  
          this.toastCtrl.create({ message: `Please try again.`, duration: 6000, position: 'top' }).present(); return;  
         });
      }
      if(result1==false){
        this.toastCtrl.create({ message: `Internal server error, please try again.`, duration: 4000, position: 'top' }).present(); return;
      }
  }, err => {
    console.log("err", err);
    loading.dismiss()
    this.toastCtrl.create({ message: `No internet connection, please try again.`, duration: 4000, position: 'top' }).present(); return;
  });


  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactlistPage');
  }

}
