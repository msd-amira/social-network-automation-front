import { Component, OnInit } from '@angular/core';
import { SocialNetworkService } from '../services/social-network.service';
import { FacebookManagerService } from '../services/facebook-manager.service';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';
import { BodyPostLink } from "../Models/BodyPostLink";
import { LinkedinManagerService } from '../services/linkedin-manager.service';

@Component({
  selector: 'app-publish-post',
  templateUrl: './publish-post.component.html',
  styleUrls: ['./publish-post.component.css']
})
export class PublishPostComponent implements OnInit {
  user: any;
  loginFB: any;
  itemPage: any;
  listSocials: any[];
  listPages: any[];
  selectedItem: string;
  pageId: string;
  textPost: string;
  schedulePost: any;
  loginIN: any;
  subjectPost: string;

  constructor(private userService: UserService, private snService: SocialNetworkService, private fbService: FacebookManagerService, private linkService: LinkedinManagerService) { }

  async ngOnInit(): Promise<any> {
    this.listSocials = []
    this.textPost = null
    this.user = JSON.parse(localStorage.getItem("user"));
    this.snService.getSnByID(this.user.id).subscribe(
      async (res: any) => {
        this.listSocials = await res["hydra:member"];
        this.selectedItem = await this.listSocials[0].labelNetwork;
        console.log("List social network's user \n", this.listSocials);
        this.listSocials.forEach(element => {
          switch (element.labelNetwork) {
            case 'Facebook':
              this.loginFB = JSON.parse(localStorage.getItem("loginFB"));
              this.fbService.getPagesAccessToken(this.loginFB.longAccesstoken).subscribe(
                async (res: any) => {
                  console.log("Pages Facebook\n", res);
                  this.listPages = res.data;
                }
              );
              break;

            case 'LinkedIn':
              this.loginIN = JSON.parse(localStorage.getItem("loginIN"));
              break;

            default:
              break;
          }
        });
      }
    );



  }

  logout() {
    this.userService.logoutUser();
  }

  publishFB() {

    console.log(this.pageId);

    if ((this.pageId == "none") || !this.pageId) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You must choose a page!',
      })
    } else if (!this.textPost) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You must write something !',
      })
    }
    else {
      let page: any;
      this.listPages.forEach(element => {
        if (element.id == this.pageId) {
          page = element;
        }
      });

      if (this.schedulePost) {
        console.log("schedulePost date\n", this.schedulePost);
        this.fbService.schedulePostPageFB(page, this.textPost, this.schedulePost).subscribe(
          async (res: any) => {
            console.log(res);
            await Swal.fire({
              icon: 'success',
              title: 'Success...',
              text: 'Your post is scheduled at ' + this.schedulePost + ' !',
            })
            await this.ngOnInit();
          }
        )
      }
      else {

        this.fbService.publishPostPageFB(page, this.textPost).subscribe(
          async (res: any) => {
            console.log(res);
            await Swal.fire({
              icon: 'success',
              title: 'Success...',
              text: 'Your post is published successfully !',
            })
            await this.ngOnInit();
          }
        );
      }
    }

  }

  publishLink(visibility : any) {

    console.log(this.textPost);
console.log(visibility);

    // var body: BodyPostLink;
    // body = new BodyPostLink(this.loginIN.userSNId,"PUBLISHED",this.textPost,"NONE","PUBLIC");

    // var test = {
    //   "author": "urn:li:person:" + this.loginIN.userSNId,
    //   "lifecycleState": "PUBLISHED",
    //   "specificContent": {
    //     "com.linkedin.ugc.ShareContent": {
    //       "shareCommentary": {
    //         "text": "this.textPost"
    //       },
    //       "shareMediaCategory": "NONE"
    //     }
    //   },
    //   "visibility": {
    //     "com.linkedin.ugc.MemberNetworkVisibility": "CONNECTIONS"
    //   }
    // }
    if (this.textPost && this.subjectPost) {
      var visibilityConnection : boolean;
      switch (visibility) {
        case "PUBLIC":
          visibilityConnection = true
          break;
      
        default:
          visibilityConnection = false;
          break;
      }
      var body: any;
      body = {
        "distribution": {
          "linkedInDistributionTarget": {
            "visibleToGuest" : visibilityConnection
          }
        },
        "owner": "urn:li:person:" + this.loginIN.userSNId, 
        "subject": this.subjectPost,
        "text": {
          "text": this.textPost
        }
      }
      console.log(body);
      
      this.linkService.publishPostLink(body, this.loginIN.longAccesstoken).subscribe(
        (res: any) => {
          console.log(res);
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You must write something to share it !',
      })
    }
  }

}
