import { Injectable } from '@angular/core';
import { AuthResponse, InitParams, FacebookService, LoginOptions, LoginResponse } from 'ngx-facebook';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FacebookManagerService {

  public facebookUrlAuthorizeBase: string;
  public facebookUrlGetTokenBase: string;
  public facebookAppID: string;
  public facebookAppSecret: string;


  constructor(private http: HttpClient, private fb: FacebookService, private router: Router) {

    this.facebookUrlAuthorizeBase = "https://graph.facebook.com/oauth/authorize";
    this.facebookUrlGetTokenBase = "https://graph.facebook.com/oauth/access_token";
    this.facebookAppID = "227386015000000";
    this.facebookAppSecret = "88284a8a1dc34c19415d16ad71f79a25";

    const initParams: InitParams = {
      appId: '227386015000000',
      xfbml: true,
      version: 'v7.0'
    };

    fb.init(initParams);
  }

  async loginWithFacebook() {
    const options: LoginOptions = {
      //permissions :
      scope: 'public_profile,user_friends,email,pages_show_list,publish_to_groups,user_posts,user_status,pages_read_engagement,pages_manage_posts,pages_show_list,user_tagged_places,user_photos',
      // "pages_manage_posts" and "pages_read_engagement" are permissions of posting to page which your admin in 
      // "pages_show_list" : list all pages that a person manages 
      return_scopes: true,
      enable_profile_selector: true
    };
    return new Promise<any>((resolve, reject) => {
      this.fb.login(options)
        .then((response: LoginResponse) => {
          // console.log(response);
          resolve(response);
          this.router.navigate(['/social-networks']);
        })
        .catch((error: any) => {
          console.error(error);
          reject(error)
        });
    })
  }

  /**
 * getAccessToken
 */
  getAppAccessToken() {
    let urlGetAccessToken = this.facebookUrlGetTokenBase;
    urlGetAccessToken += "?client_id=" + this.facebookAppID;
    urlGetAccessToken += "&client_secret=" + this.facebookAppSecret;
    urlGetAccessToken += "&grant_type=client_credentials";
    return this.http.get(urlGetAccessToken);

  }

  getLongUserAccessToken(shortUserAccessToken : any){
    return this.http.get("https://graph.facebook.com/v8.0/oauth/access_token?grant_type=fb_exchange_token&client_id=" + this.facebookAppID+ "&client_secret=" + this.facebookAppSecret+"&fb_exchange_token="+shortUserAccessToken);
  }

  getPagesAccessToken (longUsertoken : any){
    return this.http.get("https://graph.facebook.com/v8.0/2470424083256688/accounts?fields=name,access_token&access_token=" + longUsertoken);
  }

  GetStatusFB() {
    const authResponse: AuthResponse = this.fb.getAuthResponse();
    console.log(authResponse);
    // /?message="+msg+"&accessToken="+authResponse["accessToken"]
    let msg = "fdmkfmdvdvdfvdfvdd";
    console.log("https://graph.facebook.com/me/feed?access_token=" + authResponse["accessToken"]);

    this.http.get("https://graph.facebook.com/v8.0/me/feed?access_token=" + authResponse["accessToken"]);

  }

  feedsFB(authResponse) {
    //const authResponse: AuthResponse =  this.fb.getAuthResponse();
    // let urlGetAccessToken = this.getAccessToken();
    // console.log(urlGetAccessToken);
    //let resTokens =  this.getAccessToken();
    console.log(authResponse);
    
    return this.http.get("https://graph.facebook.com/"+authResponse.userSNId+"/feed?access_token=" + authResponse.longAccesstoken);
  }

  postsUserFB(authResponse) {
    // console.log(authResponse);
    //return this.http.post("https://graph.facebook.com/v7.0/"+authResponse.userSNId+"/feed?message=" + msg + "&access_token=" + pageToken[0].access_token, msg);
    return this.http.get("https://graph.facebook.com/me/feed?access_token=" + authResponse.longAccesstoken);
  }

  postsPageFB(page,msg){
    //return this.http.get("https://graph.facebook.com/"+authResponse.userSNId+"/feed?access_token=" + authResponse.longAccesstoken);
    return this.http.post("https://graph.facebook.com/"+page.id+"/feed?message=" + msg + "&access_token=" + page.access_token, msg);
  }
}
