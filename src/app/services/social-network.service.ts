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

  // ******************* Facebook Services ******************


  // loginwithFacebook(){
  //   return new Promise<any>((resolve, reject) => {
  //     let provider = new firebase.auth.FacebookAuthProvider();
  //     //provider.addScope('user_birthday');
      
  //     //provider.addScope();
  //     this.afAuth
  //     .signInWithPopup(provider)
  //     .then(res => {
  //     resolve(res);
  //     console.log(res)
  //     })
  //     })
  // }


  addUserHasSN(body){
    return this.http.post('https://localhost:8000/api/user_has_sns',body);
  }
}
