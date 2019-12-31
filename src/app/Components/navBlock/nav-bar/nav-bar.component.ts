import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { selectUser } from 'src/app/core/ngrx/selectors/authentication.selectors';
import { AppState } from 'src/app/core/interfaces/state.interface';
import { Store } from '@ngrx/store';
import * as AuthenticationActions from '../../../core/ngrx/actions/authentication.actions';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationComponent } from '../../user/authentication/authentication.component';
import { User } from 'src/app/core/interfaces/authentication.interface';
import { Actions, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as UserActions from '../../../core/ngrx/actions/authentication.actions';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {

  user$: Observable<User>;
  subscription: Subscription;

  constructor(private store: Store<AppState>, private dialog: MatDialog, private updates$: Actions, private router: Router) { }

  ngOnInit() {
    this.user$ = this.store.select(state => selectUser(state));
    const token = localStorage.getItem('token');
    if (token) {
      this.store.dispatch(AuthenticationActions.getUser());
    }
    this.subscription = new Subscription();
    this.subscription.add(this.updates$.pipe(
      ofType(UserActions.loginUserSuccess),
      tap(() => {
        this.dialog.closeAll();
      })
    ).subscribe());
    this.subscription.add(this.updates$.pipe(
      ofType(UserActions.registerUserSuccess),
      tap(() => {
        this.router.navigate(['/home']);
      })
    ).subscribe());
  }

  onSignOut() {
    localStorage.setItem('token', '');
    location.reload();
  }

  openDialog(): void {
    this.dialog.open(AuthenticationComponent);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
