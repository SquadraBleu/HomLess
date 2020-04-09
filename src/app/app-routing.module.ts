import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { VerInmuebleComponent } from './components/inmobiliaria/ver-inmueble/ver-inmueble.component';
import { CrearInmuebleComponent } from './components/inmobiliaria/crear-inmueble/ver-inmueble.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/login'},
  {path: 'login', component: LoginComponent},
  {path: 'inmobiliaria/ver-inmueble', component: VerInmuebleComponent},
  {path: 'inmobiliaria/crear-inmueble', component: CrearInmuebleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
