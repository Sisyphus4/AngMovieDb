import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppState } from '../../../core/interfaces/state.interface';
import { Store, select } from '@ngrx/store';
import * as AuthenticationActions from '../../../core/ngrx/actions/authentication.actions';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    public router: Router
  ) { }

  registrationForm: FormGroup;

  ngOnInit() {
    this.registrationForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  onSubmit() {
    const { username, password } = this.registrationForm.value;
    this.store.dispatch(AuthenticationActions.registerUser({ username, password }));
    this.router.navigate(['/home'])
  }
}
