import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { RoleLanguageService } from '../services/role-language.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any;
  role: any;

  constructor(private apiService: RoleLanguageService) { }

  ngOnInit(): void {
   
    this.user = JSON.parse(localStorage.getItem("user"));
    this.apiService.getRoleById(this.user.role.substr(11)).subscribe(
      res => {
        this.role = res['label'];
        console.log(this.role);
        
      }
    )
  }

}
