import { TestBed, inject, async } from '@angular/core/testing';

import { UserRequestService } from './user-request.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule, TestingHelper } from '../imports';
import { catchError } from 'rxjs/operators';

describe('UserRequestService', () => {
  let requestService: UserRequestService;

  const testingHelper = new TestingHelper();
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserRequestService],
      imports: [
        CoreModule,
        HttpClientModule,
        RouterTestingModule.withRoutes(testingHelper.routes)
      ]
    });

    requestService = TestBed.get(UserRequestService);
  });

  it('should be created', inject([UserRequestService], (service: UserRequestService) => {
    expect(service).toBeTruthy();
  }));

  it('should have correct route for getUserProfile', async(() => {
    requestService.getUserProfile()
      .pipe(catchError(error => testingHelper.unAuthenticatedError(error)))
      .subscribe(response => response, error => error);
  }));

  it('should have correct route for postUserProfile', async(() => {
    requestService.postUserProfile({})
      .pipe(catchError(error => testingHelper.unAuthenticatedError(error)))
      .subscribe(response => response, error => error);
  }));

  it('should have correct route for postUserProfileImage', async(() => {
    requestService.postUserProfileImage({})
      .pipe(catchError(error => testingHelper.unAuthenticatedError(error)))
      .subscribe(response => response, error => error);
  }));

  it('should have correct route for getMenus', async(() => {
    requestService.getMenus()
      .pipe(catchError(error => testingHelper.unAuthenticatedError(error)))
      .subscribe(response => response, error => error);
  }));

  it('should have correct route for dashboard', async(() => {
    requestService.dashboard()
      .pipe(catchError(error => testingHelper.unAuthenticatedError(error)))
      .subscribe(response => response, error => error);
  }));

  it('should have correct route for postResetPassword', async(() => {
    requestService.postResetPassword({})
      .pipe(catchError(error => testingHelper.unAuthenticatedError(error)))
      .subscribe(response => response, error => error);
  }));
});
