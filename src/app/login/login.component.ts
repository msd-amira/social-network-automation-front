import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { User } from '../Models/User';
import { SocialNetworkService } from '../services/social-network.service';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user: any;
  constructor(private userService: UserService, private snService: SocialNetworkService, private router: Router) {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    })
  }

  ngOnInit(): void {
  }

  async loginBtn() {

    localStorage.clear();
    this.userService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(async (res: any) => {
      console.log("login result \n", res);
      this.user = res;

      if (typeof (Storage) !== 'undefined') {
        localStorage.setItem("user", JSON.stringify(this.user));

        this.snService.getSnByID(this.user.id).subscribe(
          async (res: any) => {
            console.log("Social networks's user resulat", res);

            res["hydra:member"].forEach(element => {
              switch (element.labelNetwork) {
                case "Facebook":
                  localStorage.setItem("loginFB", JSON.stringify(element));
                  break;
                case "LinkedIn":
                  localStorage.setItem("loginIN", JSON.stringify(element));
                  break;
                case "Instagram":
                  localStorage.setItem("loginINS", JSON.stringify(element));
                  break;
                case "Pinterest":
                  localStorage.setItem("loginPIN", JSON.stringify(element));
                  break;
                default:
                  break;
              }
            });
          },
          (err: any) => {
            console.error();
          }

        );

        this.router.navigate(['/home/social-networks']);
      }

    },
      error => {
        console.error();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Wrong password or Email !',

        }).then((result) => {
          this.loginForm.setValue({ email: '', password: '' });
        });
      });
    //this.loginForm.setValue({password : md5(password)})
  }

}
