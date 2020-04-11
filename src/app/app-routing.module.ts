import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { VerInmuebleComponent } from './components/inmobiliaria/ver-inmueble/ver-inmueble.component';
import { CrearInmuebleComponent } from './components/inmobiliaria/crear-inmueble/crear-inmueble.component';
import { SearchResultsComponent } from './components/public/search-results/search-results.component';
import { HomeComponent } from './components/public/home/home.component';
import { NotFoundComponent } from './components/public/not-found/not-found.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/public/home'},
  {path: 'public/login', component: LoginComponent},
  {path: 'inmobiliaria/ver-inmueble', component: VerInmuebleComponent},
  {path: 'inmobiliaria/crear-inmueble', component: CrearInmuebleComponent},
  {path: 'public/search-results', component: SearchResultsComponent},
  {path: 'logged/search-results', component: SearchResultsComponent},
  {path: 'public/home', component: HomeComponent},
  {path: 'error404', component: NotFoundComponent},
  {path: '**', redirectTo: '/error404'}
  // {path: 'public/search-results/:id', component: SearchComponent},
  // {path: 'logged/search-results/', component: SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
