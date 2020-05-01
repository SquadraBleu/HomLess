import { NgModule } from '@angular/core';
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
  {path: '**', redirectTo: '/error404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
