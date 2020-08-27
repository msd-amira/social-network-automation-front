import { Component, OnInit } from '@angular/core';
import { FacebookManagerService } from '../services/facebook-manager.service';
import { SocialNetworkService } from '../services/social-network.service';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {

  user: any;
  loginFB: any;
  itemPage: any;
  listSocials: any[];
  listPages: any[];
  pageId: string;
  embededPosts: any[];

  constructor(private userService: UserService, private snService: SocialNetworkService, private fbService: FacebookManagerService) { }

  async ngOnInit(): Promise<any> {
    this.listSocials = []
    this.embededPosts = []
    this.user = JSON.parse(localStorage.getItem("user"));
    this.snService.getSnByID(this.user.id).subscribe(
      async (res: any) => {
        this.listSocials = await res["hydra:member"];
        console.log("List social network's user \n", this.listSocials);
        this.listSocials.forEach(element => {

          switch (element.labelNetwork) {
            case 'Facebook':
              {
                this.loginFB = JSON.parse(localStorage.getItem("loginFB"));
                this.fbService.getPagesAccessToken(this.loginFB.longAccesstoken).subscribe(
                  async (res: any) => {
                    console.log("Pages Facebook\n", res);
                    this.listPages = res.data;
                  }
                );
                break;
              }
            case 'Instagram':
              {
                break;
              }
            case 'LinkedIn':
              {
                break;
              }
            case 'pinterest':
              {
                break;
              }
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
  feedsShow() {

    console.log(this.pageId);
    if ((this.pageId == "none") || !this.pageId) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You must choose a page!',
      })
    } else {
      let page: any;

      this.listPages.forEach(element => {
        if (element.id == this.pageId) {
          page = element;
        }
      });

      this.fbService.getFeedsPage(page).subscribe(
        (res: any) => {
          console.log(res);
          this.embededPosts = res.data;
        }
      );
    }

  }

}
