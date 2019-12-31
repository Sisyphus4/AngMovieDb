import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from '../../../core/interfaces/state.interface';
import { Store, select } from '@ngrx/store';
import * as AuthenticationActions from '../../../core/ngrx/actions/authentication.actions';
import { Observable } from 'rxjs';
import { selectError } from 'src/app/core/ngrx/selectors/authentication.selectors';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor(private store: Store<AppState>, private fb: FormBuilder) { }

  registrationForm: FormGroup;
  error$: Observable<string>;

  ngOnInit() {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    }, [Validators.required]);
    this.error$ = this.store.select(state => selectError(state));
  }

  onSubmit() {
    const { username, password } = this.registrationForm.value;
    this.store.dispatch(AuthenticationActions.loginUser({ username, password }));
  }
}
