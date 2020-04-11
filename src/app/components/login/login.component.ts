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
  public userUid: string = null;

  loginForm = new FormGroup ({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
  }

  onLogin(): void {
    /*
    this.authSvc.loginByEmail(this.email, this.password)
    .then((res) => {
      console.log('resUser', res);
    }).catch(err => console.log('err', err.message));
*/
    this.authSvc.registerUser('laurito@hom.com', '12345634', true, false)
    .then((res) => {
      console.log('resUser', res);
    }).catch(err => console.log('err', err.message));

    this.getCurrentUser();

  }

  onLogout(): void {
    this.authSvc.logout();
  }

  getCurrentUser() {
    this.authSvc.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authSvc.isUserInmo(this.userUid).subscribe(userRole => {
          console.log('gonorrea', userRole);
          if (userRole.roles.inmobiliaria){
            this.route.navigate(['inmobiliaria/crear-inmueble']);
          } else if (userRole.roles.clinte) {
            this.route.navigate(['inmobiliaria/ver-inmueble']);
          }
        });
      }
    });
  }
}
