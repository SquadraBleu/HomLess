import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';

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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    VerInmuebleComponent,
    CrearInmuebleComponent,
    SearchComponent,
    VerInmueblePublicComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
