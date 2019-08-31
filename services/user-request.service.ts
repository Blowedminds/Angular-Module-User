import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HelpersService, MainRequestService, RoutingListService } from '../imports';

@Injectable()
export class UserRequestService extends MainRequestService {

  constructor(
    http: HttpClient,
    helpersService: HelpersService,
    routingListService: RoutingListService
  ) {
    super(http, helpersService, routingListService);
  }

  getUserProfile(): Observable<any> {
    return this.makeGetRequest('user.profile');
  }

  postUserProfile(data: any): Observable<any> {
    return this.makePostRequest('user.profile', data);
  }

  postUserProfileImage(file: any): Observable<any> {
    const formData = new FormData();

    formData.append('file', file);

    return this.makePostRequestWithFormData('user.profile-image', formData);
  }

  getMenus(): Observable<any> {
    return this.makeGetRequest('user.menus', this.helpersService.getLocale());
  }

  dashboard(): Observable<any> {
    return this.makeGetRequest('user.dashboard');
  }

  postResetPassword(data: any): Observable<any> {
    return this.makePostRequest('auth.reset-password', data);
  }
}
