import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from '../../../core/interfaces/state.interface';
import { Store, select } from '@ngrx/store';
import * as AuthenticationActions from '../../../core/ngrx/actions/authentication.actions';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { selectError } from '../../../core/ngrx/selectors/authentication.selectors';

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
  error$: Observable<string>;

  ngOnInit() {
    this.registrationForm = this.fb.group({
      username: ['', Validators.minLength(3)],
      password: ['', Validators.minLength(3)],
      recaptcha: '',
    }, Validators.required);
    this.error$ = this.store.select(state => selectError(state));
  }

  onSubmit() {
    const { username, password, recaptcha } = this.registrationForm.value;
    this.store.dispatch(AuthenticationActions.registerUser({ username, password, recaptcha }));
  }
}
