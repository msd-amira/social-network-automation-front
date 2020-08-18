import { Component, OnInit } from '@angular/core';
import { SocialNetworkService } from '../services/social-network.service';
import { FacebookManagerService } from '../services/facebook-manager.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facebook-manager',
  templateUrl: './facebook-manager.component.html',
  styleUrls: ['./facebook-manager.component.css']
})
export class FacebookManagerComponent implements OnInit {
  user: any;
  loginFB : any;
  itemPage : any;
  listSocials: any[];
  listPages: any[];
  selectedItem: string;
  pageId : string;
  textPost : string;
  constructor(private snService: SocialNetworkService, private fbService: FacebookManagerService) { }

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
          console.log("element");
    
          switch (element.labelNetwork) {
            case 'Facebook':
              {
                console.log("element.labelNetwork");
                this.loginFB = JSON.parse(localStorage.getItem("loginFB"));
                this.fbService.getPagesAccessToken(this.loginFB.longAccesstoken).subscribe(
                  async (res: any) => {
                    console.log("Pages Facebook\n", res);
                    this.listPages = res.data;
                  }
                );
                break;
              }
    
            default:
              break;
          }
        });
      }
    );



  }

  publish(){
    
    console.log(this.pageId);
    
    if ((this.pageId == "none" ) || ! this.pageId) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You must choose a page!',
      })
    } else {
      let page : any ;
      this.listPages.forEach(element => {
        if (element.id == this.pageId) {
          page = element;
        }
      });
      this.fbService.publishPostPageFB(page,this.textPost).subscribe(
        (res : any) =>{
          console.log(res);
          
        }
      );
    }
    
  }

}
