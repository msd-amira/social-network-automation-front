import { Component, OnInit } from '@angular/core';
import { SocialNetwork } from "../Models/SocialNetwork";
import { SocialNetworkService } from "../services/social-network.service";
import { FacebookManagerService } from "../services/facebook-manager.service";
import { LinkedinManagerService } from "../services/linkedin-manager.service";
import { UserHasSN } from '../Models/UserHasSN';
import { Router, ActivatedRoute, NavigationCancel } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';
//import {Facebook} from 'fb';
//import {  } from "auth0-js";
import { } from '@angular/router';

@Component({
  selector: 'app-social-network-choice',
  templateUrl: './social-network-choice.component.html',
  styleUrls: ['./social-network-choice.component.css']
})
export class SocialNetworkChoiceComponent implements OnInit {

  snList: SocialNetwork[];
  userSN: UserHasSN;
  FB: any;
  imgLogo: string;
  itemLinkedin: any;
  
  constructor(private snService: SocialNetworkService, private fbService: FacebookManagerService, private userService: UserService, private linkService: LinkedinManagerService, /*auth: AuthService,*/ private router: Router, private activatedRoute: ActivatedRoute) {
    this.snList = new Array();
  }

  async ngOnInit(): Promise<any> {

    this.snService.getAllSN().subscribe(async (res: any) => {
      //console.log(res);
      this.snList = await res['hydra:member'];
      let codeOauth = this.activatedRoute.snapshot.queryParamMap.get('code');
      if (codeOauth) {
        console.log(codeOauth);
        
        this.addLinkedin(codeOauth, true);
      }

      let cancelLogin = this.activatedRoute.snapshot.queryParamMap.get('error');
      if (cancelLogin) {
        console.log(cancelLogin);
        
        this.addLinkedin(cancelLogin, false);
      }
      this.userSN = new UserHasSN();
    });
    this.imgLogo = "assets/images/";
  }

  logout() {
    this.userService.logoutUser();
  }

  async getItemByLabel(label: string): Promise<any> {
    console.log("getItemByLabel", this.snList);
    var item: any;
    this.snList.forEach(async element => {
      if (element.label == label) {
        console.log(element);
        item = element;
        return item;
      }
    });
    return null;
  }

  async addUserHAsSn(userSNId: string, longAccesstoken: string, labelNetwork: string, pages: string, photo = null, socialNetworksId: any, userId: any): Promise<any> {
    let addUser = new UserHasSN();
    addUser['userSNId'] = userSNId;
    addUser['longAccesstoken'] = longAccesstoken;
    addUser['labelNetwork'] = labelNetwork;
    addUser['pages'] = pages;
    addUser['photo'] = photo;
    addUser['socialNetworksId'] = socialNetworksId;
    addUser['userId'] = userId;
    return addUser;
  }

