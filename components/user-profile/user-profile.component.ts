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

  @ViewChild('file', { static: false }) file: ElementRef;

  get isPageReady() {
    return this.user;
  }

  constructor(
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private requestService: UserRequestService,
    private service: UserService,
    private cacheService: CacheService
  ) {
    this.AUTHOR_IMAGE_URL = this.requestService.makeUrl('storage.authors.images');
  }

  ngOnInit() {
    this.subs.add(
      this.cacheService.get('languages', this.requestService.makeGetRequest('admin.languages'))
        .subscribe(response => this.languages = response)
    );

    this.subs.add(
      this.requestService.getUserProfile().subscribe(response => this.user = response)
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  showImage(img: string) {
    const reader = new FileReader();

    const input = this.file.nativeElement;

    const item = document.getElementById(img);

    reader.onload = (e: any) => {

      this.subs.add(
        this.requestService.postUserProfileImage(this.file.nativeElement.files.item(0)).subscribe(response => {

          this.snackBar.open(response.message, response.action, {
            duration: 2000
          });

          item.setAttribute('src', e.target.result);
        })
      );

    };

    reader.readAsDataURL(input.files.item(0));
  }

  updateProfile(f: NgForm) {
    this.subs.add(
      this.requestService.postUserProfile({
        name: f.value.name,
        biography: this.user.user_data.biography
      }).subscribe(response => {
        this.snackBar.open(response.message, response.action, {
          duration: 2000
        });

        this.user = null;

        this.subs.add(
          this.requestService.getUserProfile().subscribe((user: any) => this.user = user)
        );
      })
    );
  }

  resetPassword() {
    const dialogRef = this.dialog.open(PasswordResetComponent, {
      disableClose: true
    });

    this.subs.add(
      dialogRef.afterClosed().subscribe(response => {
        if (!response) {
          return;
        }

        this.service.openSnack(this.snackBar, {
          message: 'Parola değiştirildi',
          action: 'Tamam'
        }, true);
      })
    );
  }
}
