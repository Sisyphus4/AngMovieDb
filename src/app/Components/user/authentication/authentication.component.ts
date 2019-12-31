import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppState } from '../../../core/interfaces/state.interface';
import { Store, select } from '@ngrx/store';
import * as AuthenticationActions from '../../../core/ngrx/actions/authentication.actions';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor(private store: Store<AppState>,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<AuthenticationComponent>) { }

  registrationForm: FormGroup;

  ngOnInit() {
    this.registrationForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  onSubmit() {
    const { username, password } = this.registrationForm.value;
    this.store.dispatch(AuthenticationActions.loginUser({ username, password }));
    this.dialogRef.close();
  }
}