  async facebook_signin(itemSN: any): Promise<any> {
    //console.log(itemSN);
    var token: any
    let tokenFB = localStorage.getItem("loginFB");
    if (!(tokenFB)) {
      this.fbService.loginWithFacebook()
        .then(async (resLoginFB) => {
          console.log("login with facebook result \n", resLoginFB);
          token = JSON.parse(localStorage.getItem('user'));

          this.fbService.getLongUserAccessToken(resLoginFB['authResponse'].accessToken).subscribe(
            async (resLongToken: any) => {

              console.log("getLongUserAccessToken \n", resLongToken);
              let LongaccessToken = await resLongToken.access_token;

              this.fbService.getPagesAccessToken(LongaccessToken).subscribe(
                async (resPageToken: any) => {
                  console.log(resPageToken.data == null);

                  if (!Object.keys(resPageToken.data).length) {
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'You must have at least one page Facebook !',

                    }).then(async (result) => {
                      await this.ngOnInit();
                    });
                  }
                  else {
                    console.log("Pages's dataaaaa user result \n", resPageToken.data);

                    this.userSN = await this.addUserHAsSn(resLoginFB['authResponse'].userID, LongaccessToken, "Facebook", JSON.stringify(resPageToken.data), null, itemSN['@id'], token['@id']);
                    console.log(this.userSN);

                    this.snService.addUserHasSN(this.userSN).subscribe(
                      async (res: any) => {
                        console.log("add UserHasSN result \n", res);
                        localStorage.setItem("loginFB", JSON.stringify(res));
                        this.router.navigate(['/home/social-networks']);
                      },
                      (error: any) => {
                        console.error(error);
                      }
                    );
                  }
                }
              );
            },
            (err: any) => {
              console.error(err);
            }
          );
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You are already loggedIn !',

      });
    }

  }

  async linkedin_signin(item: any): Promise<any> {
    let tokenIN = localStorage.getItem("loginIN");
    if (!tokenIN) {
      let linkedinAppID = "77sa1axizmvjyj";
      let redirect_uri_encode = "http%3A%2F%2Flocalhost%3A4200%2Fhome%2Fsocial-networks";
      let scope = "r_emailaddress%20r_liteprofile%20w_member_social";
      window.location.href = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=" + linkedinAppID + "&redirect_uri=" + redirect_uri_encode + "&scope=" + scope;

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You are already loggedIn !',

      }).then(async (result) => {
        await this.ngOnInit();
      });
    }
    // ("https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id="+ linkedinAppID + "&redirect_uri=" + redirect_uri_encode + "&scope=" + scope);

  }

  async addLinkedin(codeOauth: any, state: boolean): Promise<any> {

    var item: any;

    if (state) {
      console.log("login succes with code: \n", codeOauth);
      this.linkService.getAccessToken(codeOauth).subscribe(
        async (resToken: any) => {
          this.linkService.callMeAPI(resToken.access_token).subscribe(
            async (resUser: any) => {
              console.log(resUser);

              item = await this.getItemByLabel("LinkedIn");
              console.log(item);

              let token = JSON.parse(localStorage.getItem('user'));

              this.userSN = await this.addUserHAsSn(resUser.id, resToken.access_token, "LinkedIn", "", "", "/api/social_networks/2", token['@id'])

              this.snService.addUserHasSN(this.userSN).subscribe(
                async (res: any) => {
                  localStorage.setItem("loginIN", JSON.stringify(res));
                  await this.router.navigate(['/home/social-networks']);
                }
              );
            }
          );
        }
      );
    } else {
      console.log("login error with error: \n", codeOauth);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: codeOauth,
      }).then(async (result) => {
        await this.router.navigate(['/home/social-networks']);
      });
    }
  }

  instagram_signin(item: any) {
    console.log(item.label);
  }

  pinterest_signin(item: any) {
    console.log(item);
  }

  // async postFB(): Promise<any> {

  //   let authResponse = JSON.parse(localStorage.getItem('loginFB'));
  //   let pages = JSON.parse(authResponse.pages)
  //   console.log("Pages'user\n", pages);
  //   this.fbService.publishPostPageFB(pages[0], "lsdc,dk,sm").subscribe(
  //     async (resPost: any) => {
  //       console.log(resPost);
  //     },
  //     (error: any) => {
  //       console.error(error);
  //     }
  //   );


  //  var body = 'My first post using facebook-node-sdk';
  //  this.FB.api('me/feed', 'post', { message: body }, function (res) {
  //   if(!res || res.error) {
  //     console.log(!res ? 'error occurred' : res.error);
  //     return;
  //   }
  //   console.log('Post Id: ' + res.id);
  // });
  // }
  // async feedsFB(): Promise<any> {

  //   let authResponse = JSON.parse(localStorage.getItem('loginFB'));
  //   //console.log(authResponse.authResponse)
  //   this.fbService.feedsFB(authResponse).subscribe(
  //     async (resPost: any) => {
  //       console.log(resPost);
  //     },
  //     (error: any) => {
  //       console.error(error);
  //     }
  //   );
  // }
}
