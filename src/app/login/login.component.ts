import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { User } from '../Models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  user : User;
  constructor(private userService : UserService, private router : Router) {
    this.user = new User();
    this.loginForm= new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    })
   }

  ngOnInit(): void {
  }

  loginBtn(){
    console.log(this.loginForm.value);
    this.userService.login(this.loginForm.value.email,this.loginForm.value.password).subscribe((res : any) =>{
      console.log(res);
      this.user = res;
      if(typeof(Storage) !== 'undefined'){
        localStorage.setItem("email" , this.user.email);
        localStorage.setItem("user" , JSON.stringify(this.user));
        this.router.navigate(['/']);
      }
    },
    error =>{
      console.error();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Wrong password or Email !',
        
      }).then((result) =>{
        this.loginForm.setValue({ email: '', password : ''});
      });
    });
    //this.loginForm.setValue({password : md5(password)})
  }

}
