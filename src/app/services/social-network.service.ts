import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import { FacebookService, InitParams, LoginResponse, LoginOptions } from 'ngx-facebook';

@Injectable({
  providedIn: 'root'
})
export class SocialNetworkService {

  constructor(private http : HttpClient , private afAuth : AngularFireAuth, private fb: FacebookService) {
    
   }

  getAllSN(){
    return this.http.get('https://localhost:8000/api/social_networks');
  }

  getSnByID(id: string){
    return this.http.get('https://localhost:8000/api/user_has_sns/'+id);
  }

  addUserHasSN(body){
    return this.http.post('https://localhost:8000/api/user_has_sns',body);
  }

  addAppDev(id : any, key : any, label : any){ 
    return this.http.get("https://127.0.0.1:8000/appDev/addSetting/" + id+"/"+key+"/"+label);
  }
  getAppByLabel(label : any){ 
    return this.http.get("https://127.0.0.1:8000/appDev/getSetting/" +label);
  }
}
