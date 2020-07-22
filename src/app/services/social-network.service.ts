import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class SocialNetworkService {

  constructor(private http : HttpClient , private afAuth : AngularFireAuth) { }

  getAllSN(){
    return this.http.get('https://localhost:8000/api/social_networks');
  }
  loginwithFacebook(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      //provider.addScope('user_birthday');
      
      //provider.addScope();
      this.afAuth
      .signInWithPopup(provider)
      .then(res => {
      resolve(res);
      //var token = res.credential.accessToken;
      console.log(res)
      })
      })
  }
}
