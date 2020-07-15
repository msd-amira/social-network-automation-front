import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {User} from './Models/User';
import { Observable } from  'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

//  fd =new FormData();

  PHP_API = "http://localhost:8000/api";
  
  constructor(private http: HttpClient, private _router : Router) { }

  register(form){
    return this.http.post('http://localhost:8000/api/users',form);
  }

  logoutUser(){
    localStorage.removeItem('token');
    this._router.navigate(['/']);
    console.log("logout");
  }
}
