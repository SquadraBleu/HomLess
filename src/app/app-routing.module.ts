import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { VerInmuebleComponent } from './components/inmobiliaria/ver-inmueble/ver-inmueble.component';
import { CrearInmuebleComponent } from './components/inmobiliaria/crear-inmueble/crear-inmueble.component';
import { SearchComponent } from './components/public/search/search.component';
import { VerInmueblePublicComponent } from './components/public/ver-inmueble-public/ver-inmueble-public.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/login'},
  {path: 'login', component: LoginComponent},
  {path: 'inmobiliaria/ver-inmueble:id', component: VerInmuebleComponent},
  {path: 'inmobiliaria/crear-inmueble', component: CrearInmuebleComponent},
  {path: 'public/search', component: SearchComponent},
  {path: 'public/search/ver-inmueble:id', component: VerInmueblePublicComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
