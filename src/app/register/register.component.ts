import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from "../services/user.service";
import { RoleLanguageService } from "../services/role-language.service";
import { Language } from "../Models/Language";
import { async } from 'rxjs/internal/scheduler/async';
import { User } from '../Models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  RegisterForm: FormGroup;
  langues : Language [] = new Array() ;
  user : User;

  constructor(private userService: UserService, private roleLanguageService: RoleLanguageService) {
    this.RegisterForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      languageID: new FormControl(),
      nameCompany: new FormControl(),
      roles: new FormControl(),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      re_pass: new FormControl('', [Validators.required, Validators.minLength(4)]),
    },this.passwordMatchValidator);
   }

   passwordMatchValidator(RegisterForm: FormGroup) {
    return RegisterForm.get('password').value === RegisterForm.get('re_pass').value
       ? null : {'mismatch': true};
 }

  async ngOnInit():  Promise<any> {
    this.langues = [];
    this.roleLanguageService.getLanguages().subscribe( async (res :any) =>{
      console.log(res['hydra:member']);
      res['hydra:member'].forEach(async (element: Language) => {
        this.langues.push(element);
        console.log(element['@id']);
      });
    })
    await console.log(this.langues);
  }

  async newUser(userForm : any) : Promise<any>{
    this.user = new User();
    
    this.user['firstname'] = userForm.firstname;
    this.user['lastname'] = userForm.lastname;
    this.user['email'] = userForm.email;
    this.user['role'] = userForm.roles;
    this.user['password'] = userForm.password;
    this.user['nameCompany'] = userForm.nameCompany;
    this.user['phoneNumber'] = userForm.phoneNumber;
    this.user['languageID'] = userForm.languageID;
    this.user['isVerified'] = false;
    this.user['isVisible'] = true;

  }
  async registerBtn() :  Promise<any> {
   // console.warn(this.RegisterForm.value);
    console.log(this.RegisterForm.valid);
    if(!this.RegisterForm.valid){
      console.log("Please verify your data");
    }else{
      console.log("correct !")  
      this.roleLanguageService.getRoleByLabel('ROLE_USER').subscribe(async (res : any) =>{
        
        this.RegisterForm.patchValue({roles: res['@id'],});
        await this.newUser(this.RegisterForm.value);
        console.log("useeeeeeeeeeeeeeeer",this.user);
        this.userService.register(this.user).subscribe( async(res : any) =>{
          console.log("register: \n",res);
        });
      });
    }
  }

}
