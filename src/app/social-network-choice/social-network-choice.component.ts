import { Component, OnInit } from '@angular/core';
import { SocialNetwork } from "../Models/SocialNetwork";
import { SocialNetworkService } from "../services/social-network.service";
import { FacebookManagerService } from "../services/facebook-manager.service";
import { UserHasSN } from '../Models/UserHasSN';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';
//import {Facebook} from 'fb';

@Component({
  selector: 'app-social-network-choice',
  templateUrl: './social-network-choice.component.html',
  styleUrls: ['./social-network-choice.component.css']
})
export class SocialNetworkChoiceComponent implements OnInit {

  snList: SocialNetwork[];
  userSN: UserHasSN;
  idSocialNetwork: Number;
  FB: any;
  accessToken: any;
  constructor(private snService: SocialNetworkService, private fbService: FacebookManagerService, private userService: UserService, private router: Router) {
    this.snList = new Array();
    // this.userSN = new UserHasSN();
    // this.FB = new Facebook();
    // this.FB.options({version: 'v7.0'});
  }

  async ngOnInit(): Promise<any> {
    this.snService.getAllSN().subscribe(async (res: any) => {
      //console.log(res);
      this.snList = await res['hydra:member'];
      this.userSN = new UserHasSN();
      this.idSocialNetwork = null;
      this.accessToken = null;
    })
  }

  logout() {
    this.userService.logoutUser();
  }
  selectItem(id: any) {
    this.idSocialNetwork = id;
    console.log(id);
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
                        //this.router.navigate(['/home']);
                        
    //let authResponse = JSON.parse(localStorage.getItem('loginFB'));
                      },
                      (error: any) => {
                        console.error(error);
                      }
                    );
                  }
                }
              )


            },
            (err: any) => {
              console.error(err);

            }
          )
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You are already loggedIn !',

      });
    }

  }


  linkedin_signin(item: any) {
    console.log(item);
  }

  instagram_signin(item: any) {
    console.log(item);
  }

  pinterest_signin(item: any) {
    console.log(item);
  }

  async postFB(page,msg): Promise<any> {

    //console.log(authResponse.authResponse)
    this.fbService.postsPageFB(page,msg).subscribe(
      async (resPost: any) => {
        console.log(resPost);
      },
      (error: any) => {
        console.error(error);
      }
    );


    //  var body = 'My first post using facebook-node-sdk';
    //  this.FB.api('me/feed', 'post', { message: body }, function (res) {
    //   if(!res || res.error) {
    //     console.log(!res ? 'error occurred' : res.error);
    //     return;
    //   }
    //   console.log('Post Id: ' + res.id);
    // });
  }
  async feedsFB(): Promise<any> {

    let authResponse = JSON.parse(localStorage.getItem('loginFB'));
    //console.log(authResponse.authResponse)
    this.fbService.feedsFB(authResponse).subscribe(
      async (resPost: any) => {
        console.log(resPost);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
