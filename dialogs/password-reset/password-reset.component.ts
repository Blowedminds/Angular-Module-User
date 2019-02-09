import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { UserRequestService } from '../../services/user-request.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.sass']
})
export class PasswordResetComponent implements OnInit {

  constructor(
    private userRequestService: UserRequestService,
    private dialogRef: MatDialogRef<PasswordResetComponent>
  ) { }

  ngOnInit() {

  }

  resetPassword(f: NgForm) {
    this.userRequestService.postResetPassword({
      password: f.value.password,
      password_confirmation: f.value.password_confirmation
    }).subscribe(response => this.dialogRef.close(response));
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
