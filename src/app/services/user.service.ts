import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {User} from '../Models/User';
import { Observable } from  'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

//  fd =new FormData();

  PHP_API = "https://localhost:8000/api";
  
  constructor(private http: HttpClient, private _router : Router) { }

  register(user){
   return this.http.post('https://127.0.0.1:8000/api/users',user);
  }

  logoutUser(){
    localStorage.removeItem('token');
    this._router.navigate(['/']);
    console.log("logout");
  }

  allUsers(): Observable<User[]>{
   return this.http.get<User[]>('https://127.0.0.1:8000/api/users');
  }
}
