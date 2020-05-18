import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private afsAuth: AngularFireAuth,
    private router: Router) { }
  public isLogged = false;
  public tituloNavBar = 'Bienvenido';
  public userUid: string = null;

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
    if (auth) {
      console.log('user logged');
      this.isLogged = true;
      } else {
      console.log('NOT user logged');
      this.isLogged = false;
      }
    });
  }

  onLogout() {
    this.afsAuth.auth.signOut();
    this.isLogged = false;
    this.router.navigate(['public/home']);
  }

  iconClick(){
    this.router.navigate(['public/home']);
  }

  buscar(){
    this.router.navigate(['public/search']);
  }

  registrarse(){
    this.router.navigate(['public/registro']);
  }

  iniciarSesion(){
    this.router.navigate(['public/login']);
  }

  verPerfil(){
    // this.router.navigate(['cliente/ver-perfil']);
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        // console.log(auth);
        this.userUid = auth.uid;
        this.authService.isUserInmo(this.userUid).subscribe(userRole => { // se si es una inmo
          if (userRole !== undefined){
            console.log(userRole.UID);
            this.router.navigate(['inmobiliaria/ver-perfil/' + this.userUid]);
          }else{
            this.authService.isUserClient(this.userUid).subscribe( user => {
              if (user !== undefined){
                this.router.navigate(['cliente/ver-perfil/' + this.userUid]);
              }
            });
          }
          /*
          if (userRole.roles.inmobiliaria){
            this.route.navigate(['inmobiliaria/crear-inmueble']);
          } else if (userRole.roles.clinte) {
            this.route.navigate(['inmobiliaria/ver-inmueble']);
          }
          */
        });
      }
    });
  }
}
