import { Component, OnInit } from '@angular/core';
import { Inmobiliaria } from 'src/app/models/inmobiliaria';
import { Cliente } from 'src/app/models/cliente';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from 'src/app/services/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public rolRegistro = '';
  inmobiliaria = new Inmobiliaria('', '', '', '', '', '', [], '');
  cliente = new Cliente('', '', '', '', '', [], [], [], []);
  public contrasena: string;
  public userUid: string = null;

  constructor(
    private authSvc: AuthService,
    private storage: AngularFireStorage,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.rolRegistro);
  }

  registrarInmobiliaria(){
    this.authSvc.registerUser(this.inmobiliaria.Correo, this.contrasena, true, false, this.inmobiliaria)
    .then((res) => {
      console.log('resUser', res);

      this.authSvc.isAuth().subscribe(auth => {
        if (auth) {
          console.log(auth);
          this.userUid = auth.uid;
          this.authSvc.isUserInmo(this.userUid).subscribe(userRole => { // se si es una inmo
            if (userRole !== undefined){
              console.log(userRole.UID);
              this.router.navigate(['inmobiliaria/lista-inmuebles/' + this.userUid]);
            }
          });
        }
      });

    }).catch(err => console.log('err', err.message));
  }

  registrarCliente(){
    console.log(this.cliente);
    /*
    this.authSvc.registerUser('laurito@hom.com', '12345634', true, false)
    .then((res) => {
      console.log('resUser', res);
    }).catch(err => console.log('err', err.message));
    */

    this.authSvc.registerUser(this.cliente.Correo, this.contrasena, false, true, this.cliente)
    .then((res) => {
      console.log('resUser', res);

      this.authSvc.isAuth().subscribe(auth => {
        if (auth) {
          // console.log(auth);
          this.userUid = auth.uid;
          this.authSvc.isUserClient(this.userUid).subscribe(userRole => { // se si es una inmo
            if (userRole !== undefined){
              console.log(userRole.UID);
              this.router.navigate(['cliente/ver-perfil/' + this.userUid]);
            }
          });
        }
      });

    }).catch(err => console.log('err', err.message));
  }
  onUpload(e) {
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < e.target.files.length; index++) {
      const num: any = Math.random();
      const name = '' + num + '_' + e.target.files[index].name;
      const file = e.target.files[index];
      console.log(name);
      const filePath = 'imagenes/inmobiliarias/' + name;
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file).snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe((url) => {
            console.log('urlF', url);
            this.inmobiliaria.DireccionLogo = url;
            // console.log('rrrrrr', url);
          });
        })
      ).subscribe();
    }
  }
  cancelar(){
    this.router.navigate(['public/home']);
  }

}
