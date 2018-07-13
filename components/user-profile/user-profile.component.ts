import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';

import { Subscription } from 'rxjs/';

import { CacheService } from '../../imports';
import { UserRequestService } from '../../services/user-request.service';
import { UserService } from '../../services/user.service';

import { PasswordResetComponent } from '../../dialogs/password-reset/password-reset.component';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  user: any;

  subs = new Subscription();

  languages: any;

  AUTHOR_IMAGE_URL: string;

  @ViewChild('file') file: ElementRef;

  get isPageReady() {
    return this.user;
  }

  constructor(
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private userRequestService: UserRequestService,
    private userService: UserService,
    private cacheService: CacheService
  ) {
    this.AUTHOR_IMAGE_URL = this.userRequestService.makeUrl('public.image.author');
  }

  ngOnInit() {
    const rq2 = this.cacheService.get('languages', this.userRequestService.makeGetRequest('admin.languages'))
      .subscribe(response => this.languages = response);

    const rq1 = this.userRequestService.getUserProfile().subscribe(response => this.user = response);

    this.subs.add(rq1);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  showImage(img: string) {
    const reader = new FileReader();

    const input = this.file.nativeElement;

    const item = document.getElementById(img);

    reader.onload = (e: any) => {

      const rq3 = this.userRequestService.postUserProfileImage(this.file.nativeElement.files.item(0)).subscribe(response => {

        this.snackBar.open(response.message, response.action, {
          duration: 2000
        });

        item.setAttribute('src', e.target.result);
      });

      this.subs.add(rq3);
    };

    reader.readAsDataURL(input.files.item(0));
  }

  updateProfile(f: NgForm) {
    const rq2 = this.userRequestService.postUserProfile({
      name: f.value.name,
      biography: this.user.user_data.biography
    }).subscribe(response => {
      this.snackBar.open(response.message, response.action, {
        duration: 2000
      });

      this.user = null;

      const rq1 = this.userRequestService.getUserProfile().subscribe((user: any) => this.user = user);

      this.subs.add(rq1);
    });

    this.subs.add(rq2);
  }

  resetPassword() {
    const dialogRef = this.dialog.open(PasswordResetComponent, {
      disableClose: true
    });

    const rq2 = dialogRef.afterClosed().subscribe(response => {
      if (!response) {
        return;
      }

      this.userService.openSnack(this.snackBar, response.message, response.action);

      rq2.unsubscribe();
    });
  }
}
