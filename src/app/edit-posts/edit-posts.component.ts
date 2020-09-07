import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { SocialNetworkService } from '../services/social-network.service';
import { FacebookManagerService } from '../services/facebook-manager.service';
import { LinkedinManagerService } from '../services/linkedin-manager.service';
import Swal from 'sweetalert2';
import { PaginationInstance } from 'ngx-pagination';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-posts',
  templateUrl: './edit-posts.component.html',
  styleUrls: ['./edit-posts.component.css']
})
export class EditPostsComponent implements OnInit, PaginationInstance {
  user: any;
  listSocials: any;
  selectedItem: any;
  loginFB: any;
  listPages: any[];
  listFeeds: any[];
  pageId: string;
  loginIN: any;
  socialChoice: string;
  showFacebook: boolean;
  page: any;
  pagging: any[];
  posts: any[];
  textPost: string;
  postEdit: any;
   bsModalRef: BsModalRef | null;
  constructor(
    private userService: UserService,
    private snService: SocialNetworkService,
    private fbService: FacebookManagerService,
    private linkService: LinkedinManagerService,
    private modalService : BsModalService) { }
  id?: string;
  itemsPerPage: number;
  currentPage: number;
  totalItems?: number;
  p: any;


  ngOnInit(): void {
    this.textPost = "";
    this.user = JSON.parse(localStorage.getItem("user"));
    this.snService.getSnByID(this.user.id).subscribe(
      async (res: any) => {
        this.listSocials = await res["hydra:member"];
        //this.selectedItem = await this.listSocials[0].labelNetwork;
        console.log("List social network's user \n", this.listSocials);
        this.listSocials.forEach((element: any) => {
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

  feedsShow() {

    this.showFacebook = false;

    switch (this.socialChoice) {
      case "Facebook":
        this.showFacebook = true;
        //this.listPages = this.loginFB.pages;
        break;
        case "LinkedIn":
          this.showLinkFeeds();
      default:
        this.showFacebook = false;
        break;
    }
  }
  showLinkFeeds() {
    throw new Error("Method not implemented.");
  }

  showFbFeeds() {

    this.listPages.forEach(element => {
      if (element.id == this.pageId) {
        this.page = element;
        console.log(this.page);

        this.fbService.getFeedsPage(this.page).subscribe(
          (res: any) => {
            this.posts = res.data;
            this.pagging = res.paging;
            console.log(this.posts);
            console.log(this.pagging);
          }
        )
      }
    });

  }
  
  closeModal(modalId?: number){
    console.log(this.textPost);
    console.log(this.selectedItem);
    
    this.modalService.hide(modalId);
  }
  openModal(template: TemplateRef<any>, item : any) {
    this.textPost = item.message;
    this.selectedItem = item.id;
    this.bsModalRef = this.modalService.show(template, { id: 1, class: 'modal-lg' });
  }

  editPost() {
    console.log(this.selectedItem);
    console.log(this.textPost);
    if ((this.textPost == "") || !this.textPost) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You must write something !',
      })
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Your post will be edit !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, edit it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {
          this.fbService.updatePostPage(this.page,this.selectedItem,this.textPost).subscribe(
            (res : any) => {
              console.log(res);
              Swal.fire(
                'Edited!',
                'Your post has been edited.',
                'success'
              ).then((resultdelete) => {
                this.modalService.hide(1);
                this.showFbFeeds();
              }
  
              )
            }
          )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your action is cancelled)',
            'info'
          )
        }
      })
    }

  }

  deletePost(id: any) {
    console.log(id);
    console.log(this.page);

    Swal.fire({
      title: 'Are you sure?',
      text: 'Your post will delete forever !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.fbService.deletePostPage(this.page, id).subscribe(
          (res: any) => {
            Swal.fire(
              'Deleted!',
              'Your post has been deleted.',
              'success'
            ).then((resultdelete) => {
              this.showFbFeeds();
            }

            )
          }
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your action is cancelled :)',
          'info'
        )
      }
    })
  }


}
