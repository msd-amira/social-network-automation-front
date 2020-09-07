import { Injectable } from '@angular/core';
import { InitParams, FacebookService, LoginOptions, LoginResponse } from 'ngx-facebook';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SocialNetworkService } from './social-network.service';

@Injectable({
  providedIn : 'root'
})
export class FacebookManagerService {

  private facebookUrlAuthorizeBase : string;
  private facebookUrlGetTokenBase : string;
  private facebookAppID : string;
  private facebookAppSecret : string;
  settingsApp: any;

  constructor(private http : HttpClient, private fb : FacebookService, private router : Router, private snService : SocialNetworkService) {

    this.facebookUrlAuthorizeBase = "https://graph.facebook.com/oauth/authorize";
    this.facebookUrlGetTokenBase = "https://graph.facebook.com/oauth/access_token";
    this.snService.getAppByLabel("Facebook").subscribe(
      (res : any) => {
      console.log(res);
      this.settingsApp = res
    this.facebookAppID = res.AppID ;
    this.facebookAppSecret = res.KeySecret;
    });
    // const initParams : InitParams = {
    //   appId : '227386015000000',
    //   xfbml : true,
    //   version : 'v7.0'
    // };

    // this.fb.init(initParams);
  }
  async loginWithFacebook() {
    const options : LoginOptions = {
      //permissions :
      scope : 'public_profile,user_friends,email,pages_show_list,publish_to_groups,user_posts,user_status,pages_read_engagement,pages_manage_posts,pages_show_list,user_tagged_places,user_photos',
      // "pages_manage_posts" and "pages_read_engagement" are permissions of posting to page which your admin in 
      // "pages_show_list"  : list all pages that a person manages 
      return_scopes : true,
      enable_profile_selector : true
    };
    return new Promise<any>((resolve, reject) => {
      this.fb.login(options)
        .then((response : LoginResponse) => {
          // console.log(response);
          resolve(response);
          this.router.navigate(['/social-networks']);
        })
        .catch((error : any) => {
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

  getLongUserAccessToken(shortUserAccessToken  : any){
    return this.http.get("https://graph.facebook.com/v8.0/oauth/access_token?grant_type=fb_exchange_token&client_id=" + this.facebookAppID+ "&client_secret=" + this.facebookAppSecret+"&fb_exchange_token="+shortUserAccessToken);
  }

  getPagesAccessToken (longUsertoken  : any){
    return this.http.get("https://graph.facebook.com/v8.0/2470424083256688/accounts?fields=name,access_token,link&access_token=" + longUsertoken);
  }

  feedsFB(authResponse  : any) {
    return this.http.get("https://graph.facebook.com/"+authResponse.userSNId+"/feed?access_token=" + authResponse.longAccesstoken);
  }
  
  getPostsUserFB(authResponse  : any) {
    return this.http.get("https://graph.facebook.com/me/feed?access_token=" + authResponse.longAccesstoken);
  }

  getFeedsPage(page : any){
    return this.http.get("https://graph.facebook.com/" + page.id + "/feed?fields=permalink_url,message&access_token=" +  page.access_token);
  }

  getUnpublishFeedsPage(page : any){
    return this.http.get("https://graph.facebook.com/" + page.id + "/feed?fields=permalink_url,message,is_published=false&access_token=" +  page.access_token);
  }
  getNExtFeeds(url : any){
    return this.http.get(url);
  }

  publishPostPageFB(page : any, msg : any){
    return this.http.post("https://graph.facebook.com/" + page.id + "/feed?message=" + msg + "&access_token=" + page.access_token, msg);
  }

  publishLinkPageFB(page : any, msg : any, link : any){
    return this.http.post("https://graph.facebook.com/" + page.id + "/feed?message=" + msg + "&link" + link + "&access_token=" + page.access_token, msg);
  }
  
  publishPhotoPageFB(page : any, url : any){
    return this.http.post("https://graph.facebook.com/" + page.id + "/photos?url=" + url + "&access_token=" + page.access_token, url);
  }
  
  unpublishedPostPageFB(page : any, msg : any){
    return this.http.post("https://graph.facebook.com/" + page.id + "/feed?published=false" + "&message=" + msg   + "&access_token=" + page.access_token, msg);
  }
  
  publishUnpublishedPostPageFB(idPost : any){
    return this.http.post("https://graph.facebook.com/" + idPost + "/feed?published=true",idPost);
  }

  schedulePostPageFB(page : any, msg : any, schedulePost : any){
    return this.http.post("https://graph.facebook.com/" + page.id + "/feed?published=false" + "&message=" + msg + "&scheduled_publish_time=" + schedulePost + "&access_token=" + page.access_token ,msg)
  }

  updatePostPage(page : any, idPost : any, msg : any){
    return this.http.post("https://graph.facebook.com/" + idPost + "?message=" + msg + "&access_token=" + page.access_token , msg);
  }

  deletePostPage(page : any, idPost : any){
    return this.http.delete("https://graph.facebook.com/v8.0/" + idPost + "?access_token=" + page.access_token);
  }
}
