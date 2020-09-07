import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SocialNetworkService } from './social-network.service';

@Injectable({
  providedIn: 'root'
})
export class LinkedinManagerService{

  private linkedinAppID: string;
  private linkedinAppSecret: string;
  private redirect_uri: string;
  private scope: any;

  public isUserAuthenticated;
  redirect_uri_encode: any;
  headers : HttpHeaders;
  settingsApp: any;
  
  constructor(private http: HttpClient, private snService : SocialNetworkService) {
    this.snService.getAppByLabel("LinkedIn").subscribe(
      (res : any) => {
      console.log(res);
      this.settingsApp = res
    this.linkedinAppID = res.AppID ;
    this.linkedinAppSecret = res.KeySecret;
    });
    this.redirect_uri = "https://social-network-a297a.firebaseapp.com/__/auth/handler";
    this.redirect_uri_encode = "http%3A%2F%2Flocalhost%3A4200%2Fhome%2Fsocial-networks";
    this.scope = "r_emailaddress%20r_liteprofile%20w_member_social%20w_organization_social%20r_organization_social%20r_basicprofile";
  }

  login() {
    return this.http.get("https://www.linkedin.com/oauth/v2/authorization?response_type=code&state=DCEeFWf45A53sdfKef424&client_id=" + this.linkedinAppID + "&redirect_uri=" + this.redirect_uri_encode + "&scope=" + this.scope);
  }

  getAccessToken(code: any) {
    console.log(code);
    
    return this.http.post("https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code" + "&code=" + code + "&redirect_uri=" + this.redirect_uri_encode + "&client_id=" + this.linkedinAppID + "&client_secret=" + this.linkedinAppSecret, code);
  }

  callMeAPI(token : any){
    return this.http.get("https://api.linkedin.com/v2/me?oauth2_access_token=" + token);
  }

  publishPostLink(body : any, token : any){ 
    return this.http.get("https://127.0.0.1:8000/linkedinApi/post/" + token+"/"+JSON.stringify(body));
  }

}
