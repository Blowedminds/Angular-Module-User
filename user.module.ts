import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';

import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PasswordResetComponent } from './dialogs/password-reset/password-reset.component';

import { UserRequestService } from './services/user-request.service';
import { UserService } from './services/user.service';
import { NavigationModule } from '../navigation/navigation.module';

@NgModule({
  declarations: [
    UserProfileComponent,
    PasswordResetComponent
  ],
  imports: [
    CommonModule,
    NavigationModule,
    UserRoutingModule
  ],
  providers: [
    UserRequestService,
    UserService
  ],
  entryComponents: [
    PasswordResetComponent
  ]
})
export class UserModule { }
