import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SocialNetworkChoiceComponent } from './social-network-choice/social-network-choice.component';
import {AuthGuard} from './auth.guard';
import { FacebookManagerComponent } from './facebook-manager/facebook-manager.component';
import { FeedsComponent } from './feeds/feeds.component';

const routes: Routes = [
  {
    path : '',
    component : LoginComponent
  },
  {
    path : 'register',
    component : RegisterComponent
  },
  {
    path : 'home',
    component : HomeComponent, 
    canActivate: [AuthGuard],
    children : [
      {
        path : 'social-networks',
        canActivate : [AuthGuard],
        component : SocialNetworkChoiceComponent
      },
      {
        path : 'facebook',
        canActivate : [AuthGuard],
        component : FacebookManagerComponent
      },
      {
        path : 'feed',
        canActivate : [AuthGuard],
        component : FeedsComponent
      },
    ]
  },
  
  {
    path : "**",
    redirectTo : '/home',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
