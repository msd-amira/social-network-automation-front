import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SocialNetworkChoiceComponent } from './social-network-choice/social-network-choice.component';
import {AuthGuard} from './auth.guard';
import { FeedsComponent } from './feeds/feeds.component';
import { PublishPostComponent } from './publish-post/publish-post.component';

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
        path : 'publish',
        canActivate : [AuthGuard],
        component : PublishPostComponent
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
