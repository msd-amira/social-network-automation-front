import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SocialNetworkChoiceComponent } from './social-network-choice/social-network-choice.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {
    path : 'home',
    component : HomeComponent, 
    canActivate: [AuthGuard]
  },{
    path : 'register',
    component : RegisterComponent
  },
  {
    path : '',
    component : LoginComponent
  },
  {
    path : 'social-networks',
    canActivate : [AuthGuard],
    component : SocialNetworkChoiceComponent
  },
  {
    path : "**",
    component : HomeComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
