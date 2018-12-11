import { Injectable } from '@angular/core';
import{ENV}from'../../app/env'
import { Type } from '@angular/compiler/src/output/output_ast';
import { Http, Request, Response, Headers, RequestOptions, RequestMethod, HttpModule } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { NativeStorage } from '@ionic-native/native-storage'; 

/*
  Generated class for the SecurityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SecurityProvider {
  SERVER_HOST: string = "https://ipublishu.com";
  token: string;
  user: any;  
  constructor(public http: Http,private nativeStorage: NativeStorage) {
    console.log('Hello SecurityProvider Provider');
  }

  ImageUrlLink(){  
    return "http://res.cloudinary.com/dq9zfttmi/image/upload/b_rgb:222d31,c_crop/b_rgb:222d31/";
  }


loginCheck(username,password)   
{  
  let headers = new Headers({ 'content-type': 'application/json'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({username:username,  password:password}) 
  return this.http.post(this.SERVER_HOST + '/api/authenticate',param,requestOptions)
.timeout(ENV.timeout)
.map((data)=>{
  console.log(''+data)
  return data.json()
})
}

login(username,password): Observable<any> {
  let headers = new Headers({ 'content-type': 'application/json'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({username:username,  password:password}) 
  return this.http.post(this.SERVER_HOST + '/api/authenticate',param , requestOptions)
    .map((response: Response) => {
      let token = response.json() && response.json().token;
      if (token) {
        localStorage['token']=token;
       localStorage['username']=username;
       localStorage['password']=password;  
      // this.nativeStorage.setItem('UserInfo', {username: username, password: password,token:token}).then(() => console.log('Stored item!'), error => console.error('Error storing item', error));
 
      localStorage['UserInfo']={ username: username, password: password,token:token }
        return true;
      }
      else {
        return Observable.throw(response);
      }
    })
    // .catch(err => {
    //   return Observable.throw(err);
    // });
}

googlelogin(email,token){
  let headers = new Headers({ 'content-type': 'application/json'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({email:email,token:token}) 
  return this.http.post(this.SERVER_HOST + '/api/authenticate/google',param , requestOptions)
    .map((response: Response) => {
      let Resjson=response.json(); 
      alert(JSON.stringify(Resjson)); 
     // if (token) {
      //  return true;
      //}
     // else {
      //  return Observable.throw(response);
     // }
    })
    // .catch(err => {
    //   return Observable.throw(err);
    // });
}

sendOtp(phone, calltype, user): Observable<any> {
  return this.http.post(this.SERVER_HOST + '/api/authenticate/sendOTP', {
    phone: phone,
    calltype: calltype,
    user: user
  })
    .map((response: Response) => {
      let token = response.json() && response.json().token;
      if (response.status == 200) {
        return true;
      } else {
        return false;
      }
    })
    // .catch(err => {
    //   return Observable.throw(err);
    // });
}


verifyOtp(calltype, otp, user): Observable<any> {
  let headers = new Headers();
  headers.append('otp', otp);
  headers.append('accept', "application/json");
  let options = new RequestOptions({
    headers: headers
  });
  return this.http.post(this.SERVER_HOST + '/api/authenticate/verifyOTP', { calltype: calltype, user: user }, options)
    .map((response: Response) => {
      let token = response.json() && response.json().token;
      if (response.status == 200) {
        return true;
      } else {
        return false;
      }
    })
    // .catch(err => {
    //   return Observable.throw(err);
    // });
}

forgotPassword(id, password, otp): Observable<any> {
  let headers = new Headers();
  headers.append('otp', otp);
  headers.append('accept', "application/json");
  let options = new RequestOptions({
    headers: headers
  });
  return this.http.post(this.SERVER_HOST + '/api/users/' + id + '/resetpassword', { password: password }, options)
    .map((response: Response) => {
      let token = response.json() && response.json().token;
      if (response.status == 200) {
        return true;
      } else {
        return false;
      }
    })
    // .catch(err => {
    //   return Observable.throw(err);
    // });
}


signInGoogleApi(email, token): Observable<any> {
  return this.http.post(this.SERVER_HOST + "/api/authenticate/google", {
    email: email, 
    token: token
  }).map((response: Response) => {
    // console.log('ipu google response', response);
    if (response.json()) {
      localStorage['token']=response.json().token;
      localStorage['username']=response.json().user;
    }
    return response;
  })
  // .catch(err => {
  //   // console.log('ipu google error', err);
  //   return Observable.throw(err);
  // });
}


UserViews(): Observable<any> {
  let headers = new Headers();
  headers.append('token', localStorage['token']);
  headers.append('accept', "application/json");
  let options = new RequestOptions({ headers: headers });
  let param=JSON.stringify({ }) 
  return this.http.get(this.SERVER_HOST + '/api/users/' + localStorage['username'] , options)
    .map((response: Response) => { 
      if (response.status == 200) {
        return response.json();
      } else {
        return false;
      }
    })
    // .catch(err => {
    //   return Observable.throw(err);
    // });
}

ProviderAll(): Observable<any> {
  let headers = new Headers();
  headers.append('token', localStorage['token']);
  headers.append('accept', "application/json");
  let options = new RequestOptions({ headers: headers });
  let param=JSON.stringify({ }) 
  return this.http.get(this.SERVER_HOST + '/api/providers', options)
    .map((response: Response) => {
      if (response.status == 200) {
        return response.json();
      } else {
        return false;
      }
    })
    // .catch(err => {
    //   return Observable.throw(err);
    // });
}



ProviderSearch(SearchQuery): Observable<any> {
  let headers = new Headers();
  headers.append('token', localStorage['token']);
  headers.append('accept', "application/json");
  let options = new RequestOptions({ headers: headers });
  let param=JSON.stringify({ }) 
  return this.http.get(this.SERVER_HOST + '/api/providers?search='+SearchQuery+'&page=0', options)
    .map((response: Response) => {
      if (response.status == 200) {
        return response.json();
      } else {
        return false;
      }
    })
    // .catch(err => {
    //   return Observable.throw(err);
    // });
}

     
registerProvider(otp,username,password,firstname,lastname,email,profession,category,services,phone,website,address,referral,longitude,latitude): Observable<any>
  {
  let headers = new Headers();
  headers.append('otp', otp);
  headers.append('content-type', 'application/json');
  let options = new RequestOptions({
  headers: headers
  }); 
  let param=JSON.stringify({  })   
  return this.http.post(this.SERVER_HOST + '/api/registerProvider', {  username: username,
    password: password,
    firstname: firstname,
    lastname: lastname,
    email: email,
    profession: profession,
    category: category,
    services: services,
    phone: phone,
    website:website,
    address: address,
    referral:"",  
    longitude: longitude,
    latitude: latitude } ,options)
  .map((response: Response) => {
  let token = response.json() && response.json().token;
  //return response.json();
  if (response.status == 200) { 
    return {  "status":"1","res":response.json()  };           
   } 
   if (response.status == 409) { 
    return {  "status":"2","res":""  };   
      }  
      if (response.status == 406) { 
        return {  "status":"3","res":""  }; 
       } 
       else { 
        return {  "status":"4","res":response.status  };  
          }
  })
  }


  registerPublishAgent(otp,username,password,firstname,lastname,email,sex,birthday,family_status,no_children,household_income,phone,address,referral,longitude,latitude): Observable<any>
  {
  let headers = new Headers();
  headers.append('otp', otp);
  headers.append('content-type', 'application/json');
  let options = new RequestOptions({
  headers: headers
  }); 
  let param=JSON.stringify({   })   
  return this.http.post(this.SERVER_HOST + '/api/registerPublishAgent', {  username: username,
    password: password,
    firstname: firstname,
    lastname: lastname,
    email: email,
    sex: sex,
    birthday: parseInt(birthday),
    family_status:family_status,
    no_children: parseInt(no_children), 
    household_income:household_income,
    phone:phone,
    address:address,
    referral:referral,
    longitude: longitude,
    latitude: latitude } ,options)
  .map((response: Response) => {
  let token = response.json() && response.json().token;
  //return response.json();
  if (response.status == 200) { 
    return {  "status":"1","res":response.json()  };           
   } 
   if (response.status == 409) { 
    return {  "status":"2","res":""  }; 
      }  
      if (response.status == 406) { 
        return {  "status":"3","res":""  }; 
       } 
       else { 
        return {  "status":"4","res":""  };  
          }
  })
  }


       
register(otp,username,password,firstname,lastname,email,referral): Observable<any>  {
let headers = new Headers();
headers.append('otp', otp);
headers.append('content-type', 'application/json');
let options = new RequestOptions({
headers: headers
}); 

let param=JSON.stringify({  })   
return this.http.post(this.SERVER_HOST + '/api/register', {  username: username,
  password: password,
  firstname: firstname,
  lastname: lastname,
  email: email,
  referral:referral } ,options)
.map((response: Response) => {
let token = response.json() && response.json().token;
//return response.json();
if (response.status == 200) { 
  return {  "status":"1","res":response.json()  };           
 } 
 if (response.status == 409) { 
  return {  "status":"2","res":""  }; 
    }  
    if (response.status == 406) { 
      return {  "status":"3","res":""  }; 
     } 
     else { 
      return {  "status":"4","res":""  };  
        }
})
}



inviteUser(reference,destinationType,destination): Observable<any> { 
  let headers = new Headers();
  headers.append('token', localStorage['token']);
  headers.append('accept', "application/json");
  let options = new RequestOptions({
  headers: headers
  });
  return this.http.post(this.SERVER_HOST + '/api/invite', {
  reference: reference,
  destinationType: destinationType,
  destination: destination
  }, options).map((response: Response) => {
    if (response.status == 200) {
      return true;
    } else {
      return false;
    }

  })
  // .catch(err => {
  // return Observable.throw(err);
  // });
  } 
   
  RateUser(rate,review,provider): Observable<any> { 
    let headers = new Headers();
    headers.append('token', localStorage['token']);
    headers.append('accept', "application/json");
    let options = new RequestOptions({
    headers: headers
    });
    return this.http.post(this.SERVER_HOST + '/api/providers/'+localStorage["username"]+'/rateuser', {
    user: provider,
    rate: rate,
    review: review
    }, options).map((response: Response) => {
      if (response.status == 200) {
        return true;
      } else {
        return false;
      }
  
    })
    // .catch(err => {
    // return Observable.throw(err);
    // });
    } 

  inviteUserView(referral): Observable<any> { 
    let headers = new Headers();
    headers.append('accept', "application/json");
    let options = new RequestOptions({
    headers: headers
    });
    return this.http.post(this.SERVER_HOST + '/api/userview', {
      referral: referral
    }, options).map((response: Response) => {
      if (response.status == 200) {
        return true;
      } else {
        return false;
      }
  
    })
    // .catch(err => {
    // return Observable.throw(err);
    // });
    } 


  GetServices(): Observable<any> {
    let headers = new Headers();
    headers.append('accept', "application/json");
    let options = new RequestOptions({ headers: headers });
    let param=JSON.stringify({ }) 
    return this.http.get(this.SERVER_HOST + '/api/services', options)
      .map((response: Response) => { 
        if (response.status == 200) {
          return response.json();  
        } else {
          return false;
        }
      })
      // .catch(err => {
      //   return Observable.throw(err);
      // });
  }

  UserPosts(id,posttxt,imgProfile): Observable<any> {  
    let headers = new Headers();
    headers.append('token', localStorage['token']);
    headers.append('accept', "application/json");
    let options = new RequestOptions({ headers: headers });
    let param=JSON.stringify({ })  
    return this.http.post(this.SERVER_HOST + '/api/users/'+id+'/userposts',{  user: id, image: imgProfile, post_text: posttxt }, options)
      .map((response: Response) => { 
        if (response.status == 200) {
          return true;  
        } else {
          return false;
        }
      })
      // .catch(err => {
      //   return Observable.throw(err);
      // });
  }

  socialFeed(): Observable<any> {  
    let headers = new Headers();
    headers.append('token', localStorage['token']);
    headers.append('accept', "application/json");
    let options = new RequestOptions({ headers: headers });
    let param=JSON.stringify({ }) 
    return this.http.get(this.SERVER_HOST + '/api/users/'+localStorage["username"]+'/socialFeed', options)
      .map((response: Response) => { 
        if (response.status == 200) {
          return response.json();  
        } else {
          return false;
        }
      })
      // .catch(err => {
      //   return Observable.throw(err);
      // });
  }


  GetDashboard(): Observable<any> {
    let headers = new Headers();
    headers.append('token', localStorage['token']);
    headers.append('accept', "application/json");
    let options = new RequestOptions({ headers: headers });
    let param=JSON.stringify({ }) 
    return this.http.get(this.SERVER_HOST + '/api/dashboard/' + localStorage['username'] , options)
      .map((response: Response) => { 
        if (response.status == 200) {
          return response.json();
        } else {
          return false;
        }
      })
      // .catch(err => {
      //   return Observable.throw(err);
      // });
  }




  SaveAsProvider(otp,profession,category,website,address,about,services,latitude,longitude): Observable<any> {  
    let headers = new Headers();   
    headers.append('token', localStorage['token']);
    headers.append('otp', otp);
    headers.append('accept', "application/json");
    let options = new RequestOptions({   headers: headers  });
    let param=JSON.stringify({ }) 
    
    return this.http.post(this.SERVER_HOST + '/api/providers/'+localStorage['username'],{  profession: profession, category: category, services:services, website: website, address: address, about: about,longitude:longitude,latitude:latitude }, options)
      .map((response: Response) => { 
        if (response.status == 200) {
          return true;  
        } else {
          return false;
        } 
      })
      // .catch(err => {
      //   return Observable.throw(err);
      // });
  }


  SaveAsPublishAgent(otp,sex,birthday,family_status,address,no_children,household_income,latitude,longitude): Observable<any> {  
    let headers = new Headers();
    headers.append('token', localStorage['token']);
    headers.append('otp', otp);
    headers.append('accept', "application/json");
    let options = new RequestOptions({   headers: headers  });
    let param=JSON.stringify({ })  
    return this.http.post(this.SERVER_HOST + '/api/publishagents/'+localStorage['username'],{  sex: sex, birthday: birthday, family_status: family_status, address: address, no_children: no_children,household_income:household_income,longitude:longitude,latitude:latitude }, options)
      .map((response: Response) => { 
        if (response.status == 200) {
          return true;  
        } else {
          return false;
        } 
      })
      // .catch(err => {
      //   return Observable.throw(err);
      // });
  }

  SaveCampaigns(title,description,startTime,endTime,image): Observable<any> {  
    let headers = new Headers();   
    headers.append('token', localStorage['token']);
    headers.append('accept', "application/json");
    let options = new RequestOptions({   headers: headers  });
    let param=JSON.stringify({ })    
    return this.http.post(this.SERVER_HOST + '/api/users/'+localStorage['username']+'/campaigns',{  title: title, description: description,startTime: startTime, endTime: endTime,image:image }, options)
      .map((response: Response) => { 
        if (response.status == 200) {
          return response.json(); 
        } else {
          return false;  
        } 
      })
      // .catch(err => {
      //   return Observable.throw(err);
      // });
  } 


    
  GetCampaigns(): Observable<any> {
    let headers = new Headers();
    headers.append('token', localStorage['token']);
    headers.append('accept', "application/json");
    let options = new RequestOptions({ headers: headers });
    let param=JSON.stringify({ })  
    return this.http.get(this.SERVER_HOST + '/api/users/' + localStorage['username']+'/campaigns' , options)
      .map((response: Response) => { 
        if (response.status == 200) {
          return response.json();
        } else {
          return false;
        }
      })
      // .catch(err => {
      //   return Observable.throw(err);
      // });
  }
   
  GetCampaignsById(id): Observable<any> {   
    let headers = new Headers();
    headers.append('token', localStorage['token']);
    headers.append('accept', "application/json");
    let options = new RequestOptions({ headers: headers });
    let param=JSON.stringify({ })  
    return this.http.get(this.SERVER_HOST + '/api/users/' + localStorage['username']+'/campaigns/'+id , options)
      .map((response: Response) => { 
        if (response.status == 200) {
          return response.json();
        } else {
          return false;
        }
      })
      // .catch(err => {
      //   return Observable.throw(err);
      // });
  }

  GetOffers(): Observable<any> {
    let headers = new Headers();
    headers.append('token', localStorage['token']);
    headers.append('accept', "application/json");
    let options = new RequestOptions({ headers: headers });
    let param=JSON.stringify({ })  
    return this.http.get(this.SERVER_HOST + '/api/users/' + localStorage['username']+'/offers', options)
      .map((response: Response) => { 
        if (response.status == 200) {
          return response.json();
        } else {
          return false;
        }
      })
      // .catch(err => {
      //   return Observable.throw(err);
      // });
  }  

  CampaignsAccept(id): Observable<any> {   
    let headers = new Headers();
    headers.append('token', localStorage['token']);
    headers.append('accept', "application/json");
    let options = new RequestOptions({   headers: headers  });
    let param=JSON.stringify({ })  
    return this.http.post(this.SERVER_HOST + '/api/users/'+localStorage['username']+'/campaigns/accept',{  campaign_id: id, username: localStorage['username'] }, options)
      .map((response: Response) => { 
        if (response.status == 200) {
          return true;  
        } else {
          return false;
        } 
      })
      // .catch(err => {
      //   return Observable.throw(err);
      // });
  }
    
  CampaignsInvite(id,usernames): Observable<any> {   
    let headers = new Headers();
    headers.append('token', localStorage['token']);
    headers.append('accept', "application/json");
    let options = new RequestOptions({   headers: headers  });
    let param=JSON.stringify({ })  
    return this.http.post(this.SERVER_HOST + '/api/users/'+localStorage['username']+'/campaigns/invite',{  campaign_id: id, usernames: usernames }, options)
      .map((response: Response) => { 
        if (response.status == 200) {
          return true;  
        } else {
          return false;
        } 
      })
      // .catch(err => {
      //   return Observable.throw(err);
      // });
  }


  GetQuickSearch(search): Observable<any> {
    let headers = new Headers();
    headers.append('token', localStorage['token']);
    headers.append('accept', "application/json");
    let options = new RequestOptions({ headers: headers });
    let param=JSON.stringify({ })  
    return this.http.get(this.SERVER_HOST + '/api/users/' + localStorage['username']+'/quickSearch?search='+search, options)      
      .map((response: Response) => { 
        if (response.status == 200) {
          return response.json();
        } else {
          return false;
        }
      })
      // .catch(err => {
      //   return Observable.throw(err);
      // });
  } 

  ConnectionsMobDb(connectionArr): Observable<any> {   
    let headers = new Headers();
    headers.append('token', localStorage['token']);
    headers.append('content-type', 'application/json');  
    let options = new RequestOptions({   headers: headers  });
    let param=JSON.stringify({ })  
    return this.http.post(this.SERVER_HOST + '/api/users/'+localStorage['username']+'/connections',{ connections: connectionArr }, options)
      .map((response: Response) => { 
        if (response.status == 200) {
          return true;     
        } else {
          return false;
        } 
      })
      // .catch(err => {
      //   return Observable.throw(err);
      // });
  }

  GetConnections(id,token): Observable<any> {
    let headers = new Headers();
    headers.append('token', token);
    headers.append('accept', "application/json");
    let options = new RequestOptions({ headers: headers });
    let param=JSON.stringify({ }) 
    return this.http.get(this.SERVER_HOST + '/api/users/'+id+'/connections', options)
      .map((response: Response) => {
        if (response.status == 200) {
          return response.json();
        } else {
          return false;
        }
      })
      // .catch(err => {
      //   return Observable.throw(err);
      // });
  }


  Publish_click(providerid): Observable<any> {   
    let headers = new Headers();
    headers.append('token', localStorage['token']);
    headers.append('accept', "application/json");
    let options = new RequestOptions({   headers: headers  });
    let param=JSON.stringify({ })  
    return this.http.post(this.SERVER_HOST + '/api/users/'+localStorage['username']+'/publish_click',{ provider: providerid }, options)
      .map((response: Response) => { 
        if (response.status == 200) {
          return true;     
        } else {
          return false;
        } 
      })
      // .catch(err => {
      //   return Observable.throw(err);
      // });
  }

  provider_login(): Observable<any> {   
    let headers = new Headers();
    headers.append('token', localStorage['token']);
    headers.append('accept', "application/json");
    let options = new RequestOptions({   headers: headers  });
    let param=JSON.stringify({ })  
    return this.http.post(this.SERVER_HOST + '/api/users/'+localStorage['username']+'/provider_login',{ referral: localStorage['username'] }, options)
      .map((response: Response) => { 
        if (response.status == 200) {
          return true;     
        } else {
          return false;
        } 
      })
      // .catch(err => {
      //   return Observable.throw(err);
      // });
  }

  GetNearProvider(searchQuery): Observable<any> {
    let headers = new Headers();
    headers.append('token', localStorage['token']);
    headers.append('accept', "application/json");
    let options = new RequestOptions({ headers: headers });
    let param=JSON.stringify({ }) 
    return this.http.get(this.SERVER_HOST + '/api/providers?'+searchQuery, options)
      .map((response: Response) => {
        if (response.status == 200) {
          return response.json();
        } else {
          return false;
        }
      })
      // .catch(err => {
      //   return Observable.throw(err);
      // });
  }

  

  notification_click(): Observable<any> {   
    let headers = new Headers();
    headers.append('token', localStorage['token']);
    headers.append('accept', "application/json");
    let options = new RequestOptions({   headers: headers  });
    let param=JSON.stringify({ })  
    return this.http.post(this.SERVER_HOST + '/api/users/'+localStorage['username']+'/notification_click',{ user: localStorage['username'] }, options)
      .map((response: Response) => { 
        if (response.status == 200) {
          return true;     
        } else {
          return false;
        } 
      })
      // .catch(err => {
      //   return Observable.throw(err);
      // });
  }


  
  MessageSetting(ask_referral,invite_user,invite_provider,publish_provider,pay_request): Observable<any> {   
    let headers = new Headers();
    headers.append('token', localStorage['token']);
    headers.append('accept', "application/json");
    let options = new RequestOptions({   headers: headers  });
    let param=JSON.stringify({ })  
    return this.http.post(this.SERVER_HOST + '/api/users/'+localStorage['username']+'/messages',{ ask_referral: ask_referral,invite_user:invite_user,invite_provider:invite_provider,publish_provider:publish_provider,pay_request:pay_request }, options)
      .map((response: Response) => { 
        if (response.status == 200) {
          return true;     
        } else {
          return false;
        } 
      })
      // .catch(err => {
      //   return Observable.throw(err);
      // });
  }
    
  UserViewPost(firstname,lastname,address,phone,email,otp): Observable<any> {   
    let headers = new Headers();
    headers.append('token', localStorage['token']);
    headers.append('otp', otp);
    headers.append('accept', "application/json");
    let options = new RequestOptions({   headers: headers  });
    let param=JSON.stringify({ })  
    return this.http.post(this.SERVER_HOST + '/api/users/'+localStorage['username'],{ 
      name: firstname,
      lastname: lastname,
      address: address,
      phone: phone,
      email: email }, options)
      .map((response: Response) => { 
        if (response.status == 200) {
          return true;     
        } else {
          return false;
        } 
      })
      // .catch(err => {
      //   return Observable.throw(err);
      // });
  }
  
  Images(id,token,url): Observable<any> {   
    let headers = new Headers();
    headers.append('token', token);
    headers.append('accept', "application/json");
    let options = new RequestOptions({   headers: headers  });
    let param=JSON.stringify({ })  
    return this.http.post(this.SERVER_HOST + '/api/users/'+id+"/images",{ 
      url: url }, options)
      .map((response: Response) => { 
        if (response.status == 200) {
          return true;     
        } else {
          return false;
        } 
      })
      // .catch(err => {
      //   return Observable.throw(err);
      // });
  }
   
  PortfolioProvider(image,title,price): Observable<any> {   
    let headers = new Headers();
    headers.append('token', localStorage['token']);
    headers.append('accept', "application/json");
    let options = new RequestOptions({   headers: headers  });
    let param=JSON.stringify({ })  
    return this.http.post(this.SERVER_HOST + '/api/users/'+localStorage['username']+"/portfolio",{ 
      image: image,title:title,price:price }, options)
      .map((response: Response) => { 
        if (response.status == 200) {
          return true;     
        } else {
          return false;
        } 
      })
      // .catch(err => {
      //   return Observable.throw(err);
      // });
  }

  PortfolioGallery(urls): Observable<any> {   
    let headers = new Headers();
    headers.append('token', localStorage['token']);
    headers.append('accept', "application/json");
    let options = new RequestOptions({   headers: headers  });
    let param=JSON.stringify({ })  
    return this.http.post(this.SERVER_HOST + '/api/users/'+localStorage['username']+"/gallery",{ 
      urls: urls }, options)
      .map((response: Response) => { 
        if (response.status == 200) {
          return true;     
        } else {
          return false;
        } 
      })
      // .catch(err => {
      //   return Observable.throw(err);
      // });
  }

  
  GetPublishAgent(searchQuery): Observable<any> {  
    let headers = new Headers();
    headers.append('token', localStorage['token']);
    headers.append('accept', "application/json");
    let options = new RequestOptions({ headers: headers });
    let param=JSON.stringify({ }) 
    return this.http.get(this.SERVER_HOST + '/api/publishagents?'+searchQuery, options)
      .map((response: Response) => {
        if (response.status == 200) {
          return response.json();
        } else {
          return false;
        }
      })
      // .catch(err => {
      //   return Observable.throw(err);
      // });
  }
  


  PayToPayer(payer,provider,referral,amount,rate,title,review,stripe_token): Observable<any> {   
    let headers = new Headers();
    headers.append('accept', "application/json");
    let options = new RequestOptions({   headers: headers  });
    let param=JSON.stringify({ })  
    return this.http.post(this.SERVER_HOST + '/api/pay',{ 
      payer: payer,provider:provider,referral:referral,amount:amount,rate:rate,title:title,review:review,stripe_token }, options)
      .map((response: Response) => { 
        if (response.status == 200) {
          return true;     
        }
        if (response.status == 500) {
          return true;     
        } 
        else {
          return false;
        } 
      })
      // .catch(err => {
      //   return Observable.throw(err);
      // });
  }
   
  GetProviderPost(ProviderId): Observable<any> {
    let headers = new Headers();
    headers.append('accept', "application/json");
    let options = new RequestOptions({ headers: headers });
    let param=JSON.stringify({ }) 
    return this.http.get(this.SERVER_HOST + '/api/providers/' + ProviderId+'/posts' , options)
      .map((response: Response) => { 
        if (response.status == 200) {
          return response.json();
        } else {
          return false;
        }
      })
      // .catch(err => {
      //   return Observable.throw(err);
      // });
  }

  GetProvider(ProviderId): Observable<any> {
    let headers = new Headers();
    headers.append('accept', "application/json");
    let options = new RequestOptions({ headers: headers });
    let param=JSON.stringify({ }) 
    return this.http.get(this.SERVER_HOST + '/api/providers/' + ProviderId , options)
      .map((response: Response) => { 
        if (response.status == 200) {
          return response.json();
        } else {
          return false;
        }
      })
      // .catch(err => {
      //   return Observable.throw(err);
      // });
  }
  
  ProviderEndorse(ProviderId,serviceTittle): Observable<any> {   
    let headers = new Headers();
    headers.append('token', localStorage['token']);
    headers.append('accept', "application/json");
    let options = new RequestOptions({   headers: headers  });
    let param=JSON.stringify({ })  
    return this.http.post(this.SERVER_HOST + '/api/users/'+localStorage['username']+'/endorse',{  provider: ProviderId,service:serviceTittle }, options)
      .map((response: Response) => { 
        if (response.status == 200) {
          return true;     
        }
        if (response.status == 500) {
          return true;     
        } 
        else {
          return false;
        } 
      })
      // .catch(err => {
      //   return Observable.throw(err);
      // });
  }


}
