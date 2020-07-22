import { Component, OnInit } from '@angular/core';
import { SocialNetwork } from "../Models/SocialNetwork";
import { SocialNetworkService } from "../services/social-network.service";
import * as firebase from 'firebase/app';
import { User } from '../Models/User';
import { Router } from '@angular/router';
@Component({
  selector: 'app-social-network-choice',
  templateUrl: './social-network-choice.component.html',
  styleUrls: ['./social-network-choice.component.css']
})
export class SocialNetworkChoiceComponent implements OnInit {

  snList : SocialNetwork;
  constructor(private snService : SocialNetworkService, private router : Router) {
    this.snList = new SocialNetwork();
   }

  async ngOnInit():  Promise<any> {
    this.snService.getAllSN().subscribe( async(res:any) =>{
      console.log(res);
      this.snList = res['hydra:member'];
    })
  }

  selectItem(id : any){
    console.log(id);
  }


  
  facebook_signin(){
   // console.log(this.user);
    this.snService.loginwithFacebook()
    .then(res=> 
      {
      console.log(res)
        //sessionStorage.setItem('user' , JSON.stringify(res) );
        this.router.navigate(['/home']);
      });
  }

}
