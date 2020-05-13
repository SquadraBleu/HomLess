import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { VerInmuebleComponent } from './components/inmobiliaria/ver-inmueble/ver-inmueble.component';
import { CrearInmuebleComponent } from './components/inmobiliaria/crear-inmueble/crear-inmueble.component';
import { HomeComponent } from './components/public/home/home.component';
import { NotFoundComponent } from './components/public/not-found/not-found.component';
import { SearchComponent } from './components/public/search/search.component';
import { VerInmueblePublicComponent } from './components/public/ver-inmueble-public/ver-inmueble-public.component';
import { EditarInmuebleComponent } from './components/inmobiliaria/editar-inmueble/editar-inmueble.component';
import { ListaInmueblesComponent } from './components/inmobiliaria/lista-inmuebles/lista-inmuebles.component';
import { RegistroComponent } from './components/public/registro/registro.component';
import { VerPerfilComponent } from './components/inmobiliaria/ver-perfil/ver-perfil.component';
import { EditarPerfilComponent } from './components/inmobiliaria/editar-perfil/editar-perfil.component';
import { ClientVerPerfilComponent } from './components/client/client-ver-perfil/client-ver-perfil.component';
import { ClientEditarPerfilComponent } from './components/client/client-editar-perfil/client-editar-perfil.component';
import { ListaRepresentantesComponent } from './components/representante/lista-representantes/lista-representantes.component';
import { CrearRepresentanteComponent } from './components/representante/crear-representante/crear-representante.component';
import { EditarRepresentanteComponent } from './components/representante/editar-representante/editar-representante.component';
import { VerRepresentanteComponent } from './components/representante/ver-representante/ver-representante.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/public/home'},
  {path: 'public/login', component: LoginComponent},
  {path: 'inmobiliaria/ver-inmueble/:id', component: VerInmuebleComponent},
  {path: 'inmobiliaria/crear-inmueble', component: CrearInmuebleComponent},
  {path: 'inmobiliaria/editar-inmueble/:id', component: EditarInmuebleComponent},
  {path: 'inmobiliaria/lista-inmuebles/:id', component: ListaInmueblesComponent},
  {path: 'public/search', component: SearchComponent},
  {path: 'public/search/ver-inmueble/:id', component: VerInmueblePublicComponent},
  {path: 'public/home', component: HomeComponent},
  {path: 'error404', component: NotFoundComponent},
  {path: 'public/registro', component: RegistroComponent},
  {path: 'inmobiliaria/ver-perfil', component: VerPerfilComponent},
  {path: 'inmobiliaria/editar-perfil', component: EditarPerfilComponent},
  {path: 'cliente/ver-perfil', component: ClientVerPerfilComponent},
  {path: 'cliente/editar-perfil', component: ClientEditarPerfilComponent},
  {path: 'inmobiliaria/lista-representantes', component: ListaRepresentantesComponent},
  {path: 'inmobiliaria/crear-representante', component: CrearRepresentanteComponent},
  {path: 'inmobiliaria/editar-representante', component: EditarRepresentanteComponent},
  {path: 'inmobiliaria/ver-representante', component: VerRepresentanteComponent},
  {path: '**', redirectTo: '/error404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
