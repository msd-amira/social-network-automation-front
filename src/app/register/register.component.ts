import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from "../services/user.service";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  RegisterForm: FormGroup;

  constructor(private apiService: UserService) {
    this.RegisterForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      languageID: new FormControl('api/languages/2'),
      nameCompany: new FormControl(),
      roles: new FormControl('api/roles/5'),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    })
   }

  ngOnInit(): void {
  }
  registerBtn() {
    console.warn(this.RegisterForm.value);
    console.log(this.RegisterForm.valid);
    if(!this.RegisterForm.valid){
      console.log("Wrong password or Email !");
    }else{
      console.log("correct !")      
      //this.RegisterForm.setValue({roles: 'api/roles/'+roles})
      this.apiService.register(this.RegisterForm.value).subscribe((res : any) =>{
        console.log(res);
      });
    }
  }

}
