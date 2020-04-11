import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(/*private authService: AuthService, private afsAuth: AngularFireAuth*/
    private router: Router) { }
  public isLogged = false;
  public tituloNavBar = 'Bienvenido';

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
    this.router.navigate(['public/home']);
  }

  buscar(){
    this.router.navigate(['public/search']);
  }

  registrarse(){
    console.log('Navigate To Register');
  }

  iniciarSesion(){
    this.router.navigate(['public/login']);
  }

}
