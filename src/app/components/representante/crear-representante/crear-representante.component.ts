import { Component, OnInit} from '@angular/core';
import { Representante } from 'src/app/models/representante';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../../models/user';
import { RepresentanteService } from 'src/app/services/representante.service';
import { Inmobiliaria } from 'src/app/models/inmobiliaria';
import { InmuebleServiceService } from 'src/app/services/inmueble-service.service';

@Component({
  selector: 'app-crear-representante',
  templateUrl: './crear-representante.component.html',
  styleUrls: ['./crear-representante.component.css']
})
export class CrearRepresentanteComponent implements OnInit {

  public representante = new Representante('', '', '' , '', '', [], '');
  public contrasena: string;
  public idInmobiliria: string;
  public contrasenaInmobiliaria = '';
  public confirmacionCreacion = true;
  public inmo: Inmobiliaria = new Inmobiliaria('', '', '', '', '', '', [], '');

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authSvc: AuthService,
    private repreService: RepresentanteService,
    public inmuSvc: InmuebleServiceService
  ) { }

  ngOnInit(): void {
    this.idInmobiliria = this.route.snapshot.paramMap.get('id');
    this.darInmobilairia();
  }

  darInmobilairia(){
    this.inmuSvc.getInmobiliarias().subscribe(res => {
      // tslint:disable-next-line: prefer-for-of
      for ( let i = 0; i < res.length; i++){
        if (this.idInmobiliria === res[i].UID){
          this.inmo = res[i];
          console.log(res[i]);
        }
      }
    });
  }

  confirmarRepresentante(){
    this.authSvc.logout();
    this.authSvc.ingresarUser(this.inmo.Correo, this.contrasenaInmobiliaria);
    this.router.navigate(['inmobiliaria/lista-representantes/' + this.idInmobiliria]);
  }

  crearRepresentante(){
    this.confirmacionCreacion = false;
    this.representante.IDInmobiliaria = this.idInmobiliria;
    // this.authSvc.createUser(this.representante.Correo, this.contrasena);
    this.authSvc.registerUser(this.representante.Correo, this.contrasena, false, false, this.representante)
    .then((res) => {
      // @ts-ignore
      console.log('resUser', res.user.uid);
      // @ts-ignore
      this.representante.UID = res.user.uid;
      this.repreService.createRepresentante(this.representante);
    }).catch(err => console.log('err', err.message));
  }

  cancelar(){
    this.router.navigate(['inmobiliaria/lista-representantes/'  + this.idInmobiliria]);
  }

}
