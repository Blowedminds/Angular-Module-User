import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NavigationComponent } from './imports';

const routes: Routes = [
  {
    path: '', component: NavigationComponent, children: [
      { path: 'profile', component: UserProfileComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      { enableTracing: false }
    )],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule { }
