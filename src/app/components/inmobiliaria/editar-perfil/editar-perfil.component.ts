import { Component, OnInit } from '@angular/core';
import { Inmobiliaria } from 'src/app/models/inmobiliaria';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { InmuebleServiceService } from 'src/app/services/inmueble-service.service';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {

  inmobiliaria = new Inmobiliaria(
    '',
    '',
    '',
    '',
    '', '', [], '');

  contrasena = '';
  id: any = undefined;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private authSvc: AuthService,
    private storage: AngularFireStorage,
    public inmuSvc: InmuebleServiceService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.darInmobilairia();
  }

  darInmobilairia(){
    this.inmuSvc.getInmobiliarias().subscribe(res => {
      // tslint:disable-next-line: prefer-for-of
      for ( let i = 0; i < res.length; i++){
        if (this.id === res[i].UID){
          this.inmobiliaria = res[i];
          console.log(res[i]);
        }
      }
    });
  }

  guardarPerfil(){
    this.inmuSvc.updateInmobiliaria(this.inmobiliaria, this.inmobiliaria.UID);
    if (this.contrasena !== ''){
      this.authSvc.changePassword(this.contrasena).then(
        (res) => {
          this.router.navigate(['inmobiliaria/ver-perfil/' + this.id]);
        }
      );
    }
  }

  cancelar(){
    this.router.navigate(['inmobiliaria/ver-perfil/' + this.id]);
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

}
