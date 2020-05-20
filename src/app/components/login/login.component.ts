import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../../models/user';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authSvc: AuthService,
    private route: Router
  ) { }

  public email = '';
  public password = '';
  public isInmo: any = null;
  public isCli: any = null;
  public isRepre: any = null;
  public userUid: string = null;

  loginForm = new FormGroup ({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  isError = false;
  errMessage: string;

  ngOnInit(): void {
  }

  onLogin(): void {
    this.authSvc.loginByEmail(this.email, this.password)
    .then((res) => {
      console.log('resUser', res);
      this.getCurrentUser();
    }).catch(err => {
        console.log('err', err.message);
        this.isError = true;
        this.errMessage = err.message;
        console.log('Falló');
        console.log(this.isError);
    });

    /*
    this.authSvc.registerUser('laurito@hom.com', '12345634', true, false)
    .then((res) => {
      console.log('resUser', res);
    }).catch(err => console.log('err', err.message));
    */
  }

  onLogout(): void {
    this.authSvc.logout();
  }

  getCurrentUser() {
    this.authSvc.isAuth().subscribe(auth => {
      if (auth) {
        // console.log(auth);
        this.userUid = auth.uid;
        this.authSvc.isUserInmo(this.userUid).subscribe(userRole => { // se si es una inmo
          if (userRole !== undefined){
            console.log(userRole.UID);
            this.route.navigate(['inmobiliaria/lista-inmuebles/' + this.userUid]);
          }else{
            this.authSvc.isUserClient(this.userUid).subscribe( user => {
              if (user !== undefined){
                this.route.navigate(['cliente/ver-perfil/' + this.userUid]);
              }else{
                this.authSvc.isUserRepre(this.userUid).subscribe( userR => {
                  if (userR !== undefined){
                    this.route.navigate(['representante/home/' + this.userUid]);
                  }
                });
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
