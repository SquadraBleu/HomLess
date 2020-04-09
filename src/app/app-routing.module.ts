import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CrearInmuebleComponent } from './components/inmobiliaria/crear-inmueble/crear-inmueble.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/inmobiliaria/crear-inmueble'},
  {path: 'login', component: LoginComponent},
  {path: 'inmobiliaria/crear-inmueble', component : CrearInmuebleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
