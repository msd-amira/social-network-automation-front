import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LinkedinManagerService {

  private linkedinAppID: string;
  private linkedinAppSecret: string;
  private redirect_uri: string;
  private scope: any;

  public isUserAuthenticated;
  redirect_uri_encode: any;

  constructor(private http: HttpClient) {
    this.linkedinAppID = "77sa1axizmvjyj";
    this.linkedinAppSecret = "r7zWII6rAfEYWZLw";
    this.redirect_uri = "https://social-network-a297a.firebaseapp.com/__/auth/handler";
    this.redirect_uri_encode = "http%3A%2F%2Flocalhost%3A4200%2Fhome%2Fsocial-networks";
    this.scope = "r_emailaddress%20r_liteprofile%20w_member_social"
  }


  login() {
    return this.http.get("https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=" + this.linkedinAppID + "&redirect_uri=" + this.redirect_uri_encode + "&scope=" + this.scope);
  }

  getAccessToken(code: any) {
    let headerReq = { "Content-Type": "application/x-www-form-urlencoded" };
    //grant_type=authorization_code
    //&code={authorization_code_from_step2_response}
    //&redirect_uri=hhttps%3A%2F%2Fdev.example.com%2Fauth%2Flinkedin%2Fcallback
    //&client_id={your_client_id}
    //&client_secret={your_client_secret}
    return this.http.post("https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code" + "&code=" + code + "&redirect_uri=" + this.redirect_uri_encode + "&client_id=" + this.linkedinAppID + "&client_secret=" + this.linkedinAppSecret, code);
  }

  callMeAPI(token){
    return this.http.get("https://api.linkedin.com/v2/me?oauth2_access_token="+token);
  }

  publishPostLink(body : any){
  return this.http.post("POST https://api.linkedin.com/v2/ugcPosts", body);
  }

}
