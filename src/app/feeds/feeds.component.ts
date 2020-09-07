import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FacebookManagerService } from '../services/facebook-manager.service';
import { SocialNetworkService } from '../services/social-network.service';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';
import { DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit, PipeTransform  {

  user: any;
  loginFB: any;
  itemPage: any;
  listSocials: any[];
  listPages: any[];
  pageId: string="100869335066617";
  namepage='https://www.facebook.com/100869335066617';
  embededPosts: any[];
  hrefPage: any;
  page: any;
  pageName: any;
  url: any;
  link: any;
  test: any;

  constructor(private userService: UserService, private snService: SocialNetworkService, private fbService: FacebookManagerService, private sanitizer: DomSanitizer) {
    
   
   }
  // transform(value: any, ...args: any[]) {
  //   throw new Error("Method not implemented.");
  // }
  
  transform(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  async ngOnInit(): Promise<any> {
    this.listSocials = [];
    this.embededPosts = [];
    this.test = "https://www.facebook.com/100869335066617";
    console.log("log link",this.link);
    
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
                    //this.pageId = this.listPages[0].id;
                    this.pageName = this.listPages[0].name;
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

  urlPlugin(){
    return "https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F" + this.pageId + "%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=227386015000000"

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
      

      this.listPages.forEach(element => {
        if (element.id == this.pageId) {
          this.page = element;
          this.url = this.transform("https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F" + this.pageId + "&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=227386015000000");
        }
      });
     // this.urlPlugin();
     // this.hrefPage = "https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F" + this.pageId + "%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=227386015000000"
      // this.fbService.getFeedsPage(page).subscribe(
      //   (res: any) => {
      //     console.log(res.data);
      //     this.embededPosts = res.data;
      //   }
      // );
    }

  }


}
