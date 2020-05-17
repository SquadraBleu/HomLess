import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SliderModule } from 'angular-image-slider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { VerInmuebleComponent } from './components/inmobiliaria/ver-inmueble/ver-inmueble.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CrearInmuebleComponent } from './components/inmobiliaria/crear-inmueble/crear-inmueble.component';
import { SearchComponent } from './components/public/search/search.component';
import { VerInmueblePublicComponent } from './components/public/ver-inmueble-public/ver-inmueble-public.component';
import { HomeComponent } from './components/public/home/home.component';
import { NotFoundComponent } from './components/public/not-found/not-found.component';
import { EditarInmuebleComponent } from './components/inmobiliaria/editar-inmueble/editar-inmueble.component';
import { ListaInmueblesComponent } from './components/inmobiliaria/lista-inmuebles/lista-inmuebles.component';
import { RegistroComponent } from './components/public/registro/registro.component';
import { VerPerfilComponent } from './components/inmobiliaria/ver-perfil/ver-perfil.component';
import { EditarPerfilComponent } from './components/inmobiliaria/editar-perfil/editar-perfil.component';
import { ClientVerPerfilComponent } from './components/client/client-ver-perfil/client-ver-perfil.component';
import { ClientEditarPerfilComponent } from './components/client/client-editar-perfil/client-editar-perfil.component';
import { ListaRepresentantesComponent } from './components/representante/lista-representantes/lista-representantes.component';
import { EditarRepresentanteComponent } from './components/representante/editar-representante/editar-representante.component';
import { CrearRepresentanteComponent } from './components/representante/crear-representante/crear-representante.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    VerInmuebleComponent,
    CrearInmuebleComponent,
    SearchComponent,
    VerInmueblePublicComponent,
    HomeComponent,
    NotFoundComponent,
    EditarInmuebleComponent,
    ListaInmueblesComponent,
    RegistroComponent,
    VerPerfilComponent,
    EditarPerfilComponent,
    ClientVerPerfilComponent,
    ClientEditarPerfilComponent,
    ListaRepresentantesComponent,
    EditarRepresentanteComponent,
    CrearRepresentanteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SliderModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [AngularFireAuth, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
