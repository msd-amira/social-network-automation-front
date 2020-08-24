import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LinkedinManagerService {

  private linkedinAppID: string;
  //private linkedinAppSecret: string;
  private redirect_uri: string;
  private scope: any;
  constructor(private http: HttpClient) {
    this.linkedinAppID = "77sa1axizmvjyj";
    //this.linkedinAppSecret = "r7zWII6rAfEYWZLw";
    this.redirect_uri = "https://social-network-a297a.firebaseapp.com/__/auth/handler";
    this.scope = "r_emailaddress%20r_liteprofile%20w_member_social"
  }

  login() {
    //GET https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id={your_client_id}
    //&redirect_uri=https%3A%2F%2Fdev.example.com%2Fauth%2Flinkedin%2Fcallback&state=fooobar
    //&scope=r_liteprofile%20r_emailaddress%20w_member_social
    return this.http.get("https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=" + this.linkedinAppID + "&redirect_uri=" + this.redirect_uri + "&scope=" + this.scope);
  }
}
