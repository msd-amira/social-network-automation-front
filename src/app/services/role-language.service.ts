import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleLanguageService {

  constructor(private http : HttpClient, private _router : Router) { }

  getMethode(api: string){
    return this.http.get('https://127.0.0.1:8000'+api);
  }
  getLanguages(){
    return this.http.get('https://127.0.0.1:8000/api/languages');
  }

  getLanguageByLabel(label : any){
    return this.http.get('https://127.0.0.1:8000/api/languages',label);
  }

  getRoleById(id : any){
    return this.http.get('https://127.0.0.1:8000/api/roles/',id);
  }

  getRoleByLabel(label : any){
    return this.http.get('https://127.0.0.1:8000/api/roles/label/'+label);
  }

}
