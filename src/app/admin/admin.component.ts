import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { SocialNetworkService } from '../services/social-network.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  listSocial: any[];

  constructor(private userService : UserService, private snService : SocialNetworkService) { }
  appId : any;
  async ngOnInit(): Promise<any> {
    this.snService.getAllSN().subscribe(
      async (res: any) => {
        this.listSocial = await res['hydra:member'];
        console.log(this.listSocial);
        
       }
    );
  }
  logout() {
    this.userService.logoutUser();
  }

  async addApp(label : any, idApp: any, keySecret: any) : Promise<any>{
    // console.log(label);
    // console.log(idApp);
    // console.log(keySecret);
    this.snService.addAppDev(idApp,keySecret,label).subscribe(
      res => {
        console.log(res);
        
      }
    )
  }
}
