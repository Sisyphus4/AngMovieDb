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
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { moviesReducer } from './core/ngrx/reducers/movies.reducers';
import { commentsReducer } from './core/ngrx/reducers/comments.reducers';
import { MoviePreviewComponent } from './components/movie/movie-preview/movie-preview.component';
import { MovieComponent } from './components/Movie/movie/movie.component';
import { CommentComponent } from './components/commentBlock/comment/comment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PostCommentComponent } from './components/commentBlock/post-comment/post-comment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MoviePreviewComponent,
    MovieComponent,
    CommentComponent,
    PostCommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({ moviesReducer, commentsReducer }),
    ReactiveFormsModule,
    // StoreModule.forRoot(reducers, {
    //   metaReducers,
    //   runtimeChecks: {
    //     strictStateImmutability: true,
    //     strictActionImmutability: true
    //   }
    // }),
    EffectsModule.forRoot([AppEffects, MoviesEffects, CommentsEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
