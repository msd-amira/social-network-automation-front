import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SocialNetworkChoiceComponent } from './social-network-choice/social-network-choice.component';
import {AuthGuard} from './auth.guard';
import { FeedsComponent } from './feeds/feeds.component';
import { PublishPostComponent } from './publish-post/publish-post.component';
import { EditPostsComponent } from './edit-posts/edit-posts.component';
import { AdminComponent } from './admin/admin.component';

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
      {
        path : 'editPosts',
        canActivate : [AuthGuard],
        component : EditPostsComponent
      },
      {
        path : 'admin',
        canActivate : [AuthGuard],
        component : AdminComponent
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
