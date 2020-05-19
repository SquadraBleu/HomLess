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
import { VerBusquedasComponent } from './components/client/ver-busquedas/ver-busquedas.component';
import { RegistroComponent } from './components/public/registro/registro.component';
import { VerPerfilComponent } from './components/inmobiliaria/ver-perfil/ver-perfil.component';
import { EditarPerfilComponent } from './components/inmobiliaria/editar-perfil/editar-perfil.component';
import { ClientVerPerfilComponent } from './components/client/client-ver-perfil/client-ver-perfil.component';
import { ClientEditarPerfilComponent } from './components/client/client-editar-perfil/client-editar-perfil.component';
import { ListaRepresentantesComponent } from './components/representante/lista-representantes/lista-representantes.component';
import { CrearRepresentanteComponent } from './components/representante/crear-representante/crear-representante.component';
import { EditarRepresentanteComponent } from './components/representante/editar-representante/editar-representante.component';
import { ClientChatComponent } from './components/client/client-chat/client-chat.component';
import { RepresentanteChatComponent } from './components/representante/representante-chat/representante-chat.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/public/home'},
  {path: 'public/login', component: LoginComponent},
  {path: 'inmobiliaria/ver-inmueble/:id', component: VerInmuebleComponent},
  {path: 'inmobiliaria/crear-inmueble', component: CrearInmuebleComponent},
  {path: 'inmobiliaria/editar-inmueble/:id', component: EditarInmuebleComponent},
  {path: 'inmobiliaria/lista-inmuebles/:id', component: ListaInmueblesComponent},
  {path: 'cliente/ver-busquedas/:id', component: VerBusquedasComponent},
  {path: 'public/search', component: SearchComponent},
  {path: 'public/search/ver-inmueble/:id', component: VerInmueblePublicComponent},
  {path: 'public/home', component: HomeComponent},
  {path: 'error404', component: NotFoundComponent},
  {path: 'public/registro', component: RegistroComponent},
  {path: 'inmobiliaria/ver-perfil/:id', component: VerPerfilComponent},
  {path: 'inmobiliaria/editar-perfil/:id', component: EditarPerfilComponent},
  {path: 'cliente/ver-perfil/:id', component: ClientVerPerfilComponent},
  {path: 'cliente/editar-perfil/:id', component: ClientEditarPerfilComponent},
  {path: 'cliente/ver-busqueda/:id', component: VerBusquedasComponent},
  {path: 'inmobiliaria/lista-representantes/:id', component: ListaRepresentantesComponent},
  {path: 'inmobiliaria/crear-representante/:id', component: CrearRepresentanteComponent},
  {path: 'inmobiliaria/editar-representante/:id', component: EditarRepresentanteComponent},
  {path: 'cliente/chat', component: ClientChatComponent},
  {path: 'representante/chat', component: RepresentanteChatComponent},
  {path: '**', redirectTo: '/error404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
