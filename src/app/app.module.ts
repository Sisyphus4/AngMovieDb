import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { MoviesEffects } from './core/ngrx/effects/movies.effects';
import { CommentsEffects } from './core/ngrx/effects/comments.effects';
import { RatingsEffects } from './core/ngrx/effects/ratings.effects';
import { AuthenticationEffects } from './core/ngrx/effects/authentication.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { moviesReducer } from './core/ngrx/reducers/movies.reducers';
import { commentsReducer } from './core/ngrx/reducers/comments.reducers';
import { ratingsReducer } from './core/ngrx/reducers/ratings.reducer';
import { authenticationReducer } from './core/ngrx/reducers/authentication.reducers';
import { MoviePreviewComponent } from './components/movie/movie-preview/movie-preview.component';
import { MovieComponent } from './components/Movie/movie/movie.component';
import { CommentComponent } from './components/commentBlock/comment/comment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PostCommentComponent } from './components/commentBlock/post-comment/post-comment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditCommentComponent } from './components/commentBlock/edit-comment/edit-comment.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { NavBarComponent } from './components/navBlock/nav-bar/nav-bar.component';
import { NotFoundComponent } from './components/navBlock/not-found/not-found.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { AuthenticationComponent } from './components/user/authentication/authentication.component';


const mat_modules = [MatButtonModule, MatCardModule, MatRadioModule, MatInputModule, MatDialogModule];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MoviePreviewComponent,
    MovieComponent,
    CommentComponent,
    PostCommentComponent,
    EditCommentComponent,
    NavBarComponent,
    NotFoundComponent,
    RegistrationComponent,
    AuthenticationComponent,
  ],
  imports: [
    ...mat_modules,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({ moviesReducer, commentsReducer, ratingsReducer, authenticationReducer }),
    ReactiveFormsModule,
    // StoreModule.forRoot(reducers, {
    //   metaReducers,
    //   runtimeChecks: {
    //     strictStateImmutability: true,
    //     strictActionImmutability: true
    //   }
    // }),
    EffectsModule.forRoot([AppEffects, MoviesEffects, CommentsEffects, RatingsEffects, AuthenticationEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  entryComponents: [
    AuthenticationComponent
  ],
  exports: [...mat_modules],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
