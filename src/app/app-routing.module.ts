import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MovieComponent } from './components/Movie/movie/movie.component';
import { NotFoundComponent } from './components/navBlock/not-found/not-found.component';
import { RegistrationComponent } from './components/user/registration/registration.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'movie/:id', component: MovieComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
