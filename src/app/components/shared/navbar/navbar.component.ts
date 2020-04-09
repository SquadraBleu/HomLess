import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(/*private authService: AuthService, private afsAuth: AngularFireAuth*/) { }
  public isLogged = false;

  ngOnInit() {
    // this.getCurrentUser();
  }

  // getCurrentUser() {
  //   this.authService.isAuth().subscribe(auth => {
  //     if (auth) {
  //       console.log('user logged');
  //       this.isLogged = true;
  //     } else {
  //       console.log('NOT user logged');
  //       this.isLogged = false;
  //     }
  //   });
  // }

  onLogout() {
    // this.afsAuth.auth.signOut();
  }

  iconClick(){
    console.log('Navigate To Home');
  }

  buscar(){
    console.log('Navigate to Register');
  }

  registrarse(){
    console.log('Navigate To Register');
  }

  iniciarSesion(){
    console.log('Navigate To Iniciar Sesion');
  }

}
