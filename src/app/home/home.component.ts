import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private apiService: UserService) { }

  ngOnInit(): void {
    this.apiService.allUsers().subscribe((res:any) =>{
      console.log(res);
    },
    (error)=>{
      console.log(error);
    }
    );
  }

  allUsers(){
    
    this.apiService.allUsers().subscribe((res:any) =>{
      console.log(res['hydra:member']);
    }
    );
  }
}
