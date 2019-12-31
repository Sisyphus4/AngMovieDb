import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { selectUser } from 'src/app/core/ngrx/selectors/authentication.selectors';
import { AppState } from 'src/app/core/interfaces/state.interface';
import { Store, select } from '@ngrx/store';
import * as AuthenticationActions from '../../../core/ngrx/actions/authentication.actions';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationComponent } from '../../user/authentication/authentication.component';
import { User } from 'src/app/core/interfaces/authentication.interface';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  user$: Observable<User>;
  constructor(private store: Store<AppState>, public dialog: MatDialog) { }

  ngOnInit() {
    this.user$ = this.store.select(state => selectUser(state));
    const token = localStorage.getItem('token');
    if (token) {
      this.store.dispatch(AuthenticationActions.getUser());
    }
  }

  onSignOut() {
    localStorage.setItem('token', '');
    location.reload();
  }

  openDialog(): void {
    this.dialog.open(AuthenticationComponent);
  }
}
